import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Zap, Mail, MessageSquare, MousePointerClick, Eye } from "lucide-react";

interface TriggerAutomationSectionProps {
  data: any;
  onChange: (data: any) => void;
  onBack: () => void;
}

export function TriggerAutomationSection({ data, onChange, onBack }: TriggerAutomationSectionProps) {
  const [triggers, setTriggers] = useState<any[]>([]);

  const triggerOptions = [
    {
      id: "mail-opened",
      title: "On Mail Opened",
      description: "Send follow-up when recipient opens the email",
      icon: Eye,
      action: "Send Follow-up Mail / WhatsApp",
      emailOnly: true,
    },
    {
      id: "mail-not-opened",
      title: "On Mail Not Opened",
      description: "Send reminder if email isn't opened after specific time",
      icon: Mail,
      action: "Send Reminder",
      emailOnly: true,
    },
    {
      id: "link-clicked",
      title: "On Link Clicked",
      description: "Engage users who click links in your message",
      icon: MousePointerClick,
      action: "Send Thank You Message",
      emailOnly: false,
    },
    {
      id: "whatsapp-viewed",
      title: "On WhatsApp Viewed/Replied",
      description: "Follow up when message is viewed or replied",
      icon: MessageSquare,
      action: "Send Next Step Message",
      whatsappOnly: true,
    },
  ];

  const filteredTriggers = triggerOptions.filter((trigger) => {
    if (data.type === "email" && trigger.whatsappOnly) return false;
    if (data.type === "whatsapp" && trigger.emailOnly) return false;
    return true;
  });

  const handleTriggerToggle = (triggerId: string, checked: boolean) => {
    if (checked) {
      setTriggers([...triggers, { id: triggerId, delay: 1, unit: "days" }]);
    } else {
      setTriggers(triggers.filter((t) => t.id !== triggerId));
    }
  };

  const updateTriggerDelay = (triggerId: string, delay: number) => {
    setTriggers(
      triggers.map((t) => (t.id === triggerId ? { ...t, delay } : t))
    );
  };

  const updateTriggerUnit = (triggerId: string, unit: string) => {
    setTriggers(
      triggers.map((t) => (t.id === triggerId ? { ...t, unit } : t))
    );
  };

  const isTriggerActive = (triggerId: string) =>
    triggers.some((t) => t.id === triggerId);

  const getTriggerConfig = (triggerId: string) =>
    triggers.find((t) => t.id === triggerId) || { delay: 1, unit: "days" };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Add Automated Triggers
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set up automatic follow-ups based on recipient actions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trigger Options */}
        <div className="space-y-4">
          {filteredTriggers.map((trigger) => {
            const isActive = isTriggerActive(trigger.id);
            const config = getTriggerConfig(trigger.id);

            return (
              <div
                key={trigger.id}
                className={`rounded-lg border-2 p-4 transition-all ${
                  isActive ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={trigger.id}
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      handleTriggerToggle(trigger.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <trigger.icon className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <label
                          htmlFor={trigger.id}
                          className="font-semibold cursor-pointer"
                        >
                          {trigger.title}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {trigger.description}
                        </p>
                        <p className="mt-1 text-sm text-primary">
                          Action: {trigger.action}
                        </p>
                      </div>
                    </div>

                    {/* Delay Configuration */}
                    {isActive && (
                      <div className="flex items-center gap-3 rounded-md bg-background p-3">
                        <Label className="text-xs">Wait time:</Label>
                        <Input
                          type="number"
                          min="1"
                          value={config.delay}
                          onChange={(e) =>
                            updateTriggerDelay(
                              trigger.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-20"
                        />
                        <Select
                          value={config.unit}
                          onValueChange={(value) =>
                            updateTriggerUnit(trigger.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">
                          after event
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {triggers.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Triggers:</span>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {triggers.map((trigger) => {
                const option = triggerOptions.find((o) => o.id === trigger.id);
                return (
                  <li key={trigger.id}>
                    • {option?.title} - Wait {trigger.delay} {trigger.unit}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {triggers.length === 0 && (
          <div className="rounded-lg bg-muted/30 p-6 text-center">
            <Zap className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No automation triggers configured yet. Select triggers above to automate your campaign follow-ups.
            </p>
          </div>
        )}

        {/* Navigation Button */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
