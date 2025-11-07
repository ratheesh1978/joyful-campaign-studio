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
  const [selectedLearnerType, setSelectedLearnerType] = useState<string>('');
  const [learnerSubFilters, setLearnerSubFilters] = useState<Record<string, boolean>>({});
  const [learnerSearch, setLearnerSearch] = useState('');

  const handleApply = () => {
    // Save all selected filters to data
    onChange({
      targetFilters: {
        marketplaceInstitutes,
        whiteLabelInstitutes,
        membership,
        learners: {
          type: selectedLearnerType,
          subFilters: learnerSubFilters,
        },
      }
    });
    onOpenChange(false);
  };

  // Mock data for courses and webinars
  const premiumCourses = [
    'Advanced Data Analytics',
    'Project Management Essentials',
    'Digital Marketing Masterclass',
    'Leadership and Team Building',
    'Business Strategy',
  ];

  const freeCourses = [
    'Introduction to Marketing',
    'Basic Programming',
    'Communication Skills',
    'Time Management',
    'Public Speaking',
  ];

  const premiumWebinars = [
    'Future of AI in Education',
    'Data-Driven Decision Making',
    'Student Success and Retention',
    'Advanced Teaching Methods',
  ];

  const freeWebinars = [
    'Effective Online Teaching Strategies',
    'Building Engaged Learning Communities',
    'Introduction to EdTech',
    'Classroom Management Basics',
  ];

  const allCourses = [...premiumCourses, ...freeCourses];
  
  const getSubFilterOptions = () => {
    switch (selectedLearnerType) {
      case 'premium-courses':
        return premiumCourses;
      case 'free-courses':
        return freeCourses;
      case 'premium-webinars':
        return premiumWebinars;
      case 'free-webinars':
        return freeWebinars;
      case 'course-preview':
      case 'expired':
        return allCourses;
      default:
        return [];
    }
  };

  const filteredSubOptions = getSubFilterOptions().filter(option =>
    option.toLowerCase().includes(learnerSearch.toLowerCase())
  );

  const handleSelectAllSubFilters = () => {
    const newFilters: Record<string, boolean> = {};
    getSubFilterOptions().forEach(option => {
      newFilters[option] = true;
    });
    setLearnerSubFilters(newFilters);
  };

  const handleUnselectAllSubFilters = () => {
    setLearnerSubFilters({});
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
                  <Checkbox 
                    id="marketplace-active" 
                    checked={marketplaceInstitutes.active}
                    onCheckedChange={(checked) => setMarketplaceInstitutes(prev => ({ ...prev, active: !!checked }))}
                  />
                  <Label htmlFor="marketplace-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="marketplace-inactive" 
                    checked={marketplaceInstitutes.inactive}
                    onCheckedChange={(checked) => setMarketplaceInstitutes(prev => ({ ...prev, inactive: !!checked }))}
                  />
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
                  <Checkbox 
                    id="wl-active" 
                    checked={whiteLabelInstitutes.active}
                    onCheckedChange={(checked) => setWhiteLabelInstitutes(prev => ({ ...prev, active: !!checked }))}
                  />
                  <Label htmlFor="wl-active" className="font-normal cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wl-inactive" 
                    checked={whiteLabelInstitutes.inactive}
                    onCheckedChange={(checked) => setWhiteLabelInstitutes(prev => ({ ...prev, inactive: !!checked }))}
                  />
                  <Label htmlFor="wl-inactive" className="font-normal cursor-pointer">Inactive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wl-expired" 
                    checked={whiteLabelInstitutes.expired}
                    onCheckedChange={(checked) => setWhiteLabelInstitutes(prev => ({ ...prev, expired: !!checked }))}
                  />
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
              <span className="font-semibold">Select Learners</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", learnersOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pt-3 space-y-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="all-learners" 
                    checked={selectedLearnerType === 'all-learners'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'all-learners' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="all-learners" className="font-normal cursor-pointer">All learners</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="non-subscribers" 
                    checked={selectedLearnerType === 'non-subscribers'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'non-subscribers' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="non-subscribers" className="font-normal cursor-pointer">Non subscribers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="premium-courses" 
                    checked={selectedLearnerType === 'premium-courses'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'premium-courses' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="premium-courses" className="font-normal cursor-pointer">Premium courses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="free-courses" 
                    checked={selectedLearnerType === 'free-courses'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'free-courses' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="free-courses" className="font-normal cursor-pointer">Free courses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="premium-webinars" 
                    checked={selectedLearnerType === 'premium-webinars'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'premium-webinars' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="premium-webinars" className="font-normal cursor-pointer">Premium webinars</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="free-webinars" 
                    checked={selectedLearnerType === 'free-webinars'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'free-webinars' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="free-webinars" className="font-normal cursor-pointer">Free webinars</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="course-preview" 
                    checked={selectedLearnerType === 'course-preview'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'course-preview' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="course-preview" className="font-normal cursor-pointer">Course preview</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="expired" 
                    checked={selectedLearnerType === 'expired'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'expired' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="expired" className="font-normal cursor-pointer">Expired</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="payment-initiated" 
                    checked={selectedLearnerType === 'payment-initiated'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'payment-initiated' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="payment-initiated" className="font-normal cursor-pointer">Payment initiated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="payment-failed" 
                    checked={selectedLearnerType === 'payment-failed'}
                    onCheckedChange={(checked) => {
                      setSelectedLearnerType(checked ? 'payment-failed' : '');
                      setLearnerSubFilters({});
                      setLearnerSearch('');
                    }}
                  />
                  <Label htmlFor="payment-failed" className="font-normal cursor-pointer">Payment failed</Label>
                </div>
              </div>

              {/* Sub-filters for options that need them */}
              {selectedLearnerType && !['all-learners', 'non-subscribers'].includes(selectedLearnerType) && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  {['payment-initiated', 'payment-failed'].includes(selectedLearnerType) ? (
                    // For payment-initiated and payment-failed, show courses and webinars separately
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Courses</Label>
                        <div className="ml-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-xs"
                              onClick={() => {
                                const newFilters = { ...learnerSubFilters };
                                allCourses.forEach(course => {
                                  newFilters[`course-${course}`] = true;
                                });
                                setLearnerSubFilters(newFilters);
                              }}
                            >
                              Select All Courses
                            </Button>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-xs"
                              onClick={() => {
                                const newFilters = { ...learnerSubFilters };
                                allCourses.forEach(course => {
                                  delete newFilters[`course-${course}`];
                                });
                                setLearnerSubFilters(newFilters);
                              }}
                            >
                              Unselect All
                            </Button>
                          </div>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Search courses..." 
                              className="pl-9 h-9 text-sm"
                              value={learnerSearch}
                              onChange={(e) => setLearnerSearch(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {allCourses
                              .filter(course => course.toLowerCase().includes(learnerSearch.toLowerCase()))
                              .map((course) => (
                                <div key={`course-${course}`} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`course-${course}`}
                                    checked={learnerSubFilters[`course-${course}`] || false}
                                    onCheckedChange={(checked) => {
                                      setLearnerSubFilters(prev => ({
                                        ...prev,
                                        [`course-${course}`]: !!checked
                                      }));
                                    }}
                                  />
                                  <Label htmlFor={`course-${course}`} className="text-sm font-normal cursor-pointer">
                                    {course}
                                  </Label>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t">
                        <Label className="text-sm font-medium">Webinars</Label>
                        <div className="ml-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-xs"
                              onClick={() => {
                                const newFilters = { ...learnerSubFilters };
                                [...premiumWebinars, ...freeWebinars].forEach(webinar => {
                                  newFilters[`webinar-${webinar}`] = true;
                                });
                                setLearnerSubFilters(newFilters);
                              }}
                            >
                              Select All Webinars
                            </Button>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-xs"
                              onClick={() => {
                                const newFilters = { ...learnerSubFilters };
                                [...premiumWebinars, ...freeWebinars].forEach(webinar => {
                                  delete newFilters[`webinar-${webinar}`];
                                });
                                setLearnerSubFilters(newFilters);
                              }}
                            >
                              Unselect All
                            </Button>
                          </div>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Search webinars..." 
                              className="pl-9 h-9 text-sm"
                              value={learnerSearch}
                              onChange={(e) => setLearnerSearch(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {[...premiumWebinars, ...freeWebinars]
                              .filter(webinar => webinar.toLowerCase().includes(learnerSearch.toLowerCase()))
                              .map((webinar) => (
                                <div key={`webinar-${webinar}`} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`webinar-${webinar}`}
                                    checked={learnerSubFilters[`webinar-${webinar}`] || false}
                                    onCheckedChange={(checked) => {
                                      setLearnerSubFilters(prev => ({
                                        ...prev,
                                        [`webinar-${webinar}`]: !!checked
                                      }));
                                    }}
                                  />
                                  <Label htmlFor={`webinar-${webinar}`} className="text-sm font-normal cursor-pointer">
                                    {webinar}
                                  </Label>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // For other options, show the appropriate list
                    <>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs"
                          onClick={handleSelectAllSubFilters}
                        >
                          Select All
                        </Button>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs"
                          onClick={handleUnselectAllSubFilters}
                        >
                          Unselect All
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder={`Search ${selectedLearnerType.includes('webinar') ? 'webinars' : 'courses'}...`}
                          className="pl-9 h-9 text-sm"
                          value={learnerSearch}
                          onChange={(e) => setLearnerSearch(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filteredSubOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={option}
                              checked={learnerSubFilters[option] || false}
                              onCheckedChange={(checked) => {
                                setLearnerSubFilters(prev => ({
                                  ...prev,
                                  [option]: !!checked
                                }));
                              }}
                            />
                            <Label htmlFor={option} className="text-sm font-normal cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
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
