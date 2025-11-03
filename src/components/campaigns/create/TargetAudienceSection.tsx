import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Users, Building2, GraduationCap, Zap, Eye, Mail, MessageSquare, MousePointerClick } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface TargetAudienceSectionProps {
  data: any;
  onChange: (data: any) => void;
  onBack: () => void;
}

export function TargetAudienceSection({ data, onChange, onBack }: TargetAudienceSectionProps) {
  const [activeTab, setActiveTab] = useState("marketplace-institutes");
  const [triggers, setTriggers] = useState<any[]>([]);
  
  // Marketplace Institutes State
  const [marketplaceActive, setMarketplaceActive] = useState(false);
  const [marketplaceInactive, setMarketplaceInactive] = useState(false);
  
  // White-Label Institutes State
  const [whiteLabelPlan, setWhiteLabelPlan] = useState("");
  const [whiteLabelStatus, setWhiteLabelStatus] = useState<string[]>([]);
  const [whiteLabelShare, setWhiteLabelShare] = useState("");
  
  // Marketplace Learners State
  const [learnerStatus, setLearnerStatus] = useState<string[]>([]);
  const [learnerFilterType, setLearnerFilterType] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedWebinars, setSelectedWebinars] = useState<string[]>([]);

  const triggerOptions = [
    {
      id: "mail-opened",
      title: "On Mail Opened",
      description: "Send follow-up when recipient opens the email",
      icon: Eye,
      emailOnly: true,
    },
    {
      id: "mail-not-opened",
      title: "On Mail Not Opened",
      description: "Send reminder if email isn't opened",
      icon: Mail,
      emailOnly: true,
    },
    {
      id: "link-clicked",
      title: "On Link Clicked",
      description: "Engage users who click links",
      icon: MousePointerClick,
      emailOnly: false,
    },
    {
      id: "whatsapp-viewed",
      title: "On WhatsApp Viewed/Replied",
      description: "Follow up when message is viewed",
      icon: MessageSquare,
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
    setTriggers(triggers.map((t) => (t.id === triggerId ? { ...t, delay } : t)));
  };

  const updateTriggerUnit = (triggerId: string, unit: string) => {
    setTriggers(triggers.map((t) => (t.id === triggerId ? { ...t, unit } : t)));
  };

  const isTriggerActive = (triggerId: string) => triggers.some((t) => t.id === triggerId);
  const getTriggerConfig = (triggerId: string) => triggers.find((t) => t.id === triggerId) || { delay: 1, unit: "days" };

  // Mock data
  const courses = ["Web Development Basics", "Advanced React", "Node.js Mastery", "UI/UX Design", "Digital Marketing"];
  const webinars = ["SEO Best Practices", "Email Marketing Tips", "Social Media Strategy", "Content Creation", "Analytics Deep Dive"];

  const handleWhiteLabelStatusToggle = (status: string) => {
    setWhiteLabelStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleLearnerStatusToggle = (status: string) => {
    setLearnerStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev =>
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  const handleWebinarToggle = (webinar: string) => {
    setSelectedWebinars(prev =>
      prev.includes(webinar) ? prev.filter(w => w !== webinar) : [...prev, webinar]
    );
  };

  const handleSelectAllCourses = () => {
    setSelectedCourses(selectedCourses.length === courses.length ? [] : courses);
  };

  const handleSelectAllWebinars = () => {
    setSelectedWebinars(selectedWebinars.length === webinars.length ? [] : webinars);
  };

  return (
    <div className="space-y-6">
      {/* Target Audience Section */}
      <Card className="border-2 backdrop-blur-sm bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Select Target Group
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="marketplace-institutes">
                <Building2 className="mr-2 h-4 w-4" />
                Marketplace Institutes
              </TabsTrigger>
              <TabsTrigger value="white-label">
                <Building2 className="mr-2 h-4 w-4" />
                White-Label Institutes
              </TabsTrigger>
              <TabsTrigger value="learners">
                <GraduationCap className="mr-2 h-4 w-4" />
                Marketplace Learners
              </TabsTrigger>
            </TabsList>

            {/* Marketplace Institutes */}
            <TabsContent value="marketplace-institutes" className="space-y-4 mt-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketplace-active"
                    checked={marketplaceActive}
                    onCheckedChange={(checked) => setMarketplaceActive(checked as boolean)}
                  />
                  <Label htmlFor="marketplace-active" className="cursor-pointer">Active Institutes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketplace-inactive"
                    checked={marketplaceInactive}
                    onCheckedChange={(checked) => setMarketplaceInactive(checked as boolean)}
                  />
                  <Label htmlFor="marketplace-inactive" className="cursor-pointer">Inactive Institutes</Label>
                </div>
              </div>
            </TabsContent>

            {/* White-Label Institutes */}
            <TabsContent value="white-label" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Plan</Label>
                  <Select value={whiteLabelPlan} onValueChange={setWhiteLabelPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {whiteLabelPlan && (
                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <Label className="text-sm font-semibold">Status Filters</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wl-active"
                          checked={whiteLabelStatus.includes("active")}
                          onCheckedChange={() => handleWhiteLabelStatusToggle("active")}
                        />
                        <Label htmlFor="wl-active" className="cursor-pointer">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wl-inactive"
                          checked={whiteLabelStatus.includes("inactive")}
                          onCheckedChange={() => handleWhiteLabelStatusToggle("inactive")}
                        />
                        <Label htmlFor="wl-inactive" className="cursor-pointer">Inactive</Label>
                      </div>
                      {(whiteLabelPlan === "professional" || whiteLabelPlan === "enterprise") && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="wl-expired"
                            checked={whiteLabelStatus.includes("expired")}
                            onCheckedChange={() => handleWhiteLabelStatusToggle("expired")}
                          />
                          <Label htmlFor="wl-expired" className="cursor-pointer">Expired</Label>
                        </div>
                      )}
                    </div>

                    {(whiteLabelPlan === "professional" || whiteLabelPlan === "enterprise") && (
                      <>
                        <Separator className="my-3" />
                        <div className="space-y-2">
                          <Label className="text-sm">Share Options</Label>
                          <Select value={whiteLabelShare} onValueChange={setWhiteLabelShare}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select share option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="with-share">With Share</SelectItem>
                              <SelectItem value="without-share">Without Share</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Marketplace Learners */}
            <TabsContent value="learners" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <Label className="text-sm font-semibold">Learner Status</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["active", "inactive", "expired", "non-subscribed"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`learner-${status}`}
                          checked={learnerStatus.includes(status)}
                          onCheckedChange={() => handleLearnerStatusToggle(status)}
                        />
                        <Label htmlFor={`learner-${status}`} className="cursor-pointer capitalize">
                          {status.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Filter by Content</Label>
                  <Select value={learnerFilterType} onValueChange={setLearnerFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course">By Course</SelectItem>
                      <SelectItem value="webinar">By Webinar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {learnerFilterType === "course" && (
                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Select Courses</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAllCourses}
                      >
                        {selectedCourses.length === courses.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {courses.map((course) => (
                        <div key={course} className="flex items-center space-x-2">
                          <Checkbox
                            id={`course-${course}`}
                            checked={selectedCourses.includes(course)}
                            onCheckedChange={() => handleCourseToggle(course)}
                          />
                          <Label htmlFor={`course-${course}`} className="cursor-pointer">
                            {course}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {learnerFilterType === "webinar" && (
                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Select Webinars</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAllWebinars}
                      >
                        {selectedWebinars.length === webinars.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {webinars.map((webinar) => (
                        <div key={webinar} className="flex items-center space-x-2">
                          <Checkbox
                            id={`webinar-${webinar}`}
                            checked={selectedWebinars.includes(webinar)}
                            onCheckedChange={() => handleWebinarToggle(webinar)}
                          />
                          <Label htmlFor={`webinar-${webinar}`} className="cursor-pointer">
                            {webinar}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trigger Automation Section */}
      <Card className="border-2 backdrop-blur-sm bg-card/50">
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
                        </div>
                      </div>

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
        </CardContent>
      </Card>

      {/* Navigation Button */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="w-full">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}
