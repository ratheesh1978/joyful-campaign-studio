import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content } = await req.json();
    console.log('Checking content for spam:', { subject, content });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = `You are a spam detection system for email campaigns. Analyze the following email content and determine if it appears to be spam or low-quality content.

Subject: ${subject}
Content: ${content}

Check for:
1. Repetitive meaningless characters (like "ddddd", "aaaaa", etc.)
2. Excessive use of spam trigger words
3. Lack of coherent sentences or meaning
4. Suspicious patterns that could trigger spam filters

Respond with a JSON object in this exact format:
{
  "isSpam": true/false,
  "confidence": 0-100,
  "reason": "Brief explanation of why this might be marked as spam"
}

Be strict: Even if only the subject OR content contains spam-like patterns, mark it as spam.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a spam detection system. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log('AI response:', aiResponse);

    // Parse the JSON response from AI
    let spamCheck;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        spamCheck = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: try to parse the entire response
        spamCheck = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Default to safe behavior - mark as spam if we can't parse
      spamCheck = {
        isSpam: true,
        confidence: 80,
        reason: 'Unable to properly analyze content'
      };
    }

    return new Response(JSON.stringify(spamCheck), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in check-spam-content function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isSpam: false  // Fail open to not block legitimate emails
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
