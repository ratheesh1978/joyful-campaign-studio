import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  subject: string;
  preview: string;
  date: string;
  status: string;
}

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
  onClose: () => void;
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: "1",
      name: "You don't just need ...",
      subject: "Dear [Institute-Name],\n\nFirst — Congratulations on joining Wayvids...",
      preview: "You've already done what most people only dream of — taking the first step toward building something of your own...",
      date: "Aug 26, 2025 11:19 AM",
      status: "Active"
    },
    {
      id: "2",
      name: "Welcome to Wayvida",
      subject: "Hi [Learner-Name]",
      preview: "We're excited to share a special opportunity that could take your learning journey to the next level!",
      date: "Aug 26, 2025 11:19 AM",
      status: "Active"
    },
    {
      id: "3",
      name: "We're still here — r...",
      subject: "First of all — Congratulations!",
      preview: "Not everyone dares to take that first bold step toward their dream. But you did...",
      date: "Aug 26, 2025 11:19 AM",
      status: "Active"
    },
    {
      id: "4",
      name: "Welcome to Wayvida",
      subject: "Hi [Learner-Name]",
      preview: "We're excited to share a special opportunity that could take your learning journey to the next level!",
      date: "Aug 26, 2025 11:19 AM",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Template</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "relative cursor-pointer transition-all hover:shadow-lg",
              selectedTemplate === template.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="aspect-[3/4] bg-muted/30 border-b flex items-center justify-center p-4">
              <div className="text-center space-y-2">
                <div className="w-full h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-xs text-muted-foreground px-2">
                    {template.preview.substring(0, 100)}...
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {template.subject}
                </p>
              </div>
            </div>
            
            <div className="p-3 space-y-2">
              <h4 className="font-semibold text-sm truncate">{template.name}</h4>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{template.date}</span>
                <span className="text-green-600">{template.status}</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate(template);
                  }}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(template);
                  }}
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Select
                </Button>
              </div>
            </div>

            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
          </Card>
        ))}
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[80vh]">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Template Preview</h3>
                <Button variant="ghost" size="sm" onClick={() => setPreviewTemplate(null)}>
                  Close
                </Button>
              </div>
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">Subject:</span>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{previewTemplate.subject}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Preview:</span>
                    <p className="text-sm text-muted-foreground">{previewTemplate.preview}</p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
