import { useState } from "react";
import { Mail, MessageSquare, ArrowLeft, Calendar as CalendarIcon, Send, Save } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoTab } from "@/components/campaigns/create/BasicInfoTab";
import { ContentTab } from "@/components/campaigns/create/ContentTab";
import { AutomationTab } from "@/components/campaigns/create/AutomationTab";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { SpamWarningDialog } from "@/components/campaigns/SpamWarningDialog";
import { supabase } from "@/integrations/supabase/client";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [isSpamWarningOpen, setIsSpamWarningOpen] = useState(false);
  const [spamReason, setSpamReason] = useState<string>("");
  const [isCheckingSpam, setIsCheckingSpam] = useState(false);
  const [campaignData, setCampaignData] = useState({
    type: "email",
    name: "",
    senderName: "",
    senderEmail: "",
    whatsappNumber: "",
    subject: "",
    targetAudience: {},
    contentType: "",
    message: "",
    automationRules: [],
    scheduledDate: undefined as Date | undefined,
    scheduledTime: ""
  });

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your campaign has been saved as a draft.",
    });
  };

  const handleSchedule = () => {
    setIsScheduleDialogOpen(true);
  };

  const handleConfirmSchedule = () => {
    if (!scheduledDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for scheduling.",
        variant: "destructive"
      });
      return;
    }

    setCampaignData({
      ...campaignData,
      scheduledDate,
      scheduledTime
    });

    setIsScheduleDialogOpen(false);
    toast({
      title: "Campaign Scheduled",
      description: `Campaign will be sent on ${format(scheduledDate, "PPP")} at ${scheduledTime}`,
    });
  };

  const handleSendNow = async () => {
    // Validate required fields
    if (!campaignData.subject || !campaignData.message) {
      toast({
        title: "Missing Content",
        description: "Please fill in both subject and message before sending.",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingSpam(true);
    
    try {
      // Check for spam content
      const { data, error } = await supabase.functions.invoke('check-spam-content', {
        body: {
          subject: campaignData.subject,
          content: campaignData.message
        }
      });

      if (error) {
        console.error('Error checking spam:', error);
        toast({
          title: "Error",
          description: "Failed to validate content. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data?.isSpam) {
        setSpamReason(data.reason || "Content appears to contain spam-like patterns.");
        setIsSpamWarningOpen(true);
        return;
      }

      // If not spam, proceed with sending
      toast({
        title: "Campaign Sent",
        description: "Your campaign is being sent to the target audience.",
      });
      navigate("/");
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast({
        title: "Error",
        description: "Failed to send campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCheckingSpam(false);
    }
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
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Create New Campaign</h1>
                <p className="text-sm text-muted-foreground">Design and launch your marketing campaign</p>
              </div>
              <ToggleGroup
                type="single"
                value={campaignData.type}
                onValueChange={(value) => {
                  if (value) {
                    setCampaignData({ ...campaignData, type: value });
                  }
                }}
                className="border rounded-lg p-1"
              >
                <ToggleGroupItem value="email" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </ToggleGroupItem>
                <ToggleGroupItem value="whatsapp" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button variant="outline" onClick={handleSchedule}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button onClick={handleSendNow} disabled={isCheckingSpam}>
              <Send className="mr-2 h-4 w-4" />
              {isCheckingSpam ? "Checking..." : "Send Now"}
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
                onNext={() => setActiveTab("content")}
              />
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <ContentTab
                data={campaignData}
                onChange={(data) => setCampaignData({ ...campaignData, ...data })}
                onNext={() => setActiveTab("automation")}
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

      {/* Spam Warning Dialog */}
      <SpamWarningDialog 
        open={isSpamWarningOpen} 
        onOpenChange={setIsSpamWarningOpen}
        reason={spamReason}
      />

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Campaign</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <div className="flex justify-center border rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </div>
              {scheduledDate && (
                <p className="text-sm text-muted-foreground">
                  Selected: {format(scheduledDate, "PPP")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-time">Select Time</Label>
              <Input
                id="schedule-time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSchedule}>
              Confirm Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
