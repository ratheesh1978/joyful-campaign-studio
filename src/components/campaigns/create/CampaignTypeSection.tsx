import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";

interface CampaignTypeSectionProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export function CampaignTypeSection({ data, onChange, onNext }: CampaignTypeSectionProps) {
  const [campaignType, setCampaignType] = useState(data.type || "email");

  const handleTypeChange = (type: string) => {
    setCampaignType(type);
    onChange({ type });
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Campaign Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Campaign Type Toggle */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleTypeChange("email")}
            className={`flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all ${
              campaignType === "email"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Mail className={`h-8 w-8 ${campaignType === "email" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-semibold">Email Campaign</span>
          </button>
          
          <button
            onClick={() => handleTypeChange("whatsapp")}
            className={`flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all ${
              campaignType === "whatsapp"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <MessageSquare className={`h-8 w-8 ${campaignType === "whatsapp" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-semibold">WhatsApp Campaign</span>
          </button>
        </div>

        {/* Campaign Name */}
        <div className="space-y-2">
          <Label htmlFor="campaign-name">Campaign Name *</Label>
          <Input
            id="campaign-name"
            placeholder="Enter campaign name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>

        {/* Sender */}
        <div className="space-y-2">
          <Label htmlFor="sender">Sender *</Label>
          <Select
            value={data.sender}
            onValueChange={(value) => onChange({ sender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${campaignType === "email" ? "email address" : "WhatsApp number"}`} />
            </SelectTrigger>
            <SelectContent>
              {campaignType === "email" ? (
                <>
                  <SelectItem value="support@wayvida.com">support@wayvida.com</SelectItem>
                  <SelectItem value="marketing@wayvida.com">marketing@wayvida.com</SelectItem>
                  <SelectItem value="noreply@wayvida.com">noreply@wayvida.com</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="+1234567890">+1 (234) 567-890</SelectItem>
                  <SelectItem value="+0987654321">+0 (987) 654-321</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Campaign Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Campaign Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add internal notes about this campaign"
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </div>

        <Button
          onClick={onNext}
          disabled={!data.name || !data.sender}
          className="w-full"
        >
          Next: Choose Content
        </Button>
      </CardContent>
    </Card>
  );
}
