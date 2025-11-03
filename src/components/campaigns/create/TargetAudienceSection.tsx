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
import { ChevronLeft, Building2, GraduationCap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TargetAudienceSectionProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TargetAudienceSection({ data, onChange, onNext, onBack }: TargetAudienceSectionProps) {
  const [activeTab, setActiveTab] = useState("marketplace-institutes");
  const [filters, setFilters] = useState<any>({});

  const courses = [
    "Web Development Bootcamp",
    "Data Science Fundamentals",
    "Digital Marketing Master",
    "UI/UX Design Course",
    "Python Programming",
  ];

  const webinars = [
    "AI in Education",
    "Future of Learning",
    "Building Online Communities",
    "EdTech Trends 2024",
  ];

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onChange({ targetAudience: newFilters });
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Select Target Group</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose who should receive this campaign
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marketplace-institutes">
              <Building2 className="mr-2 h-4 w-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="white-label">
              <Building2 className="mr-2 h-4 w-4" />
              White-Label
            </TabsTrigger>
            <TabsTrigger value="learners">
              <GraduationCap className="mr-2 h-4 w-4" />
              Learners
            </TabsTrigger>
          </TabsList>

          {/* Marketplace Institutes */}
          <TabsContent value="marketplace-institutes" className="space-y-4 rounded-lg border p-4">
            <div className="space-y-3">
              <Label>Institute Status</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mp-active"
                    checked={filters.mpActive}
                    onCheckedChange={(checked) => updateFilter("mpActive", checked)}
                  />
                  <label htmlFor="mp-active" className="text-sm font-medium">
                    Active Institutes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mp-inactive"
                    checked={filters.mpInactive}
                    onCheckedChange={(checked) => updateFilter("mpInactive", checked)}
                  />
                  <label htmlFor="mp-inactive" className="text-sm font-medium">
                    Inactive Institutes
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* White-Label Institutes */}
          <TabsContent value="white-label" className="space-y-4 rounded-lg border p-4">
            <div className="space-y-3">
              <Label>Select Plan</Label>
              <Select onValueChange={(value) => updateFilter("wlPlan", value)}>
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

            {filters.wlPlan && (
              <div className="space-y-3">
                <Label>Status Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wl-active"
                      checked={filters.wlActive}
                      onCheckedChange={(checked) => updateFilter("wlActive", checked)}
                    />
                    <label htmlFor="wl-active" className="text-sm font-medium">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wl-inactive"
                      checked={filters.wlInactive}
                      onCheckedChange={(checked) => updateFilter("wlInactive", checked)}
                    />
                    <label htmlFor="wl-inactive" className="text-sm font-medium">
                      Inactive
                    </label>
                  </div>
                  {(filters.wlPlan === "professional" || filters.wlPlan === "enterprise") && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wl-expired"
                        checked={filters.wlExpired}
                        onCheckedChange={(checked) => updateFilter("wlExpired", checked)}
                      />
                      <label htmlFor="wl-expired" className="text-sm font-medium">
                        Expired
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2 border-t pt-4">
                  <Label>Share Status</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="with-share"
                        checked={filters.withShare}
                        onCheckedChange={(checked) => updateFilter("withShare", checked)}
                      />
                      <label htmlFor="with-share" className="text-sm font-medium">
                        With Share
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="without-share"
                        checked={filters.withoutShare}
                        onCheckedChange={(checked) => updateFilter("withoutShare", checked)}
                      />
                      <label htmlFor="without-share" className="text-sm font-medium">
                        Without Share
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Marketplace Learners */}
          <TabsContent value="learners" className="space-y-4 rounded-lg border p-4">
            <div className="space-y-3">
              <Label>Learner Status</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="learner-active"
                    checked={filters.learnerActive}
                    onCheckedChange={(checked) => updateFilter("learnerActive", checked)}
                  />
                  <label htmlFor="learner-active" className="text-sm font-medium">
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="learner-inactive"
                    checked={filters.learnerInactive}
                    onCheckedChange={(checked) => updateFilter("learnerInactive", checked)}
                  />
                  <label htmlFor="learner-inactive" className="text-sm font-medium">
                    Inactive
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="learner-expired"
                    checked={filters.learnerExpired}
                    onCheckedChange={(checked) => updateFilter("learnerExpired", checked)}
                  />
                  <label htmlFor="learner-expired" className="text-sm font-medium">
                    Expired
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="learner-non-subscribed"
                    checked={filters.learnerNonSubscribed}
                    onCheckedChange={(checked) => updateFilter("learnerNonSubscribed", checked)}
                  />
                  <label htmlFor="learner-non-subscribed" className="text-sm font-medium">
                    Non-Subscribed
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <Label>Filter by Course</Label>
              <Select onValueChange={(value) => updateFilter("selectedCourse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 border-t pt-4">
              <Label>Filter by Webinar</Label>
              <Select onValueChange={(value) => updateFilter("selectedWebinar", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select webinar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select All Webinars</SelectItem>
                  {webinars.map((webinar) => (
                    <SelectItem key={webinar} value={webinar}>
                      {webinar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Estimated Audience:</span>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">~2,500 recipients</Badge>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} className="w-full">
            Next: Automation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
