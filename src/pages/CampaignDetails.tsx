import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Users, Send, Eye, MousePointerClick, FileDown, ArrowUpRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("email");

  // Mock campaign data - would come from API/state in real app
  const campaign = {
    title: "Q1 2025 New Features Launch",
    totalRecipients: 8,
    delivered: 8,
    uniqueOpens: 5,
    totalClicks: 0,
  };

  const learners = [
    {
      id: 1,
      name: "Sreekanth S",
      email: "coursedirector@neyvar.in",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered"],
      avatar: "S",
      color: "bg-purple-500",
    },
    {
      id: 2,
      name: "Ratheesh Babu",
      email: "ratheeshbabu42@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered"],
      avatar: "R",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Sajid",
      email: "zajiddhan@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered", "Email Opened"],
      avatar: "S",
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Angel Malar",
      email: "angelmalar97@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered", "Email Opened"],
      avatar: "A",
      color: "bg-purple-500",
    },
    {
      id: 5,
      name: "Sreelekshmi",
      email: "lekshmiraji033@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered", "Email Opened"],
      avatar: "S",
      color: "bg-purple-500",
    },
  ];

  const filteredLearners = learners.filter((learner) =>
    learner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    learner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{campaign.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Total recipients</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of people who received this campaign</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-3xl font-bold">{campaign.totalRecipients}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Delivered</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Successfully delivered messages</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-3xl font-bold">{campaign.delivered}</p>
                  </div>
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Unique opens</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of unique recipients who opened</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-3xl font-bold">{campaign.uniqueOpens}</p>
                  </div>
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Total clicks</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total number of link clicks</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-3xl font-bold">{campaign.totalClicks}</p>
                  </div>
                  <MousePointerClick className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
                <div className="flex gap-2 items-center w-full md:w-auto">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Search by email and press enter"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 md:w-[300px]"
                  />
                </div>
                <Button variant="outline" className="gap-2 w-full md:w-auto">
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <Select defaultValue="tags">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tags">Tags</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{filteredLearners.length} learner(s)</p>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NAME</TableHead>
                      <TableHead>EMAIL</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          DELIVERY TIME
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>When the message was delivered</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableHead>
                      <TableHead>TAGS</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLearners.map((learner) => (
                      <TableRow key={learner.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className={learner.color}>
                                {learner.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{learner.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{learner.email}</TableCell>
                        <TableCell className="text-muted-foreground">{learner.deliveryTime}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 flex-wrap">
                            {learner.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant={tag === "Email Opened" ? "secondary" : "default"}
                                className={tag === "Delivered" ? "bg-success/10 text-success hover:bg-success/20" : ""}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Campaign Name</p>
                  <p className="text-base font-medium">{campaign.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="bg-success text-success-foreground">SENT</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created Date</p>
                  <p className="text-base font-medium">Jan 14, 2025</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CampaignDetails;
