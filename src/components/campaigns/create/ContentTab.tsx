import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateSelector } from "./TemplateSelector";
import { TemplateBuilder } from "./TemplateBuilder";
import { EmailPreview } from "./EmailPreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ContentTabProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export function ContentTab({ data, onChange, onNext }: ContentTabProps) {
  const [compositionMode, setCompositionMode] = useState("compose");
  const { toast } = useToast();

  const handleNext = () => {
    if (!data.subject?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter an email subject.",
        variant: "destructive",
      });
      return;
    }
    if (!data.message?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a message body.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Compose Area */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Email Content</h2>
            <p className="text-sm text-muted-foreground mt-1">Write your message and add attachments</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="composition-mode">Composition Mode</Label>
              <Select
                value={compositionMode}
                onValueChange={(value) => {
                  setCompositionMode(value);
                  onChange({ contentType: value });
                }}
              >
                <SelectTrigger id="composition-mode" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-[100]">
                  <SelectItem value="compose" className="py-3">
                    <div className="flex items-center gap-2">
                      <Check className={cn("h-4 w-4", compositionMode === "compose" ? "opacity-100" : "opacity-0")} />
                      <span>Compose Email</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="template" className="py-3">
                    <div className="flex items-center gap-2">
                      <Check className={cn("h-4 w-4", compositionMode === "template" ? "opacity-100" : "opacity-0")} />
                      <span>Select Template</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="create-template" className="py-3">
                    <div className="flex items-center gap-2">
                      <Check className={cn("h-4 w-4", compositionMode === "create-template" ? "opacity-100" : "opacity-0")} />
                      <span>Create Template</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {compositionMode === "compose" && (
              <>
                <div>
                  <Label htmlFor="email-subject">Subject *</Label>
                  <Input
                    id="email-subject"
                    placeholder="Enter email subject"
                    value={data.subject || ""}
                    onChange={(e) => onChange({ subject: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="message-body">Message Body *</Label>
                  <Textarea
                    id="message-body"
                    placeholder="Write your email message here... Use placeholders like {{UserName}} for personalization."
                    value={data.message || ""}
                    onChange={(e) => onChange({ message: e.target.value })}
                    className="mt-1.5 min-h-[400px] resize-y"
                  />
                </div>
              </>
            )}

            {compositionMode === "template" && (
              <TemplateSelector
                onSelect={(template) => {
                  onChange({ selectedTemplate: template });
                  setCompositionMode("compose");
                }}
                onClose={() => setCompositionMode("compose")}
              />
            )}

            {compositionMode === "create-template" && (
              <TemplateBuilder
                onSave={(template) => {
                  onChange({ createdTemplate: template });
                  setCompositionMode("compose");
                }}
                onClose={() => setCompositionMode("compose")}
              />
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext} size="lg">
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Right Side - Preview */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <EmailPreview
          subject={data.subject}
          senderName={data.senderName}
          senderEmail={data.senderEmail}
          message={data.message}
        />
      </div>
    </div>
  );
}
