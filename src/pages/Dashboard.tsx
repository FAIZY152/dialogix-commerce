import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign, Zap, Star, Plus, TrendingUp } from "lucide-react";

const Dashboard = () => {
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

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Conversations Chart */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Conversation Volume</h3>
                  <p className="text-sm text-muted-foreground">Last 7 days</p>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              {/* Simple Bar Chart Placeholder */}
              <div className="space-y-4">
                {[65, 85, 72, 90, 78, 95, 88].map((height, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-8">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                    <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] rounded-lg transition-all duration-500"
                        style={{ width: `${height}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {Math.round(height * 1.5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
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
