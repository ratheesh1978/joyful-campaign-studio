import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Mail, Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { AutomationRule as AutomationRuleType } from "@/types/automation";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AutomationRuleProps {
  rule: AutomationRuleType;
  level: number;
  onUpdate: (id: string, updates: Partial<AutomationRuleType>) => void;
  onDelete: (id: string) => void;
  onAddSubAutomation: (parentId: string) => void;
}

export function AutomationRuleComponent({ 
  rule, 
  level, 
  onUpdate, 
  onDelete, 
  onAddSubAutomation 
}: AutomationRuleProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasSubAutomations = rule.subAutomations && rule.subAutomations.length > 0;

  const updateSubAutomation = (id: string, updates: Partial<AutomationRuleType>) => {
    if (!rule.subAutomations) return;
    
    const updatedSubAutomations = rule.subAutomations.map(sub => 
      sub.id === id ? { ...sub, ...updates } : sub
    );
    
    onUpdate(rule.id, { subAutomations: updatedSubAutomations });
  };

  const deleteSubAutomation = (id: string) => {
    if (!rule.subAutomations) return;
    
    const updatedSubAutomations = rule.subAutomations.filter(sub => sub.id !== id);
    onUpdate(rule.id, { subAutomations: updatedSubAutomations });
  };

  const addNestedSubAutomation = (parentId: string) => {
    if (!rule.subAutomations) return;
    
    const updateSubAutomationsRecursively = (automations: AutomationRuleType[]): AutomationRuleType[] => {
      return automations.map(automation => {
        if (automation.id === parentId) {
          const newSubAutomation: AutomationRuleType = {
            id: `${Date.now()}-${Math.random()}`,
            name: `Sub-Rule ${(automation.subAutomations?.length || 0) + 1}`,
            active: true,
            trigger: "not-opened",
            waitDays: 1,
            timeUnit: "days",
            message: "",
            subAutomations: []
          };
          
          return {
            ...automation,
            subAutomations: [...(automation.subAutomations || []), newSubAutomation]
          };
        }
        
        if (automation.subAutomations && automation.subAutomations.length > 0) {
          return {
            ...automation,
            subAutomations: updateSubAutomationsRecursively(automation.subAutomations)
          };
        }
        
        return automation;
      });
    };
    
    const updatedSubAutomations = updateSubAutomationsRecursively(rule.subAutomations);
    onUpdate(rule.id, { subAutomations: updatedSubAutomations });
  };

  return (
    <div 
      className={cn(
        "border rounded-lg space-y-4",
        level === 0 ? "p-4" : "p-3 ml-6 border-l-4 border-l-primary/30"
      )}
      style={{ backgroundColor: `hsl(var(--muted) / ${Math.max(0.05, 0.3 - level * 0.05)})` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasSubAutomations && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          <Mail className="h-4 w-4 text-primary" />
          <span className="font-medium">{rule.name}</span>
          {level > 0 && (
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-background rounded-full">
              Level {level}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={`active-${rule.id}`} className="text-sm">Active</Label>
            <Switch
              id={`active-${rule.id}`}
              checked={rule.active}
              onCheckedChange={(checked) => onUpdate(rule.id, { active: checked })}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(rule.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`trigger-${rule.id}`}>Trigger Condition</Label>
              <Select
                value={rule.trigger}
                onValueChange={(value) => onUpdate(rule.id, { trigger: value })}
              >
                <SelectTrigger id={`trigger-${rule.id}`} className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-[100]">
                  <SelectItem value="not-opened">Not Opened</SelectItem>
                  <SelectItem value="opened">Opened</SelectItem>
                  <SelectItem value="link-clicked">Link Clicked</SelectItem>
                  <SelectItem value="not-clicked">Not Clicked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`wait-${rule.id}`}>Delay Period *</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id={`wait-${rule.id}`}
                  type="number"
                  value={rule.waitDays}
                  onChange={(e) => onUpdate(rule.id, { waitDays: parseInt(e.target.value) || 0 })}
                  min="1"
                  className="flex-1"
                />
                <Select
                  value={rule.timeUnit}
                  onValueChange={(value) => onUpdate(rule.id, { timeUnit: value })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-[100]">
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor={`message-${rule.id}`}>Follow-up Message</Label>
            <Textarea
              id={`message-${rule.id}`}
              placeholder="Write your follow-up message here... Use placeholders like {{UserName}} for personalization."
              value={rule.message}
              onChange={(e) => onUpdate(rule.id, { message: e.target.value })}
              className="mt-1.5 min-h-[120px]"
            />
          </div>

          {/* Sub-automations */}
          {hasSubAutomations && (
            <div className="space-y-3 pl-4 border-l-2 border-primary/20">
              {rule.subAutomations!.map((subRule) => (
                <AutomationRuleComponent
                  key={subRule.id}
                  rule={subRule}
                  level={level + 1}
                  onUpdate={updateSubAutomation}
                  onDelete={deleteSubAutomation}
                  onAddSubAutomation={addNestedSubAutomation}
                />
              ))}
            </div>
          )}

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAddSubAutomation(rule.id)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Sub-Automation
          </Button>
        </>
      )}
    </div>
  );
}
