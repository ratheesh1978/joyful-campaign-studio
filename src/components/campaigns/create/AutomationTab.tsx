import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, ChevronRight, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { AutomationRule } from "@/types/automation";
import { AutomationRuleComponent } from "./AutomationRule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [expandedCondition, setExpandedCondition] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>();

  const toggleDetailView = (type: string) => {
    setExpandedCondition(expandedCondition === type ? "" : type);
  };

  const getDetailViewItems = (type: string) => {
    switch (type) {
      case "enrolls-course":
      case "completes-course":
        return ["Introduction to React", "Advanced TypeScript", "Web Design Fundamentals", "Node.js Backend Development", "Mobile App Development"];
      case "attends-class":
        return ["Monday Morning Session", "Wednesday Evening Workshop", "Friday Advanced Class", "Weekend Masterclass"];
      case "registers-webinar":
      case "attends-webinar":
        return ["Marketing Strategies 2024", "Product Launch Webinar", "Customer Success Workshop", "Sales Techniques Masterclass"];
      case "purchases-product":
        return ["Premium Membership", "Starter Package", "Enterprise Solution", "Individual Coaching", "Group Training"];
      default:
        return [];
    }
  };

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

          {/* Exit Conditions */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
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
        </div>
      </Card>

      {/* Exit Condition Sheet */}
      <Sheet open={exitConditionOpen} onOpenChange={(open) => {
        setExitConditionOpen(open);
        if (!open) setExpandedCondition(""); // Reset expanded view when closing
      }}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Choose exit condition</SheetTitle>
            <SheetDescription className="sr-only">Select a condition that will stop the automation</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Automation End Date */}
            <div className="border rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Automation End Date</h4>
                  <p className="text-xs text-muted-foreground">Set when this automation should stop running</p>
                </div>
                <div className="flex items-center gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {endDate && (
                    <Button variant="ghost" size="sm" onClick={() => setEndDate(undefined)}>
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <RadioGroup className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="membership-purchase" id="membership-purchase" />
                  <Label htmlFor="membership-purchase" className="font-normal cursor-pointer">On membership purchase</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="membership-renewal" id="membership-renewal" />
                  <Label htmlFor="membership-renewal" className="font-normal cursor-pointer">On membership renewal</Label>
                </div>
              </div>
              
              {/* Enrolls in course */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enrolls-course" id="enrolls-course" />
                    <Label htmlFor="enrolls-course" className="font-normal cursor-pointer">Enrolls in course(s)</Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDetailView("enrolls-course");
                    }}
                  >
                    {expandedCondition === "enrolls-course" ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {expandedCondition === "enrolls-course" && (
                  <div className="ml-6 pl-4 border-l space-y-2 py-2">
                    <Input placeholder="Search courses..." className="mb-2" />
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {getDetailViewItems("enrolls-course").map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-1">
                          <Checkbox id={`enrolls-${index}`} />
                          <Label htmlFor={`enrolls-${index}`} className="font-normal cursor-pointer text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Completes course */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completes-course" id="completes-course" />
                    <Label htmlFor="completes-course" className="font-normal cursor-pointer">Completes course(s)</Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDetailView("completes-course");
                    }}
                  >
                    {expandedCondition === "completes-course" ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {expandedCondition === "completes-course" && (
                  <div className="ml-6 pl-4 border-l space-y-2 py-2">
                    <Input placeholder="Search courses..." className="mb-2" />
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {getDetailViewItems("completes-course").map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-1">
                          <Checkbox id={`completes-${index}`} />
                          <Label htmlFor={`completes-${index}`} className="font-normal cursor-pointer text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Attends live class */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attends-class" id="attends-class" />
                    <Label htmlFor="attends-class" className="font-normal cursor-pointer">Attends live class(s)</Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDetailView("attends-class");
                    }}
                  >
                    {expandedCondition === "attends-class" ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {expandedCondition === "attends-class" && (
                  <div className="ml-6 pl-4 border-l space-y-2 py-2">
                    <Input placeholder="Search classes..." className="mb-2" />
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {getDetailViewItems("attends-class").map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-1">
                          <Checkbox id={`class-${index}`} />
                          <Label htmlFor={`class-${index}`} className="font-normal cursor-pointer text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Registers for webinar */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="registers-webinar" id="registers-webinar" />
                    <Label htmlFor="registers-webinar" className="font-normal cursor-pointer">Registers for webinar(s)</Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDetailView("registers-webinar");
                    }}
                  >
                    {expandedCondition === "registers-webinar" ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {expandedCondition === "registers-webinar" && (
                  <div className="ml-6 pl-4 border-l space-y-2 py-2">
                    <Input placeholder="Search webinars..." className="mb-2" />
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {getDetailViewItems("registers-webinar").map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-1">
                          <Checkbox id={`register-${index}`} />
                          <Label htmlFor={`register-${index}`} className="font-normal cursor-pointer text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Attends webinar */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attends-webinar" id="attends-webinar" />
                    <Label htmlFor="attends-webinar" className="font-normal cursor-pointer">Attends webinar(s)</Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDetailView("attends-webinar");
                    }}
                  >
                    {expandedCondition === "attends-webinar" ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {expandedCondition === "attends-webinar" && (
                  <div className="ml-6 pl-4 border-l space-y-2 py-2">
                    <Input placeholder="Search webinars..." className="mb-2" />
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {getDetailViewItems("attends-webinar").map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-1">
                          <Checkbox id={`attends-${index}`} />
                          <Label htmlFor={`attends-${index}`} className="font-normal cursor-pointer text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coupon-inactive" id="coupon-inactive" />
                  <Label htmlFor="coupon-inactive" className="font-normal cursor-pointer">When coupon becomes inactive</Label>
                </div>
              </div>
              
              {/* Purchases product */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="purchases-product" id="purchases-product" />
                    <Label htmlFor="purchases-product" className="font-normal cursor-pointer">Purchases specific product(s)</Label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDetailView("purchases-product");
                    }}
                  >
                    {expandedCondition === "purchases-product" ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {expandedCondition === "purchases-product" && (
                  <div className="ml-6 pl-4 border-l space-y-2 py-2">
                    <Input placeholder="Search products..." className="mb-2" />
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {getDetailViewItems("purchases-product").map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-1">
                          <Checkbox id={`product-${index}`} />
                          <Label htmlFor={`product-${index}`} className="font-normal cursor-pointer text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subscription-cancelled" id="subscription-cancelled" />
                  <Label htmlFor="subscription-cancelled" className="font-normal cursor-pointer">Cancels subscription</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unsubscribes" id="unsubscribes" />
                  <Label htmlFor="unsubscribes" className="font-normal cursor-pointer">Unsubscribes from emails</Label>
                </div>
              </div>
            </RadioGroup>

            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setExitConditionOpen(false)}>Cancel</Button>
              <Button onClick={() => setExitConditionOpen(false)}>Apply</Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
