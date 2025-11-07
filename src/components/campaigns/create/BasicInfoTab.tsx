import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TargetGroupSheet } from "./TargetGroupSheet";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";

interface BasicInfoTabProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export function BasicInfoTab({ data, onChange, onNext }: BasicInfoTabProps) {
  const { toast } = useToast();
  const [isTargetSheetOpen, setIsTargetSheetOpen] = useState(false);

  // Calculate selected filters and user count
  const getSelectedFilters = () => {
    if (!data.targetFilters) return { filters: [], totalUsers: 0 };
    
    const filters: string[] = [];
    let totalUsers = 0;
    
    const { marketplaceInstitutes, whiteLabelInstitutes, membership, learners } = data.targetFilters;
    
    // Marketplace Institutes
    if (marketplaceInstitutes) {
      Object.entries(marketplaceInstitutes).forEach(([key, value]) => {
        if (value) {
          const label = key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          filters.push(`MP: ${label}`);
          totalUsers += Math.floor(Math.random() * 500) + 100;
        }
      });
    }
    
    // White Label Institutes
    if (whiteLabelInstitutes) {
      Object.entries(whiteLabelInstitutes).forEach(([key, value]) => {
        if (value) {
          const label = key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          filters.push(`WL: ${label}`);
          totalUsers += Math.floor(Math.random() * 300) + 50;
        }
      });
    }
    
    // Membership
    if (membership) {
      Object.entries(membership).forEach(([key, value]) => {
        if (value) {
          const label = key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          filters.push(`Membership: ${label}`);
          totalUsers += Math.floor(Math.random() * 800) + 200;
        }
      });
    }
    
    // Learners (new structure)
    if (learners?.type) {
      const label = learners.type.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      filters.push(`Learners: ${label}`);
      totalUsers += Math.floor(Math.random() * 1000) + 300;
      
      // Add sub-filters count if available
      if (learners.subFilters) {
        const selectedSubFilters = Object.values(learners.subFilters).filter(Boolean).length;
        if (selectedSubFilters > 0) {
          filters.push(`(${selectedSubFilters} items selected)`);
        }
      }
    }
    
    return { filters, totalUsers };
  };

  const { filters: selectedFilters, totalUsers } = getSelectedFilters();

  const isWhatsApp = data.type === "whatsapp";

  const handleNext = () => {
    if (!data.name?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a campaign name.",
        variant: "destructive",
      });
      return;
    }
    if (!data.senderName?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a sender name.",
        variant: "destructive",
      });
      return;
    }
    
    if (isWhatsApp) {
      if (!data.whatsappNumber?.trim()) {
        toast({
          title: "Missing Information",
          description: "Please select a WhatsApp number.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!data.senderEmail?.trim()) {
        toast({
          title: "Missing Information",
          description: "Please select a sender email.",
          variant: "destructive",
        });
        return;
      }
    }
    
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaign-name">Campaign Name *</Label>
              <Input
                id="campaign-name"
                placeholder="e.g., Q1 2025 New Features Launch"
                value={data.name || ""}
                onChange={(e) => onChange({ name: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sender-name">Sender Name *</Label>
                <Input
                  id="sender-name"
                  placeholder="e.g., Wayvida Team"
                  value={data.senderName || "Wayvida"}
                  onChange={(e) => onChange({ senderName: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              {isWhatsApp ? (
                <div>
                  <Label htmlFor="whatsapp-number">WhatsApp Number *</Label>
                  <Select
                    value={data.whatsappNumber || ""}
                    onValueChange={(value) => onChange({ whatsappNumber: value })}
                  >
                    <SelectTrigger id="whatsapp-number" className="mt-1.5">
                      <SelectValue placeholder="Select WhatsApp number" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-[100]">
                      <SelectItem value="+1-555-0101">+1 (555) 010-1001</SelectItem>
                      <SelectItem value="+1-555-0102">+1 (555) 010-1002</SelectItem>
                      <SelectItem value="+1-555-0103">+1 (555) 010-1003</SelectItem>
                      <SelectItem value="+91-98765-43210">+91 98765 43210</SelectItem>
                      <SelectItem value="+44-7700-900123">+44 7700 900123</SelectItem>
                      <SelectItem value="add-new" className="text-primary">+ Add New Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label htmlFor="sender-email">Sender Email *</Label>
                  <Select
                    value={data.senderEmail || ""}
                    onValueChange={(value) => onChange({ senderEmail: value })}
                  >
                    <SelectTrigger id="sender-email" className="mt-1.5">
                      <SelectValue placeholder="Select sender email" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-[100]">
                      <SelectItem value="notifications@wayvida.com">notifications@wayvida.com</SelectItem>
                      <SelectItem value="grow@wayvida.com">grow@wayvida.com</SelectItem>
                      <SelectItem value="info@wayvida.com">info@wayvida.com</SelectItem>
                      <SelectItem value="add-new" className="text-primary">+ Add New Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="target-group">Target Group *</Label>
              <Button
                variant="outline"
                className="w-full mt-1.5 justify-start text-left font-normal"
                onClick={() => setIsTargetSheetOpen(true)}
              >
                Configure Target Filters
              </Button>
              
              {selectedFilters.length > 0 && (
                <div className="mt-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Selected Filters ({totalUsers} users)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filter, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedFilters.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1.5">Click to open advanced targeting options</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/30">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Dynamic Placeholders</h3>
          <p className="text-sm text-muted-foreground">Use these placeholders in your message to personalize content:</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <code className="px-3 py-1.5 bg-background border rounded text-sm font-mono">
              {"{"}UserName{"}"}
            </code>
            <code className="px-3 py-1.5 bg-background border rounded text-sm font-mono">
              {"{"}InstituteName{"}"}
            </code>
            <code className="px-3 py-1.5 bg-background border rounded text-sm font-mono">
              {"{"}CourseName{"}"}
            </code>
            <code className="px-3 py-1.5 bg-background border rounded text-sm font-mono">
              {"{"}PlanName{"}"}
            </code>
          </div>
        </div>
      </Card>

      <TargetGroupSheet
        open={isTargetSheetOpen}
        onOpenChange={setIsTargetSheetOpen}
        data={data}
        onChange={onChange}
      />

      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg">
          Next
        </Button>
      </div>
    </div>
  );
}
