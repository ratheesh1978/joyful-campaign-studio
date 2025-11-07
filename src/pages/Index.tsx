import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Plus, Send, Eye, MousePointerClick, XCircle, UserX, Calendar as CalendarIcon, Search, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/campaigns/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilterType, setDateFilterType] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date>();

  const emailStats = {
    sent: 750,
    delivered: 735,
    opened: 500,
    clicked: 245,
    bounced: 15,
    unsubscribed: 8,
  };

  const whatsappStats = {
    sent: 1200,
    delivered: 1192,
    opened: 980,
    clicked: 456,
    bounced: 8,
    unsubscribed: 3,
  };

  const stats = activeTab === "email" ? emailStats : whatsappStats;

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

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilterType !== "all" && selectedDate) {
        const campaignDate = new Date(campaign.date);
        const compareDate = new Date(selectedDate);
        
        switch (dateFilterType) {
          case "on":
            matchesDate = campaignDate.toDateString() === compareDate.toDateString();
            break;
          case "before":
            matchesDate = campaignDate < compareDate;
            break;
          case "after":
            matchesDate = campaignDate > compareDate;
            break;
          case "between":
            if (selectedDateEnd) {
              const endDate = new Date(selectedDateEnd);
              matchesDate = campaignDate >= compareDate && campaignDate <= endDate;
            }
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, statusFilter, dateFilterType, selectedDate, selectedDateEnd]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-primary">Campaign Manager</h1>
            <Button className="gap-2" onClick={() => navigate("/create-campaign")}>
              <Plus className="h-4 w-4" />
              Create {activeTab === "email" ? "Email" : "WhatsApp"} Campaign
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">

        {/* Filters Section */}
        <Card className="p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Select value={dateFilterType} onValueChange={(value) => {
                setDateFilterType(value);
                if (value === "all") {
                  setSelectedDate(undefined);
                  setSelectedDateEnd(undefined);
                }
              }}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Created On" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="on">On</SelectItem>
                  <SelectItem value="before">Before</SelectItem>
                  <SelectItem value="after">After</SelectItem>
                  <SelectItem value="between">Between</SelectItem>
                </SelectContent>
              </Select>
              
              {dateFilterType !== "all" && (
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full md:w-[180px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {dateFilterType === "between" && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full md:w-[180px] justify-start text-left font-normal",
                            !selectedDateEnd && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDateEnd ? format(selectedDateEnd, "PPP") : <span>End date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDateEnd}
                          onSelect={setSelectedDateEnd}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            icon={Send}
            label="Sent"
            value={stats.sent}
            colorClass="bg-info/10 text-info"
          />
          <StatCard
            icon={CheckCircle2}
            label="Delivered"
            value={stats.delivered}
            colorClass="bg-primary/10 text-primary"
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

        {/* Campaigns Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">CAMPAIGN</TableHead>
                <TableHead className="w-[20%]">STATUS</TableHead>
                <TableHead className="w-[25%]">CREATED</TableHead>
                <TableHead className="w-[15%] text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{campaign.title}</div>
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
                      <CalendarIcon className="h-4 w-4" />
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
