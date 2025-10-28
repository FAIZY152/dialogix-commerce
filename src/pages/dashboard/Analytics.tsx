import { useState } from "react";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data
const keyMetrics = [
  {
    label: "Total Conversations",
    value: "1,247",
    change: "+23%",
    trend: "up",
    sparklineData: [45, 52, 48, 60, 58, 65, 70],
  },
  {
    label: "Conversion Rate",
    value: "12.4%",
    change: "+2.1%",
    trend: "up",
    sparklineData: [10, 10.5, 11, 11.5, 11.8, 12, 12.4],
  },
  {
    label: "Revenue from AI",
    value: "$12,450",
    change: "+18%",
    trend: "up",
    sparklineData: [8000, 8500, 9200, 10000, 10800, 11500, 12450],
  },
  {
    label: "Avg Messages/Conv",
    value: "4.2",
    change: "-0.3",
    trend: "down",
    sparklineData: [4.8, 4.7, 4.5, 4.4, 4.3, 4.2, 4.2],
  },
  {
    label: "Response Time",
    value: "1.2s",
    change: "-0.3s",
    trend: "up",
    sparklineData: [1.8, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2],
  },
  {
    label: "Customer Satisfaction",
    value: "4.8/5.0",
    change: "+0.2",
    trend: "up",
    sparklineData: [4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8],
  },
];

const funnelData = [
  { stage: "Website Visitors", value: 10000, percentage: 100, next: 40 },
  { stage: "Started Chat", value: 4000, percentage: 40, next: 30 },
  { stage: "Viewed Product", value: 1200, percentage: 30, next: 50 },
  { stage: "Added to Cart", value: 600, percentage: 50, next: 70 },
  { stage: "Completed Purchase", value: 420, percentage: 70, next: 0 },
];

const topProducts = [
  { name: "Hydra-Boost Cream", count: 234 },
  { name: "Vitamin C Serum", count: 189 },
  { name: "Retinol Night Cream", count: 167 },
  { name: "Gentle Cleanser", count: 145 },
  { name: "SPF 50 Sunscreen", count: 128 },
];

const popularQuestions = [
  { question: "What's the shipping time?", count: 234 },
  { question: "What's your return policy?", count: 189 },
  { question: "Do you ship internationally?", count: 167 },
  { question: "Is this suitable for sensitive skin?", count: 145 },
  { question: "What payment methods do you accept?", count: 128 },
];

const heatmapData = [
  { day: "Mon", hours: [2, 3, 5, 8, 12, 18, 25, 32, 28, 22, 18, 15, 20, 25, 30, 28, 24, 20, 15, 10, 6, 4, 3, 2] },
  { day: "Tue", hours: [1, 2, 4, 7, 10, 15, 22, 30, 26, 20, 16, 18, 22, 28, 32, 30, 26, 22, 16, 12, 8, 5, 3, 2] },
  { day: "Wed", hours: [2, 3, 5, 9, 13, 19, 26, 34, 30, 24, 20, 19, 24, 30, 35, 33, 28, 24, 18, 13, 9, 6, 4, 2] },
  { day: "Thu", hours: [1, 3, 6, 10, 14, 20, 28, 36, 32, 26, 22, 20, 26, 32, 38, 35, 30, 25, 19, 14, 10, 7, 4, 3] },
  { day: "Fri", hours: [2, 4, 7, 12, 16, 22, 30, 38, 35, 28, 24, 22, 28, 34, 40, 38, 32, 26, 20, 15, 11, 8, 5, 3] },
  { day: "Sat", hours: [3, 5, 8, 11, 14, 18, 24, 28, 26, 22, 20, 18, 22, 26, 30, 28, 24, 20, 16, 12, 9, 7, 5, 4] },
  { day: "Sun", hours: [2, 4, 6, 9, 12, 16, 20, 24, 22, 18, 16, 15, 18, 22, 26, 24, 20, 18, 14, 10, 8, 6, 4, 3] },
];

const Analytics = () => {
  const [dateRange, setDateRange] = useState("30D");

  const getIntensityColor = (value: number) => {
    if (value < 10) return "bg-primary/20";
    if (value < 20) return "bg-primary/40";
    if (value < 30) return "bg-primary/60";
    return "bg-primary/80";
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Analytics</h1>
                <p className="text-muted-foreground">Track performance and customer insights</p>
              </div>

              {/* Date Range Picker */}
              <div className="flex gap-2">
                {["Today", "7D", "30D", "90D"].map((range) => (
                  <Button
                    key={range}
                    variant={dateRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateRange(range)}
                  >
                    {range}
                  </Button>
                ))}
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Custom
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {keyMetrics.map((metric) => (
              <Card key={metric.label} className="glass-effect p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === "up" ? "text-success" : "text-muted-foreground"
                  }`}>
                    {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {metric.change}
                  </div>
                </div>

                {/* Sparkline */}
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.sparklineData.map((v, i) => ({ value: v, index: i }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card className="glass-effect p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-6">Conversion Funnel</h3>
              <div className="space-y-4">
                {funnelData.map((stage, index) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">{stage.value.toLocaleString()}</span>
                    </div>
                    <div className="relative">
                      <div className="h-12 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 flex items-center px-4 text-white font-medium transition-all"
                          style={{ width: `${stage.percentage}%` }}
                        >
                          {stage.percentage}%
                        </div>
                      </div>
                      {stage.next > 0 && (
                        <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                          <div className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
                            ↓ {stage.next}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Products Recommended */}
            <Card className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-6">Top Products Recommended</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium truncate">{product.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">{product.count}</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all"
                        style={{ width: `${(product.count / 234) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Questions */}
            <Card className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-6">Popular Questions</h3>
              <div className="space-y-4">
                {popularQuestions.map((item, index) => (
                  <div key={item.question} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{item.question}</p>
                      <p className="text-xs text-muted-foreground">Asked {item.count} times</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Hourly Heatmap */}
            <Card className="glass-effect p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-6">Activity Heatmap</h3>
              <div className="overflow-x-auto">
                <div className="inline-flex flex-col gap-1 min-w-max">
                  {/* Hour labels */}
                  <div className="flex gap-1 ml-12">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="w-8 text-xs text-muted-foreground text-center">
                        {i}
                      </div>
                    ))}
                  </div>

                  {/* Heatmap rows */}
                  {heatmapData.map((row) => (
                    <div key={row.day} className="flex items-center gap-1">
                      <div className="w-10 text-sm font-medium">{row.day}</div>
                      {row.hours.map((value, hourIndex) => (
                        <div
                          key={hourIndex}
                          className={`w-8 h-8 rounded ${getIntensityColor(value)} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                          title={`${row.day} ${hourIndex}:00 - ${value} conversations`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded bg-primary/20" />
                    <div className="w-4 h-4 rounded bg-primary/40" />
                    <div className="w-4 h-4 rounded bg-primary/60" />
                    <div className="w-4 h-4 rounded bg-primary/80" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
