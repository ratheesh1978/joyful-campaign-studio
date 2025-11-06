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
import { ArrowLeft, Mail, BarChart2, Sparkles, XCircle, UserMinus, FileDown, ArrowUpRight, Info, ChevronDown, Smartphone, Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("email");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = ["Delivered", "Bounced", "Failed", "Opened", "Link Clicked", "Unsubscribed"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Mock campaign data - would come from API/state in real app
  const campaign = {
    title: "Q1 2025 New Features Launch",
    sent: 0,
    opened: 0,
    clicked: 0,
    bounced: 0,
    unsubscribed: 0,
  };

  // Calculate percentages (avoiding division by zero)
  const total = campaign.sent || 1;
  const sentRate = 100;
  const openRate = ((campaign.opened / total) * 100).toFixed(1);
  const clickRate = ((campaign.clicked / total) * 100).toFixed(1);
  const bounceRate = ((campaign.bounced / total) * 100).toFixed(1);
  const unsubscribeRate = ((campaign.unsubscribed / total) * 100).toFixed(1);

  const learners = [
    {
      id: 1,
      name: "Sreekanth S",
      email: "coursedirector@neyvar.in",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered", "Opened", "Link Clicked"],
      avatar: "S",
      color: "bg-purple-500",
    },
    {
      id: 2,
      name: "Ratheesh Babu",
      email: "ratheeshbabu42@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered", "Opened"],
      avatar: "R",
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Sajid",
      email: "zajiddhan@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered"],
      avatar: "S",
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Angel Malar",
      email: "angelmalar97@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Bounced"],
      avatar: "A",
      color: "bg-pink-500",
    },
    {
      id: 5,
      name: "Sreelekshmi",
      email: "lekshmiraji033@gmail.com",
      deliveryTime: "04 Nov, 2025 07:27 PM",
      tags: ["Delivered", "Opened", "Link Clicked"],
      avatar: "S",
      color: "bg-orange-500",
    },
    {
      id: 6,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      deliveryTime: "04 Nov, 2025 07:28 PM",
      tags: ["Delivered", "Unsubscribed"],
      avatar: "P",
      color: "bg-indigo-500",
    },
    {
      id: 7,
      name: "Rahul Kumar",
      email: "rahul.kumar@example.com",
      deliveryTime: "04 Nov, 2025 07:28 PM",
      tags: ["Failed"],
      avatar: "R",
      color: "bg-red-500",
    },
    {
      id: 8,
      name: "Meera Nair",
      email: "meera.nair@example.com",
      deliveryTime: "04 Nov, 2025 07:29 PM",
      tags: ["Delivered", "Opened"],
      avatar: "M",
      color: "bg-teal-500",
    },
    {
      id: 9,
      name: "Arjun Reddy",
      email: "arjun.reddy@example.com",
      deliveryTime: "04 Nov, 2025 07:29 PM",
      tags: ["Bounced"],
      avatar: "A",
      color: "bg-cyan-500",
    },
    {
      id: 10,
      name: "Divya Menon",
      email: "divya.menon@example.com",
      deliveryTime: "04 Nov, 2025 07:30 PM",
      tags: ["Delivered", "Opened", "Link Clicked"],
      avatar: "D",
      color: "bg-violet-500",
    },
  ];

  const filteredLearners = learners.filter((learner) => {
    const matchesSearch = learner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => learner.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

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
            {/* Campaign Metrics */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Campaign Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Sent */}
                <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
                  <div className="flex items-start justify-between mb-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">{sentRate}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{campaign.sent}</p>
                    <p className="text-sm text-blue-900/70 dark:text-blue-100/70">Sent</p>
                  </div>
                </Card>

                {/* Opened */}
                <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900">
                  <div className="flex items-start justify-between mb-4">
                    <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-900 dark:text-green-100">{openRate}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">{campaign.opened}</p>
                    <p className="text-sm text-green-900/70 dark:text-green-100/70">Opened</p>
                  </div>
                </Card>

                {/* Clicked */}
                <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
                  <div className="flex items-start justify-between mb-4">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">{clickRate}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">{campaign.clicked}</p>
                    <p className="text-sm text-purple-900/70 dark:text-purple-100/70">Clicked</p>
                  </div>
                </Card>

                {/* Bounced */}
                <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900">
                  <div className="flex items-start justify-between mb-4">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-900 dark:text-red-100">{bounceRate}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-red-600 dark:text-red-400">{campaign.bounced}</p>
                    <p className="text-sm text-red-900/70 dark:text-red-100/70">Bounced</p>
                  </div>
                </Card>

                {/* Unsubscribed */}
                <Card className="p-6 bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900">
                  <div className="flex items-start justify-between mb-4">
                    <UserMinus className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-100">{unsubscribeRate}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{campaign.unsubscribed}</p>
                    <p className="text-sm text-orange-900/70 dark:text-orange-100/70">Unsubscribed</p>
                  </div>
                </Card>
              </div>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-background">
                      Tags
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 bg-background z-50" align="start">
                    <div className="space-y-3">
                      {availableTags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <label
                            htmlFor={tag}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedTags.length} selected
                  </Badge>
                )}
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
                            {learner.tags.map((tag, index) => {
                              const tagStyles = {
                                "Delivered": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 hover:bg-green-200",
                                "Bounced": "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 hover:bg-red-200",
                                "Failed": "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 hover:bg-red-200",
                                "Opened": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-200",
                                "Link Clicked": "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 hover:bg-purple-200",
                                "Unsubscribed": "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 hover:bg-orange-200",
                              };
                              
                              return (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className={tagStyles[tag as keyof typeof tagStyles] || ""}
                                >
                                  {tag}
                                </Badge>
                              );
                            })}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Email Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Email Details</h2>
                <div className="space-y-4">
                  {/* From name */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium">From name</label>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Wayvida</p>
                    </div>
                  </div>

                  {/* From */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium">From</label>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">grow@wayvida.com</p>
                    </div>
                  </div>

                  {/* Reply */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium">Reply</label>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">grow@wayvida.com</p>
                    </div>
                  </div>

                  {/* To */}
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <label className="text-sm font-medium">To</label>
                    <div className="col-span-2">
                      <Badge variant="secondary" className="mb-2">
                        Enrolled in courses: Any of the courses
                      </Badge>
                      <Button variant="link" className="p-0 h-auto text-sm text-primary">
                        Show 8 recipients
                      </Button>
                    </div>
                  </div>

                  {/* Use variables */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-3">
                      <Button variant="ghost" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Use variables to personalize your emails
                      </Button>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="grid grid-cols-3 gap-4 items-center pt-4 border-t">
                    <label className="text-sm font-medium">Subject</label>
                    <div className="col-span-2">
                      <p className="text-sm">hello</p>
                    </div>
                  </div>

                  {/* Email content */}
                  <div className="pt-4 border-t">
                    <div className="bg-muted/30 rounded-lg p-4 min-h-[200px]">
                      <p className="text-sm text-primary">Welcome to our course</p>
                    </div>
                  </div>

                  {/* Send immediately */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Send immediately</p>
                  </div>
                </div>
              </Card>

              {/* Right side - Mobile Preview */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Mobile Preview</h3>
                </div>
                
                <div className="flex justify-center items-start">
                  <div className="relative w-[280px] h-[540px] bg-background rounded-[2.5rem] border-8 border-foreground/20 shadow-2xl overflow-hidden">
                    {/* Phone screen */}
                    <div className="absolute inset-0 bg-background">
                      {/* Status bar */}
                      <div className="flex justify-between items-center px-6 py-2 text-xs">
                        <span>11:00</span>
                        <div className="flex items-center gap-1">
                          <BarChart2 className="h-3 w-3" />
                          <Smartphone className="h-3 w-3" />
                        </div>
                      </div>
                      
                      {/* Email header */}
                      <div className="px-4 py-3 border-b">
                        <div className="flex items-center justify-between mb-2">
                          <ArrowLeft className="h-5 w-5" />
                          <div className="flex gap-2">
                            <Mail className="h-5 w-5" />
                            <Info className="h-5 w-5" />
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm">hello</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">S</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">Sender</p>
                            <p className="text-xs text-muted-foreground truncate">me</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">3 days ago</span>
                        </div>
                      </div>
                      
                      {/* Email content */}
                      <div className="p-4">
                        <p className="text-sm">Welcome to our course</p>
                      </div>

                      {/* Bottom icons */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center py-4 border-t bg-background">
                        <Mail className="h-5 w-5" />
                        <Smartphone className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Send test button */}
                <div className="flex justify-end mt-6">
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Send test
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CampaignDetails;
