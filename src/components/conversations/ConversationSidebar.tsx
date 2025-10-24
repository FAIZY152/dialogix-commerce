import { MessageSquare, CheckCircle2, AlertCircle, Archive, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const filters = [
  { id: "all", label: "All Conversations", icon: MessageSquare, count: 247 },
  { id: "active", label: "Active", icon: MessageSquare, count: 18 },
  { id: "needs-review", label: "Needs Review", icon: AlertCircle, count: 5 },
  { id: "resolved", label: "Resolved", icon: CheckCircle2, count: 198 },
  { id: "sales", label: "Sales Generated", icon: DollarSign, count: 26 },
];

interface ConversationSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ConversationSidebar = ({ activeFilter, onFilterChange }: ConversationSidebarProps) => {
  return (
    <div className="h-full glass-effect rounded-2xl p-4 space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2">Filters</h3>
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onFilterChange(filter.id)}
          >
            <Icon className="w-4 h-4" />
            <span className="flex-1 text-left">{filter.label}</span>
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{filter.count}</span>
          </Button>
        );
      })}
    </div>
  );
};
