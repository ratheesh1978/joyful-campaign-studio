import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CampaignTypeSection } from "@/components/campaigns/create/CampaignTypeSection";
import { ContentSection } from "@/components/campaigns/create/ContentSection";
import { TargetAudienceSection } from "@/components/campaigns/create/TargetAudienceSection";
import { ScheduleAutomationSection } from "@/components/campaigns/create/ScheduleAutomationSection";
import { useToast } from "@/hooks/use-toast";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    type: "email",
    name: "",
    sender: "",
    description: "",
    contentType: "",
    targetAudience: {},
    triggers: []
  });

  const steps = [
    { id: 1, name: "Campaign Details" },
    { id: 2, name: "Target Audience" },
    { id: 3, name: "Content" },
    { id: 4, name: "Schedule & Automation" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your campaign has been saved as a draft.",
    });
  };

  const handleSendTest = () => {
    toast({
      title: "Test Sent",
      description: "A test campaign has been sent to your email/number.",
    });
  };

  const handleLaunch = () => {
    toast({
      title: "Campaign Launched",
      description: "Your campaign is now live and being sent to the target audience.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Create Campaign</h1>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-card">
        <div className="container px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      currentStep >= step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="mt-2 text-xs font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-16 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {currentStep === 1 && (
            <CampaignTypeSection
              data={campaignData}
              onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              onNext={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 2 && (
            <TargetAudienceSection
              data={campaignData}
              onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && (
            <ContentSection
              data={campaignData}
              onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && (
            <ScheduleAutomationSection
              data={campaignData}
              onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              onBack={() => setCurrentStep(3)}
            />
          )}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-20 items-center justify-between px-4">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleSendTest}>
              Send Test
            </Button>
            <Button onClick={handleLaunch}>
              Launch Campaign
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
