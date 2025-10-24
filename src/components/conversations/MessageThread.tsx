import { CheckCircle2, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const messages = [
  {
    id: 1,
    type: "customer" as const,
    sender: "Emma Wilson",
    content: "I have dry skin, can you help me find the right moisturizer?",
    time: "2:45 PM",
  },
  {
    id: 2,
    type: "ai" as const,
    content: "Perfect! I'd love to help you find the ideal moisturizer for dry skin. Based on your needs, I recommend our Hydra-Boost Intensive Cream.",
    time: "2:45 PM",
    product: {
      name: "Hydra-Boost Intensive Cream",
      price: "$45.00",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop",
    },
  },
  {
    id: 3,
    type: "customer" as const,
    sender: "Emma Wilson",
    content: "That looks great! Does it work for sensitive skin too?",
    time: "2:47 PM",
  },
  {
    id: 4,
    type: "ai" as const,
    content: "Absolutely! It's dermatologist-tested and formulated specifically for sensitive skin. It's fragrance-free and hypoallergenic.",
    time: "2:47 PM",
  },
];

interface MessageThreadProps {
  conversationId: number | null;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  if (!conversationId) {
    return (
      <div className="h-full glass-effect rounded-2xl flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Select a conversation to view messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full glass-effect rounded-2xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary text-lg">E</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Emma Wilson</h3>
            <p className="text-sm text-muted-foreground">Started 5 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Active
          </Badge>
          <Button variant="outline" size="sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Resolve
          </Button>
          <Button variant="outline" size="sm">
            Handoff
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "ai" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "customer" && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-muted text-xs">E</AvatarFallback>
              </Avatar>
            )}

            <div className={`max-w-[70%] ${message.type === "ai" ? "text-right" : ""}`}>
              {message.type === "customer" && (
                <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>
              )}

              <div
                className={`rounded-2xl p-4 ${
                  message.type === "customer"
                    ? "bg-muted/50"
                    : "bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>

                {/* Product Card */}
                {message.product && (
                  <Card className="mt-4 p-4 bg-white/10 backdrop-blur-sm border-white/20">
                    <div className="flex gap-3">
                      <img
                        src={message.product.image}
                        alt={message.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-white mb-1 truncate">
                          {message.product.name}
                        </h4>
                        <p className="text-lg font-bold text-white mb-2">{message.product.price}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(message.product!.rating)
                                    ? "text-yellow-400"
                                    : "text-white/30"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-white/80">{message.product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="w-full mt-3">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View Product
                    </Button>
                  </Card>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
            </div>

            {message.type === "ai" && (
              <Avatar className="h-8 w-8 mt-1 bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)]">
                <AvatarFallback className="bg-transparent text-white text-xs">AI</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            Tell me more
          </Button>
          <Button variant="outline" size="sm">
            What about shipping?
          </Button>
          <Button variant="outline" size="sm">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
