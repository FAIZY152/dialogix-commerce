import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: 1,
    customer: "Emma Wilson",
    lastMessage: "I have dry skin, can you help?",
    time: "2m ago",
    unread: true,
    status: "Active",
  },
  {
    id: 2,
    customer: "Michael Chen",
    lastMessage: "Thanks! I'll take the blue one.",
    time: "15m ago",
    unread: false,
    status: "Resolved",
  },
  {
    id: 3,
    customer: "Sarah Johnson",
    lastMessage: "What's your return policy?",
    time: "1h ago",
    unread: true,
    status: "Needs Attention",
  },
  {
    id: 4,
    customer: "Anonymous",
    lastMessage: "Do you ship internationally?",
    time: "2h ago",
    unread: false,
    status: "Active",
  },
  {
    id: 5,
    customer: "David Park",
    lastMessage: "Perfect, ordered!",
    time: "3h ago",
    unread: false,
    status: "Resolved",
  },
];

interface ConversationListProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const ConversationList = ({ selectedId, onSelect }: ConversationListProps) => {
  return (
    <div className="h-full glass-effect rounded-2xl flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-muted/30 border-muted"
          />
        </div>
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full p-4 border-b border-border/50 text-left transition-colors hover:bg-muted/30",
              selectedId === conv.id && "bg-muted/50"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {conv.customer === "Anonymous" ? "?" : conv.customer.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conv.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-background" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium truncate">{conv.customer}</span>
                  <span className="text-xs text-muted-foreground ml-2">{conv.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
