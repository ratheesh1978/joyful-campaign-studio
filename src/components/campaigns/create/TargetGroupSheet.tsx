import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TargetGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  onChange: (data: any) => void;
}

export function TargetGroupSheet({ open, onOpenChange, data, onChange }: TargetGroupSheetProps) {
  const [marketplaceOpen, setMarketplaceOpen] = useState(true);
  const [whiteLabelOpen, setWhiteLabelOpen] = useState(true);
  const [membershipOpen, setMembershipOpen] = useState(true);
  const [learnersOpen, setLearnersOpen] = useState(true);

  const handleApply = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Target Group Filters</SheetTitle>
          <SheetDescription>Select and configure filters to target specific groups</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Marketplace Institutes */}
          <Collapsible open={marketplaceOpen} onOpenChange={setMarketplaceOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-muted">
              <span className="font-semibold">Marketplace Institutes</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", marketplaceOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pt-3 space-y-3">
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="marketplace-active" />
                  <Label htmlFor="marketplace-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="marketplace-inactive" />
                  <Label htmlFor="marketplace-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
              </RadioGroup>

              <div className="mt-4">
                <Label className="text-sm text-muted-foreground">Select Specific Institutes</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search institutes..." className="pl-9" />
                </div>
                <RadioGroup className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="abc" id="abc-institute" />
                    <Label htmlFor="abc-institute" className="font-normal cursor-pointer">ABC Institute</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="xyz" id="xyz-academy" />
                    <Label htmlFor="xyz-academy" className="font-normal cursor-pointer">XYZ Academy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tech" id="tech-learning" />
                    <Label htmlFor="tech-learning" className="font-normal cursor-pointer">Tech Learning Center</Label>
                  </div>
                </RadioGroup>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* White Label Institutes */}
          <Collapsible open={whiteLabelOpen} onOpenChange={setWhiteLabelOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-muted">
              <span className="font-semibold">White Label Institutes</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", whiteLabelOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pt-3 space-y-3">
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wl-active" id="wl-active" />
                  <Label htmlFor="wl-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wl-inactive" id="wl-inactive" />
                  <Label htmlFor="wl-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wl-expired" id="wl-expired" />
                  <Label htmlFor="wl-expired" className="font-normal cursor-pointer">Expired</Label>
                </div>
              </RadioGroup>

              <div className="mt-4">
                <Label className="text-sm text-muted-foreground">Select Specific Institutes</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search institutes..." className="pl-9" />
                </div>
                <RadioGroup className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium-institute" />
                    <Label htmlFor="premium-institute" className="font-normal cursor-pointer">Premium Institute</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elite" id="elite-academy" />
                    <Label htmlFor="elite-academy" className="font-normal cursor-pointer">Elite Academy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pro" id="pro-learning" />
                    <Label htmlFor="pro-learning" className="font-normal cursor-pointer">Pro Learning Hub</Label>
                  </div>
                </RadioGroup>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Membership */}
          <Collapsible open={membershipOpen} onOpenChange={setMembershipOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-muted">
              <span className="font-semibold">Membership</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", membershipOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pt-3 space-y-2">
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic" className="font-normal cursor-pointer">Basic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prof-share-monthly" id="prof-share-monthly" />
                  <Label htmlFor="prof-share-monthly" className="font-normal cursor-pointer">Professional with share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prof-no-share-monthly" id="prof-no-share-monthly" />
                  <Label htmlFor="prof-no-share-monthly" className="font-normal cursor-pointer">Professional without share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prof-share-yearly" id="prof-share-yearly" />
                  <Label htmlFor="prof-share-yearly" className="font-normal cursor-pointer">Professional with share yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prof-no-share-yearly" id="prof-no-share-yearly" />
                  <Label htmlFor="prof-no-share-yearly" className="font-normal cursor-pointer">Professional without share yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ent-share-monthly" id="ent-share-monthly" />
                  <Label htmlFor="ent-share-monthly" className="font-normal cursor-pointer">Enterprise with share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ent-no-share-monthly" id="ent-no-share-monthly" />
                  <Label htmlFor="ent-no-share-monthly" className="font-normal cursor-pointer">Enterprise without share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ent-share-yearly" id="ent-share-yearly" />
                  <Label htmlFor="ent-share-yearly" className="font-normal cursor-pointer">Enterprise with share yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ent-no-share-yearly" id="ent-no-share-yearly" />
                  <Label htmlFor="ent-no-share-yearly" className="font-normal cursor-pointer">Enterprise without share yearly</Label>
                </div>
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>

          {/* Learners */}
          <Collapsible open={learnersOpen} onOpenChange={setLearnersOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-muted">
              <span className="font-semibold">Learners</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", learnersOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pt-3 space-y-4">
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="learners-active" id="learners-active" />
                  <Label htmlFor="learners-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="learners-inactive" id="learners-inactive" />
                  <Label htmlFor="learners-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="learners-expired" id="learners-expired" />
                  <Label htmlFor="learners-expired" className="font-normal cursor-pointer">Expired</Label>
                </div>
              </RadioGroup>

              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox id="courses" defaultChecked />
                  <Label htmlFor="courses" className="font-medium cursor-pointer">Courses</Label>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">Select All</Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">Unselect All</Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-9 h-9 text-sm" />
                  </div>
                  <RadioGroup className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intro-marketing" id="intro-marketing" />
                      <Label htmlFor="intro-marketing" className="text-sm font-normal cursor-pointer">Introduction to Marketing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="data-analytics" id="data-analytics" />
                      <Label htmlFor="data-analytics" className="text-sm font-normal cursor-pointer">Advanced Data Analytics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="project-mgmt" id="project-mgmt" />
                      <Label htmlFor="project-mgmt" className="text-sm font-normal cursor-pointer">Project Management Essentials</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="digital-marketing" id="digital-marketing" />
                      <Label htmlFor="digital-marketing" className="text-sm font-normal cursor-pointer">Digital Marketing Masterclass</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="leadership" id="leadership" />
                      <Label htmlFor="leadership" className="text-sm font-normal cursor-pointer">Leadership and Team Building</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox id="webinars" defaultChecked />
                  <Label htmlFor="webinars" className="font-medium cursor-pointer">Webinars</Label>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">Select All</Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">Unselect All</Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search webinars..." className="pl-9 h-9 text-sm" />
                  </div>
                  <RadioGroup className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ai-education" id="ai-education" />
                      <Label htmlFor="ai-education" className="text-sm font-normal cursor-pointer">Future of AI in Education</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online-teaching" id="online-teaching" />
                      <Label htmlFor="online-teaching" className="text-sm font-normal cursor-pointer">Effective Online Teaching Strategies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="learning-communities" id="learning-communities" />
                      <Label htmlFor="learning-communities" className="text-sm font-normal cursor-pointer">Building Engaged Learning Communities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="data-driven" id="data-driven" />
                      <Label htmlFor="data-driven" className="text-sm font-normal cursor-pointer">Data-Driven Decision Making</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student-success" id="student-success" />
                      <Label htmlFor="student-success" className="text-sm font-normal cursor-pointer">Student Success and Retention</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
