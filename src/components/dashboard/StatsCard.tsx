import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: ReactNode;
  gradient?: string;
}

export const StatsCard = ({ title, value, change, trend, icon, gradient }: StatsCardProps) => {
  return (
    <div className="glass-effect rounded-2xl p-6 hover-scale transition-all duration-300 relative overflow-hidden">
      {/* Gradient Background */}
      {gradient && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: gradient,
          }}
        />
      )}

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-muted/50">
            {icon}
          </div>
          {change && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg",
                trend === "up"
                  ? "text-[hsl(160,84%,39%)] bg-[hsl(160,84%,39%)]/10"
                  : "text-destructive bg-destructive/10"
              )}
            >
              {trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {change}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
      </div>
    </div>
  );
};
