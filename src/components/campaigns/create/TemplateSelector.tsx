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
      name: "Institute Welcome Template",
      subject: "Dear [Institute-Name], Congratulations on joining Wayvida!",
      preview: "You've already done what most people only dream of — taking the first step toward building something of your own. Welcome to Wayvida, where we help you turn your vision into reality.",
      date: "Aug 26, 2025 11:19 AM",
      status: "Active"
    },
    {
      id: "2",
      name: "Learner Welcome Template",
      subject: "Hi [Learner-Name], Welcome to Wayvida!",
      preview: "We're excited to share a special opportunity that could take your learning journey to the next level! Explore our courses and start your transformation today.",
      date: "Aug 26, 2025 11:19 AM",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Template</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "relative cursor-pointer transition-all hover:shadow-lg",
              selectedTemplate === template.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">{template.name}</h4>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{template.status}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Subject:</span>
                  <p className="text-sm mt-1 line-clamp-2">{template.subject}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Preview:</span>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{template.preview}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>{template.date}</span>
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
