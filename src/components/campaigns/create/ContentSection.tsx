import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle, Edit3, ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContentSectionProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ContentSection({ data, onChange, onNext, onBack }: ContentSectionProps) {
  const [contentType, setContentType] = useState(data.contentType || "");
  const [message, setMessage] = useState("");

  const handleContentTypeSelect = (type: string) => {
    setContentType(type);
    onChange({ contentType: type });
  };

  const contentOptions = [
    {
      id: "template",
      title: "Select Template",
      description: "Choose from existing templates",
      icon: FileText,
    },
    {
      id: "new",
      title: "Create New Template",
      description: "Build a template from scratch",
      icon: PlusCircle,
    },
    {
      id: "compose",
      title: "Compose Message",
      description: "Write a quick message",
      icon: Edit3,
    },
  ];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Choose Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Type Options */}
        <div className="grid gap-4 md:grid-cols-3">
          {contentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleContentTypeSelect(option.id)}
              className={`flex flex-col items-center gap-3 rounded-lg border-2 p-6 text-center transition-all cursor-pointer hover:shadow-md ${
                contentType === option.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }`}
            >
              <option.icon
                className={`h-10 w-10 transition-colors ${
                  contentType === option.id ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <div>
                <div className="font-semibold">{option.title}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Compose Message Area */}
        {contentType === "compose" && (
          <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
            <Label htmlFor="message">
              {data.type === "email" ? "Email Message" : "WhatsApp Message"}
            </Label>
            <Textarea
              id="message"
              placeholder={
                data.type === "email"
                  ? "Write your email message here..."
                  : "Write your WhatsApp message here..."
              }
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {data.type === "email"
                ? "You can use HTML formatting in your email"
                : "Keep it concise for better WhatsApp engagement"}
            </p>
          </div>
        )}

        {contentType === "template" && (
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <FileText className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Template selection drawer would open here with search and preview options
            </p>
          </div>
        )}

        {contentType === "new" && (
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <PlusCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Template builder would open here with drag-and-drop editor
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!contentType} className="w-full">
            Next: Schedule & Automation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
