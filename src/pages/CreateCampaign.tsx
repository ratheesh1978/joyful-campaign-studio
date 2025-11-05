import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Send, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoTab } from "@/components/campaigns/create/BasicInfoTab";
import { ContentTab } from "@/components/campaigns/create/ContentTab";
import { AutomationTab } from "@/components/campaigns/create/AutomationTab";
import { useToast } from "@/hooks/use-toast";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [campaignData, setCampaignData] = useState({
    type: "email",
    name: "",
    senderName: "",
    senderEmail: "",
    targetAudience: {},
    contentType: "",
    message: "",
    automationRules: []
  });

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your campaign has been saved as a draft.",
    });
  };

  const handleSchedule = () => {
    toast({
      title: "Schedule Campaign",
      description: "Opening schedule options...",
    });
  };

  const handleSendNow = () => {
    toast({
      title: "Campaign Sent",
      description: "Your campaign is being sent to the target audience.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Create New Campaign</h1>
            <p className="text-sm text-muted-foreground">Design and launch your marketing campaign</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button variant="outline" onClick={handleSchedule}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button onClick={handleSendNow}>
              <Send className="mr-2 h-4 w-4" />
              Send Now
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info" className="mt-0">
              <BasicInfoTab
                data={campaignData}
                onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              />
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <ContentTab
                data={campaignData}
                onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              />
            </TabsContent>

            <TabsContent value="automation" className="mt-0">
              <AutomationTab
                data={campaignData}
                onChange={(data) => setCampaignData({ ...campaignData, ...data })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
