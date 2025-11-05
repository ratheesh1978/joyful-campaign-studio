import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2, Mail, ChevronRight } from "lucide-react";

interface AutomationTabProps {
  data: any;
  onChange: (data: any) => void;
}

interface AutomationRule {
  id: string;
  name: string;
  active: boolean;
  trigger: string;
  waitDays: number;
  channel: string;
  message: string;
}

export function AutomationTab({ data, onChange }: AutomationTabProps) {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "Rule 1",
      active: true,
      trigger: "not-opened",
      waitDays: 3,
      channel: "email",
      message: ""
    }
  ]);
  const [exitConditionOpen, setExitConditionOpen] = useState(false);

  const addRule = () => {
    const newRule: AutomationRule = {
      id: Date.now().toString(),
      name: `Rule ${rules.length + 1}`,
      active: true,
      trigger: "not-opened",
      waitDays: 3,
      channel: "email",
      message: ""
    };
    setRules([...rules, newRule]);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, updates: Partial<AutomationRule>) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, ...updates } : rule));
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
              <div key={rule.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium">{rule.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${rule.id}`} className="text-sm">Active</Label>
                      <Switch
                        id={`active-${rule.id}`}
                        checked={rule.active}
                        onCheckedChange={(checked) => updateRule(rule.id, { active: checked })}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRule(rule.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`trigger-${rule.id}`}>Trigger Condition</Label>
                    <Select
                      value={rule.trigger}
                      onValueChange={(value) => updateRule(rule.id, { trigger: value })}
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
                    <Label htmlFor={`wait-${rule.id}`}>Wait (Days)</Label>
                    <Input
                      id={`wait-${rule.id}`}
                      type="number"
                      value={rule.waitDays}
                      onChange={(e) => updateRule(rule.id, { waitDays: parseInt(e.target.value) || 0 })}
                      className="mt-1.5"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`channel-${rule.id}`}>Channel</Label>
                    <Select
                      value={rule.channel}
                      onValueChange={(value) => updateRule(rule.id, { channel: value })}
                    >
                      <SelectTrigger id={`channel-${rule.id}`} className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-[100]">
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`message-${rule.id}`}>Follow-up Message</Label>
                  <Textarea
                    id={`message-${rule.id}`}
                    placeholder="Write your follow-up message here... Use placeholders like {{UserName}} for personalization."
                    value={rule.message}
                    onChange={(e) => updateRule(rule.id, { message: e.target.value })}
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Sub-Automation
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Follow-Up Rule
            </Button>
          </div>
        </div>
      </Card>

      {/* Exit Condition Dialog */}
      <Dialog open={exitConditionOpen} onOpenChange={setExitConditionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose exit condition</DialogTitle>
            <DialogDescription className="sr-only">Select a condition that will stop the automation</DialogDescription>
          </DialogHeader>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-sm">
            <p className="text-foreground">Missing an option? Suggest and we'll add it!</p>
            <ChevronRight className="h-4 w-4 ml-auto" />
          </div>

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

          <DialogFooter>
            <Button variant="outline" onClick={() => setExitConditionOpen(false)}>Cancel</Button>
            <Button onClick={() => setExitConditionOpen(false)}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
