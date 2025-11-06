import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock, Calendar, Mail, Link as LinkIcon, MailOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleAutomationSectionProps {
  data: any;
  onChange: (data: any) => void;
  onBack: () => void;
}

export function ScheduleAutomationSection({ data, onChange, onBack }: ScheduleAutomationSectionProps) {
  const [scheduleType, setScheduleType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("");
  
  const [mailOpened, setMailOpened] = useState(false);
  const [mailOpenedDelay, setMailOpenedDelay] = useState("1");
  const [mailOpenedUnit, setMailOpenedUnit] = useState("hours");
  
  const [linkClicked, setLinkClicked] = useState(false);
  const [linkClickedDelay, setLinkClickedDelay] = useState("1");
  const [linkClickedUnit, setLinkClickedUnit] = useState("hours");
  
  const [notOpened, setNotOpened] = useState(false);
  const [notOpenedDelay, setNotOpenedDelay] = useState("24");
  const [notOpenedUnit, setNotOpenedUnit] = useState("hours");

  return (
    <div className="space-y-6">
      {/* Schedule Section */}
      <Card className="p-6 border-2 backdrop-blur-sm bg-card/50">
        <h2 className="text-2xl font-semibold mb-6">Schedule Campaign</h2>
        
        <RadioGroup value={scheduleType} onValueChange={(value: any) => setScheduleType(value)}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-3 rounded-md transition-colors">
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate" className="cursor-pointer flex-1 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Send Immediately
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-3 rounded-md transition-colors">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <Label htmlFor="scheduled" className="cursor-pointer flex-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule for Later
              </Label>
            </div>
          </div>
        </RadioGroup>

        {scheduleType === "scheduled" && (
          <div className="mt-6 space-y-4 pl-6 border-l-2 border-primary/20">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule-time">Select Time</Label>
              <Input
                id="schedule-time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Automation Section */}
      <Card className="p-6 border-2 backdrop-blur-sm bg-card/50">
        <h2 className="text-2xl font-semibold mb-4">Automation Triggers</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Set up automated follow-up emails based on recipient actions
        </p>

        <div className="space-y-6">
          {/* Mail Opened Trigger */}
          <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="mail-opened"
                checked={mailOpened}
                onCheckedChange={(checked) => setMailOpened(checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="mail-opened" className="cursor-pointer flex items-center gap-2 font-medium">
                  <MailOpen className="h-4 w-4 text-primary" />
                  Mail Opened
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Send follow-up email when recipient opens the email
                </p>
                
                {mailOpened && (
                  <div className="flex gap-2 mt-3">
                    <Input
                      type="number"
                      min="1"
                      value={mailOpenedDelay}
                      onChange={(e) => setMailOpenedDelay(e.target.value)}
                      className="w-20"
                    />
                    <Select value={mailOpenedUnit} onValueChange={setMailOpenedUnit}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground self-center">after opening</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Link Clicked Trigger */}
          <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="link-clicked"
                checked={linkClicked}
                onCheckedChange={(checked) => setLinkClicked(checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="link-clicked" className="cursor-pointer flex items-center gap-2 font-medium">
                  <LinkIcon className="h-4 w-4 text-primary" />
                  Link Clicked
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Send follow-up email when recipient clicks a link
                </p>
                
                {linkClicked && (
                  <div className="flex gap-2 mt-3">
                    <Input
                      type="number"
                      min="1"
                      value={linkClickedDelay}
                      onChange={(e) => setLinkClickedDelay(e.target.value)}
                      className="w-20"
                    />
                    <Select value={linkClickedUnit} onValueChange={setLinkClickedUnit}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground self-center">after clicking</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Not Opened Trigger */}
          <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="not-opened"
                checked={notOpened}
                onCheckedChange={(checked) => setNotOpened(checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="not-opened" className="cursor-pointer flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-primary" />
                  Mail Not Opened
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Send reminder if recipient hasn't opened the email
                </p>
                
                {notOpened && (
                  <div className="flex gap-2 mt-3">
                    <Input
                      type="number"
                      min="1"
                      value={notOpenedDelay}
                      onChange={(e) => setNotOpenedDelay(e.target.value)}
                      className="w-20"
                    />
                    <Select value={notOpenedUnit} onValueChange={setNotOpenedUnit}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground self-center">after sending</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
