import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Type,
  Image as ImageIcon,
  RectangleHorizontal,
  Share2,
  Minus,
  Square,
  LayoutGrid,
  Box,
  Monitor,
  Smartphone,
  Tablet,
  Undo,
  Redo
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface TemplateBuilderProps {
  onSave: (template: any) => void;
  onClose: () => void;
}

export function TemplateBuilder({ onSave, onClose }: TemplateBuilderProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const contentBlocks = [
    { icon: Type, label: "Text" },
    { icon: ImageIcon, label: "Image" },
    { icon: RectangleHorizontal, label: "Button" },
    { icon: Share2, label: "Social" },
    { icon: Minus, label: "Divider" },
    { icon: Square, label: "Spacer" }
  ];

  const layoutBlocks = [
    { icon: Box, label: "Hero" },
    { icon: LayoutGrid, label: "Wrapper" }
  ];

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      {/* Left Sidebar - Blocks */}
      <Card className="w-64 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Box className="h-4 w-4" />
              Block
            </h3>
            
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
                Content
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {contentBlocks.map((block) => (
                    <button
                      key={block.label}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:border-primary hover:bg-accent transition-colors"
                    >
                      <block.icon className="h-6 w-6" />
                      <span className="text-xs">{block.label}</span>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator className="my-4" />

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
                Layout
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {layoutBlocks.map((block) => (
                    <button
                      key={block.label}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:border-primary hover:bg-accent transition-colors"
                    >
                      <block.icon className="h-6 w-6" />
                      <span className="text-xs">{block.label}</span>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </Card>

      {/* Center - Canvas */}
      <div className="flex-1 flex flex-col">
        <Card className="mb-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "desktop" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="flex-1 p-8 bg-muted/20">
          <ScrollArea className="h-full">
            <div className="mx-auto bg-background border-2 border-dashed rounded-lg min-h-[600px] p-8"
              style={{
                maxWidth: viewMode === "desktop" ? "600px" : viewMode === "tablet" ? "480px" : "375px"
              }}
            >
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop blocks here to build your template
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Right Sidebar - Page Attributes */}
      <Card className="w-80 p-4">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Page attributes</h3>
              
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
                  Email Setting
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Welcome to Wayvida"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">SubTitle</Label>
                    <Input
                      id="subtitle"
                      placeholder="Nice to meet you!"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      placeholder="600px"
                      defaultValue="600px"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breakpoint">Breakpoint</Label>
                    <Input
                      id="breakpoint"
                      placeholder="480px"
                      defaultValue="480px"
                    />
                    <p className="text-xs text-muted-foreground">
                      Allows you to control on which breakpoint the layout should go desktop/mobile.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator className="my-4" />

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium">
                  Theme Setting
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Font family</Label>
                      <Input defaultValue="-apple-system, Bli" />
                    </div>
                    <div className="space-y-2">
                      <Label>Font size (px)</Label>
                      <Input defaultValue="14" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Line height</Label>
                      <Input />
                    </div>
                    <div className="space-y-2">
                      <Label>Font weight</Label>
                      <Input />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
