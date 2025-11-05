import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, ChevronRight } from "lucide-react";
import { AutomationRule } from "@/types/automation";
import { AutomationRuleComponent } from "./AutomationRule";

interface AutomationTabProps {
  data: any;
  onChange: (data: any) => void;
}

export function AutomationTab({ data, onChange }: AutomationTabProps) {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "Rule 1",
      active: true,
      trigger: "not-opened",
      waitDays: 1,
      timeUnit: "days",
      message: "",
      subAutomations: []
    }
  ]);
  const [exitConditionOpen, setExitConditionOpen] = useState(false);

  const addRule = () => {
    const newRule: AutomationRule = {
      id: Date.now().toString(),
      name: `Rule ${rules.length + 1}`,
      active: true,
      trigger: "not-opened",
      waitDays: 1,
      timeUnit: "days",
      message: "",
      subAutomations: []
    };
    setRules([...rules, newRule]);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, updates: Partial<AutomationRule>) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, ...updates } : rule));
  };

  const addSubAutomation = (parentId: string) => {
    const addSubToRule = (rulesList: AutomationRule[]): AutomationRule[] => {
      return rulesList.map(rule => {
        if (rule.id === parentId) {
          const newSubAutomation: AutomationRule = {
            id: `${Date.now()}-${Math.random()}`,
            name: `Sub-Rule ${(rule.subAutomations?.length || 0) + 1}`,
            active: true,
            trigger: "not-opened",
            waitDays: 1,
            timeUnit: "days",
            message: "",
            subAutomations: []
          };
          
          return {
            ...rule,
            subAutomations: [...(rule.subAutomations || []), newSubAutomation]
          };
        }
        
        if (rule.subAutomations && rule.subAutomations.length > 0) {
          return {
            ...rule,
            subAutomations: addSubToRule(rule.subAutomations)
          };
        }
        
        return rule;
      });
    };
    
    setRules(addSubToRule(rules));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Follow-Up Automation</h2>
            <p className="text-sm text-muted-foreground mt-1">Set up automated follow-ups based on recipient behavior</p>
          </div>

          {/* Exit Conditions */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">Exit Conditions</h3>
                <p className="text-sm text-muted-foreground">Stop automation when specific actions occur</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setExitConditionOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Exit Condition
              </Button>
            </div>
          </div>

          {/* Automation Rules */}
          <div className="space-y-4">
            {rules.map((rule) => (
              <AutomationRuleComponent
                key={rule.id}
                rule={rule}
                level={0}
                onUpdate={updateRule}
                onDelete={deleteRule}
                onAddSubAutomation={addSubAutomation}
              />
            ))}

            <Button variant="outline" onClick={addRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Follow-Up Rule
            </Button>
          </div>
        </div>
      </Card>

      {/* Exit Condition Sheet */}
      <Sheet open={exitConditionOpen} onOpenChange={setExitConditionOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Choose exit condition</SheetTitle>
            <SheetDescription className="sr-only">Select a condition that will stop the automation</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <RadioGroup className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="membership-purchase" id="membership-purchase" />
                <Label htmlFor="membership-purchase" className="font-normal cursor-pointer">On membership purchase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="membership-renewal" id="membership-renewal" />
                <Label htmlFor="membership-renewal" className="font-normal cursor-pointer">On membership renewal</Label>
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enrolls-course" id="enrolls-course" />
                  <Label htmlFor="enrolls-course" className="font-normal cursor-pointer">Enrolls in course(s)</Label>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completes-course" id="completes-course" />
                  <Label htmlFor="completes-course" className="font-normal cursor-pointer">Completes course(s)</Label>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="attends-class" id="attends-class" />
                  <Label htmlFor="attends-class" className="font-normal cursor-pointer">Attends live class(s)</Label>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="registers-webinar" id="registers-webinar" />
                  <Label htmlFor="registers-webinar" className="font-normal cursor-pointer">Registers for webinar(s)</Label>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="attends-webinar" id="attends-webinar" />
                  <Label htmlFor="attends-webinar" className="font-normal cursor-pointer">Attends webinar(s)</Label>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </RadioGroup>
          </div>

          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setExitConditionOpen(false)}>Cancel</Button>
            <Button onClick={() => setExitConditionOpen(false)}>Apply</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
