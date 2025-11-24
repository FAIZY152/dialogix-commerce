import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign, Zap, Star, Plus, TrendingUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const Dashboard = () => {
  const [chartPeriod, setChartPeriod] = useState<"7D" | "30D" | "90D">("7D");
// Fix Rabitmq issues
  const stats = [
    {
      title: "Total Conversations",
      value: "1,247",
      change: "+23% vs last month",
      trend: "up" as const,
      icon: <MessageSquare className="w-5 h-5 text-primary" />,
      gradient: "linear-gradient(135deg, hsl(258,90%,66%), hsl(213,94%,68%))",
    },
    {
      title: "Sales from AI",
      value: "$12,450",
      change: "+18% vs last month",
      trend: "up" as const,
      icon: <DollarSign className="w-5 h-5 text-[hsl(160,84%,39%)]" />,
      gradient: "linear-gradient(135deg, hsl(160,84%,39%), hsl(142,76%,36%))",
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "0.3s better",
      trend: "up" as const,
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      gradient: "linear-gradient(135deg, hsl(45,93%,58%), hsl(43,96%,56%))",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5.0",
      change: "+0.2 better",
      trend: "up" as const,
      icon: <Star className="w-5 h-5 text-orange-500" />,
      gradient: "linear-gradient(135deg, hsl(24,95%,53%), hsl(27,98%,54%))",
    },
  ];

  const chartData = {
    "7D": [
      { date: "Mon", conversations: 142 },
      { date: "Tue", conversations: 178 },
      { date: "Wed", conversations: 156 },
      { date: "Thu", conversations: 203 },
      { date: "Fri", conversations: 189 },
      { date: "Sat", conversations: 221 },
      { date: "Sun", conversations: 198 },
    ],
    "30D": Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      conversations: Math.floor(Math.random() * 100) + 150,
    })),
    "90D": Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      conversations: Math.floor(Math.random() * 100) + 150,
    })),
  };

  const recentConversations = [
    {
      id: 1,
      customer: "Emma Wilson",
      started: "5 min ago",
      messages: 8,
      status: "Active" as const,
      outcome: "In Progress" as const,
    },
    {
      id: 2,
      customer: "Anonymous",
      started: "12 min ago",
      messages: 5,
      status: "Resolved" as const,
      outcome: "Sale" as const,
    },
    {
      id: 3,
      customer: "Michael Chen",
      started: "1 hour ago",
      messages: 12,
      status: "Needs Attention" as const,
      outcome: "In Progress" as const,
    },
    {
      id: 4,
      customer: "Sarah Johnson",
      started: "2 hours ago",
      messages: 6,
      status: "Resolved" as const,
      outcome: "No Sale" as const,
    },
    {
      id: 5,
      customer: "Anonymous",
      started: "3 hours ago",
      messages: 4,
      status: "Resolved" as const,
      outcome: "Sale" as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Needs Attention":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "";
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "Sale":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "No Sale":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      case "In Progress":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your AI assistant.</p>
            </div>
            <Button variant="gradient" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Conversation Trends Chart */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Conversation Trends</h3>
                <p className="text-sm text-muted-foreground">
                  {chartPeriod === "7D" ? "Last 7 days" : chartPeriod === "30D" ? "Last 30 days" : "Last 90 days"}
                </p>
              </div>
              <div className="flex gap-2">
                {(["7D", "30D", "90D"] as const).map((period) => (
                  <Button
                    key={period}
                    variant={chartPeriod === period ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>

            <ChartContainer
              config={{
                conversations: {
                  label: "Conversations",
                  color: "hsl(258, 90%, 66%)",
                },
              }}
              className="h-[300px] w-full"
            >
              <AreaChart data={chartData[chartPeriod]}>
                <defs>
                  <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => (chartPeriod === "7D" ? value : value)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="conversations"
                  stroke="hsl(258, 90%, 66%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConversations)"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Recent Conversations Table */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Recent Conversations</h3>
                <p className="text-sm text-muted-foreground">Latest customer interactions</p>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentConversations.map((conv, index) => (
                  <TableRow key={conv.id} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {conv.customer === "Anonymous" ? "?" : conv.customer.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{conv.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{conv.started}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {conv.messages}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(conv.status)}>
                        {conv.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getOutcomeColor(conv.outcome)}>
                        {conv.outcome}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Top Products */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Top Products Discussed</h3>
                  <p className="text-sm text-muted-foreground">AI-assisted sales</p>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Premium Wireless Headphones", sales: 142, revenue: "$12,780" },
                  { name: "Smart Watch Series 5", sales: 98, revenue: "$8,920" },
                  { name: "Laptop Stand Pro", sales: 76, revenue: "$5,320" },
                  { name: "USB-C Hub", sales: 64, revenue: "$3,840" },
                ].map((product, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} conversations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[hsl(160,84%,39%)]">{product.revenue}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{12 + i * 3}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "View Conversations", icon: MessageSquare },
                { label: "Train AI Model", icon: Zap },
                { label: "Export Reports", icon: TrendingUp },
                { label: "Widget Settings", icon: Star },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={i}
                    variant="glass"
                    className="h-auto py-4 flex-col gap-2"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
