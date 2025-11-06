import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Plus, Send, Eye, MousePointerClick, XCircle, UserX, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/campaigns/StatCard";
import { PerformanceChart } from "@/components/campaigns/PerformanceChart";
import { EngagementChart } from "@/components/campaigns/EngagementChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");

  const emailStats = {
    sent: 750,
    opened: 500,
    clicked: 245,
    bounced: 15,
    unsubscribed: 8,
  };

  const whatsappStats = {
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
      subtitle: "",
      date: "11/4/2025",
      status: "sent" as const,
      type: "Email",
    },
    {
      id: 2,
      title: "Marketplace User Onboarding",
      subtitle: "",
      date: "11/4/2025",
      status: "sent" as const,
      type: "Email",
    },
    {
      id: 3,
      title: "Monthly Newsletter",
      subtitle: "Your Monthly Update - January 2025",
      date: "11/3/2025",
      status: "sent" as const,
      type: "Email",
    },
    {
      id: 4,
      title: "Welcome Email Series",
      subtitle: "Welcome to Our Platform!",
      date: "11/3/2025",
      status: "sent" as const,
      type: "Email",
    },
    {
      id: 5,
      title: "Customer Feedback Request",
      subtitle: "We Value Your Feedback",
      date: "11/3/2025",
      status: "draft" as const,
      type: "Email",
    },
    {
      id: 6,
      title: "Summer Sale Campaign",
      subtitle: "Summer Sale - Up to 50% Off!",
      date: "11/3/2025",
      status: "draft" as const,
      type: "Email",
    },
    {
      id: 7,
      title: "Product Launch Announcement",
      subtitle: "Exciting New Product Launch",
      date: "11/3/2025",
      status: "sent" as const,
      type: "Email",
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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

        {/* Campaigns Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35%]">CAMPAIGN</TableHead>
                <TableHead className="w-[15%]">TYPE</TableHead>
                <TableHead className="w-[15%]">STATUS</TableHead>
                <TableHead className="w-[20%]">CREATED</TableHead>
                <TableHead className="w-[15%] text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-foreground">{campaign.title}</div>
                      {campaign.subtitle && (
                        <div className="text-sm text-muted-foreground">{campaign.subtitle}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-info">
                      <Mail className="h-4 w-4" />
                      <span>{campaign.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={campaign.status === "sent" ? "default" : "secondary"}
                      className={campaign.status === "sent" ? "bg-success text-success-foreground" : ""}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{campaign.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="link"
                      className="text-info hover:text-info/80 p-0"
                      onClick={() => navigate(campaign.status === "draft" ? "/create-campaign" : `/campaign/${campaign.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Index;
