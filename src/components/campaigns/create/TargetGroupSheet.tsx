import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

  // Marketplace Institutes state
  const [marketplaceInstitutes, setMarketplaceInstitutes] = useState({
    active: false,
    inactive: false,
    'abc-institute': false,
    'xyz-academy': false,
    'tech-learning': false,
  });

  // White Label Institutes state
  const [whiteLabelInstitutes, setWhiteLabelInstitutes] = useState({
    active: false,
    inactive: false,
    expired: false,
    'premium-institute': false,
    'elite-academy': false,
    'pro-learning': false,
  });

  // Membership state
  const [membership, setMembership] = useState({
    basic: false,
    'prof-share-monthly': false,
    'prof-no-share-monthly': false,
    'prof-share-yearly': false,
    'prof-no-share-yearly': false,
    'ent-share-monthly': false,
    'ent-no-share-monthly': false,
    'ent-share-yearly': false,
    'ent-no-share-yearly': false,
  });

  // Learners state
  const [learners, setLearners] = useState({
    active: false,
    inactive: false,
    expired: false,
  });

  // Courses state
  const [courses, setCourses] = useState({
    'intro-marketing': false,
    'data-analytics': false,
    'project-mgmt': false,
    'digital-marketing': false,
    'leadership': false,
  });

  // Webinars state
  const [webinars, setWebinars] = useState({
    'ai-education': false,
    'online-teaching': false,
    'learning-communities': false,
    'data-driven': false,
    'student-success': false,
  });

  const handleApply = () => {
    // Save all selected filters to data
    onChange({
      targetFilters: {
        marketplaceInstitutes,
        whiteLabelInstitutes,
        membership,
        learners,
        courses,
        webinars,
      }
    });
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
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketplace-active" />
                  <Label htmlFor="marketplace-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketplace-inactive" />
                  <Label htmlFor="marketplace-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-sm text-muted-foreground">Select Specific Institutes</Label>
                <div className="flex items-center justify-between mt-2">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-xs"
                    onClick={() => setMarketplaceInstitutes(prev => ({ ...prev, 'abc-institute': true, 'xyz-academy': true, 'tech-learning': true }))}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-xs"
                    onClick={() => setMarketplaceInstitutes(prev => ({ ...prev, 'abc-institute': false, 'xyz-academy': false, 'tech-learning': false }))}
                  >
                    Unselect All
                  </Button>
                </div>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search institutes..." className="pl-9" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="abc-institute" 
                      checked={marketplaceInstitutes['abc-institute']}
                      onCheckedChange={(checked) => setMarketplaceInstitutes(prev => ({ ...prev, 'abc-institute': !!checked }))}
                    />
                    <Label htmlFor="abc-institute" className="font-normal cursor-pointer">ABC Institute</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="xyz-academy" 
                      checked={marketplaceInstitutes['xyz-academy']}
                      onCheckedChange={(checked) => setMarketplaceInstitutes(prev => ({ ...prev, 'xyz-academy': !!checked }))}
                    />
                    <Label htmlFor="xyz-academy" className="font-normal cursor-pointer">XYZ Academy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tech-learning" 
                      checked={marketplaceInstitutes['tech-learning']}
                      onCheckedChange={(checked) => setMarketplaceInstitutes(prev => ({ ...prev, 'tech-learning': !!checked }))}
                    />
                    <Label htmlFor="tech-learning" className="font-normal cursor-pointer">Tech Learning Center</Label>
                  </div>
                </div>
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
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="wl-active" />
                  <Label htmlFor="wl-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wl-inactive" />
                  <Label htmlFor="wl-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wl-expired" />
                  <Label htmlFor="wl-expired" className="font-normal cursor-pointer">Expired</Label>
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-sm text-muted-foreground">Select Specific Institutes</Label>
                <div className="flex items-center justify-between mt-2">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-xs"
                    onClick={() => setWhiteLabelInstitutes(prev => ({ ...prev, 'premium-institute': true, 'elite-academy': true, 'pro-learning': true }))}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-xs"
                    onClick={() => setWhiteLabelInstitutes(prev => ({ ...prev, 'premium-institute': false, 'elite-academy': false, 'pro-learning': false }))}
                  >
                    Unselect All
                  </Button>
                </div>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search institutes..." className="pl-9" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="premium-institute" 
                      checked={whiteLabelInstitutes['premium-institute']}
                      onCheckedChange={(checked) => setWhiteLabelInstitutes(prev => ({ ...prev, 'premium-institute': !!checked }))}
                    />
                    <Label htmlFor="premium-institute" className="font-normal cursor-pointer">Premium Institute</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="elite-academy" 
                      checked={whiteLabelInstitutes['elite-academy']}
                      onCheckedChange={(checked) => setWhiteLabelInstitutes(prev => ({ ...prev, 'elite-academy': !!checked }))}
                    />
                    <Label htmlFor="elite-academy" className="font-normal cursor-pointer">Elite Academy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pro-learning" 
                      checked={whiteLabelInstitutes['pro-learning']}
                      onCheckedChange={(checked) => setWhiteLabelInstitutes(prev => ({ ...prev, 'pro-learning': !!checked }))}
                    />
                    <Label htmlFor="pro-learning" className="font-normal cursor-pointer">Pro Learning Hub</Label>
                  </div>
                </div>
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
              <div className="flex items-center justify-between mb-2">
                <Button 
                  variant="link" 
                  size="sm" 
                  className="h-auto p-0 text-xs"
                  onClick={() => setMembership({
                    basic: true,
                    'prof-share-monthly': true,
                    'prof-no-share-monthly': true,
                    'prof-share-yearly': true,
                    'prof-no-share-yearly': true,
                    'ent-share-monthly': true,
                    'ent-no-share-monthly': true,
                    'ent-share-yearly': true,
                    'ent-no-share-yearly': true,
                  })}
                >
                  Select All
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="h-auto p-0 text-xs"
                  onClick={() => setMembership({
                    basic: false,
                    'prof-share-monthly': false,
                    'prof-no-share-monthly': false,
                    'prof-share-yearly': false,
                    'prof-no-share-yearly': false,
                    'ent-share-monthly': false,
                    'ent-no-share-monthly': false,
                    'ent-share-yearly': false,
                    'ent-no-share-yearly': false,
                  })}
                >
                  Unselect All
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="basic" 
                    checked={membership.basic}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, basic: !!checked }))}
                  />
                  <Label htmlFor="basic" className="font-normal cursor-pointer">Basic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="prof-share-monthly" 
                    checked={membership['prof-share-monthly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'prof-share-monthly': !!checked }))}
                  />
                  <Label htmlFor="prof-share-monthly" className="font-normal cursor-pointer">Professional with share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="prof-no-share-monthly" 
                    checked={membership['prof-no-share-monthly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'prof-no-share-monthly': !!checked }))}
                  />
                  <Label htmlFor="prof-no-share-monthly" className="font-normal cursor-pointer">Professional without share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="prof-share-yearly" 
                    checked={membership['prof-share-yearly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'prof-share-yearly': !!checked }))}
                  />
                  <Label htmlFor="prof-share-yearly" className="font-normal cursor-pointer">Professional with share yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="prof-no-share-yearly" 
                    checked={membership['prof-no-share-yearly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'prof-no-share-yearly': !!checked }))}
                  />
                  <Label htmlFor="prof-no-share-yearly" className="font-normal cursor-pointer">Professional without share yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ent-share-monthly" 
                    checked={membership['ent-share-monthly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'ent-share-monthly': !!checked }))}
                  />
                  <Label htmlFor="ent-share-monthly" className="font-normal cursor-pointer">Enterprise with share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ent-no-share-monthly" 
                    checked={membership['ent-no-share-monthly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'ent-no-share-monthly': !!checked }))}
                  />
                  <Label htmlFor="ent-no-share-monthly" className="font-normal cursor-pointer">Enterprise without share monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ent-share-yearly" 
                    checked={membership['ent-share-yearly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'ent-share-yearly': !!checked }))}
                  />
                  <Label htmlFor="ent-share-yearly" className="font-normal cursor-pointer">Enterprise with share yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ent-no-share-yearly" 
                    checked={membership['ent-no-share-yearly']}
                    onCheckedChange={(checked) => setMembership(prev => ({ ...prev, 'ent-no-share-yearly': !!checked }))}
                  />
                  <Label htmlFor="ent-no-share-yearly" className="font-normal cursor-pointer">Enterprise without share yearly</Label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Learners */}
          <Collapsible open={learnersOpen} onOpenChange={setLearnersOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-muted">
              <span className="font-semibold">Learners</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", learnersOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pt-3 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="learners-active" />
                  <Label htmlFor="learners-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="learners-inactive" />
                  <Label htmlFor="learners-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="learners-expired" />
                  <Label htmlFor="learners-expired" className="font-normal cursor-pointer">Expired</Label>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox id="courses" defaultChecked />
                  <Label htmlFor="courses" className="font-medium cursor-pointer">Courses</Label>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-xs"
                      onClick={() => setCourses({
                        'intro-marketing': true,
                        'data-analytics': true,
                        'project-mgmt': true,
                        'digital-marketing': true,
                        'leadership': true,
                      })}
                    >
                      Select All
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-xs"
                      onClick={() => setCourses({
                        'intro-marketing': false,
                        'data-analytics': false,
                        'project-mgmt': false,
                        'digital-marketing': false,
                        'leadership': false,
                      })}
                    >
                      Unselect All
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-9 h-9 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="intro-marketing" 
                        checked={courses['intro-marketing']}
                        onCheckedChange={(checked) => setCourses(prev => ({ ...prev, 'intro-marketing': !!checked }))}
                      />
                      <Label htmlFor="intro-marketing" className="text-sm font-normal cursor-pointer">Introduction to Marketing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="data-analytics" 
                        checked={courses['data-analytics']}
                        onCheckedChange={(checked) => setCourses(prev => ({ ...prev, 'data-analytics': !!checked }))}
                      />
                      <Label htmlFor="data-analytics" className="text-sm font-normal cursor-pointer">Advanced Data Analytics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="project-mgmt" 
                        checked={courses['project-mgmt']}
                        onCheckedChange={(checked) => setCourses(prev => ({ ...prev, 'project-mgmt': !!checked }))}
                      />
                      <Label htmlFor="project-mgmt" className="text-sm font-normal cursor-pointer">Project Management Essentials</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="digital-marketing" 
                        checked={courses['digital-marketing']}
                        onCheckedChange={(checked) => setCourses(prev => ({ ...prev, 'digital-marketing': !!checked }))}
                      />
                      <Label htmlFor="digital-marketing" className="text-sm font-normal cursor-pointer">Digital Marketing Masterclass</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="leadership" 
                        checked={courses['leadership']}
                        onCheckedChange={(checked) => setCourses(prev => ({ ...prev, 'leadership': !!checked }))}
                      />
                      <Label htmlFor="leadership" className="text-sm font-normal cursor-pointer">Leadership and Team Building</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox id="webinars" defaultChecked />
                  <Label htmlFor="webinars" className="font-medium cursor-pointer">Webinars</Label>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-xs"
                      onClick={() => setWebinars({
                        'ai-education': true,
                        'online-teaching': true,
                        'learning-communities': true,
                        'data-driven': true,
                        'student-success': true,
                      })}
                    >
                      Select All
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-xs"
                      onClick={() => setWebinars({
                        'ai-education': false,
                        'online-teaching': false,
                        'learning-communities': false,
                        'data-driven': false,
                        'student-success': false,
                      })}
                    >
                      Unselect All
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search webinars..." className="pl-9 h-9 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ai-education" 
                        checked={webinars['ai-education']}
                        onCheckedChange={(checked) => setWebinars(prev => ({ ...prev, 'ai-education': !!checked }))}
                      />
                      <Label htmlFor="ai-education" className="text-sm font-normal cursor-pointer">Future of AI in Education</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="online-teaching" 
                        checked={webinars['online-teaching']}
                        onCheckedChange={(checked) => setWebinars(prev => ({ ...prev, 'online-teaching': !!checked }))}
                      />
                      <Label htmlFor="online-teaching" className="text-sm font-normal cursor-pointer">Effective Online Teaching Strategies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="learning-communities" 
                        checked={webinars['learning-communities']}
                        onCheckedChange={(checked) => setWebinars(prev => ({ ...prev, 'learning-communities': !!checked }))}
                      />
                      <Label htmlFor="learning-communities" className="text-sm font-normal cursor-pointer">Building Engaged Learning Communities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="data-driven" 
                        checked={webinars['data-driven']}
                        onCheckedChange={(checked) => setWebinars(prev => ({ ...prev, 'data-driven': !!checked }))}
                      />
                      <Label htmlFor="data-driven" className="text-sm font-normal cursor-pointer">Data-Driven Decision Making</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="student-success" 
                        checked={webinars['student-success']}
                        onCheckedChange={(checked) => setWebinars(prev => ({ ...prev, 'student-success': !!checked }))}
                      />
                      <Label htmlFor="student-success" className="text-sm font-normal cursor-pointer">Student Success and Retention</Label>
                    </div>
                  </div>
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
