import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Plus, Users, Send, Eye, MousePointerClick, XCircle, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/campaigns/StatCard";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { PerformanceChart } from "@/components/campaigns/PerformanceChart";
import { EngagementChart } from "@/components/campaigns/EngagementChart";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");

  const emailStats = {
    totalRecipients: 750,
    sent: 750,
    opened: 500,
    clicked: 245,
    bounced: 15,
    unsubscribed: 8,
  };

  const whatsappStats = {
    totalRecipients: 1200,
    sent: 1200,
    opened: 980,
    clicked: 456,
    bounced: 8,
    unsubscribed: 3,
  };

  const stats = activeTab === "email" ? emailStats : whatsappStats;

  const performanceData = [
    { name: "Q1 2025 New Features...", opened: 180, clicked: 95 },
    { name: "Marketplace User Onb...", opened: 320, clicked: 150 },
    { name: "Product Update Newsl...", opened: 0, clicked: 0 },
  ];

  const engagementData = [
    { name: "Opened", value: 65, color: "hsl(var(--chart-1))" },
    { name: "Clicked", value: 32, color: "hsl(var(--chart-3))" },
    { name: "Bounced", value: 2, color: "hsl(var(--chart-4))" },
    { name: "Unsubscribed", value: 1, color: "hsl(var(--chart-5))" },
  ];

  const campaigns = [
    {
      id: 1,
      title: "Q1 2025 New Features Launch",
      date: "Jan 14, 2025",
      status: "SENT" as const,
      recipients: 250,
      conversion: 38.0,
      opened: 180,
      clicked: 95,
      openRate: 72.0,
    },
    {
      id: 2,
      title: "Marketplace User Onboarding",
      date: "Jan 19, 2025",
      status: "SENT" as const,
      recipients: 500,
      conversion: 30.0,
      opened: 320,
      clicked: 150,
      openRate: 64.0,
    },
    {
      id: 3,
      title: "Product Update Newsletter",
      date: "Jan 27, 2025",
      status: "DRAFT" as const,
      recipients: 0,
      conversion: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Campaign Manager</h1>
          <p className="text-muted-foreground">Create, manage, and track your marketing campaigns</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Tabs and Create Button */}
        <div className="flex items-center justify-between mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                Email Campaigns
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp Campaigns
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="gap-2" onClick={() => navigate("/create-campaign")}>
            <Plus className="h-4 w-4" />
            Create {activeTab === "email" ? "Email" : "WhatsApp"} Campaign
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="Total Recipients"
            value={stats.totalRecipients}
            colorClass="bg-primary/10 text-primary"
          />
          <StatCard
            icon={Send}
            label="Sent"
            value={stats.sent}
            colorClass="bg-info/10 text-info"
          />
          <StatCard
            icon={Eye}
            label="Opened"
            value={stats.opened}
            colorClass="bg-success/10 text-success"
          />
          <StatCard
            icon={MousePointerClick}
            label="Clicked"
            value={stats.clicked}
            colorClass="bg-chart-3/10 text-chart-3"
          />
          <StatCard
            icon={XCircle}
            label="Bounced"
            value={stats.bounced}
            colorClass="bg-warning/10 text-warning"
          />
          <StatCard
            icon={UserX}
            label="Unsubscribed"
            value={stats.unsubscribed}
            colorClass="bg-destructive/10 text-destructive"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PerformanceChart data={performanceData} />
          <EngagementChart data={engagementData} />
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
