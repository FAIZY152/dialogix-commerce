import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ConversationSidebar } from "@/components/conversations/ConversationSidebar";
import { ConversationList } from "@/components/conversations/ConversationList";
import { MessageThread } from "@/components/conversations/MessageThread";

const Conversations = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-screen flex flex-col">
          {/* Header */}
          <div className="p-8 pb-4">
            <h1 className="text-4xl font-bold mb-2">Conversations</h1>
            <p className="text-muted-foreground">Monitor and manage AI-powered customer interactions</p>
          </div>

          {/* 3-Column Layout */}
          <div className="flex-1 px-8 pb-8 grid grid-cols-12 gap-6 overflow-hidden">
            {/* Left: Filter Sidebar */}
            <div className="col-span-2 overflow-y-auto">
              <ConversationSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            {/* Middle: Conversation List */}
            <div className="col-span-4 overflow-hidden">
              <ConversationList selectedId={selectedConversation} onSelect={setSelectedConversation} />
            </div>

            {/* Right: Message Thread */}
            <div className="col-span-6 overflow-hidden">
              <MessageThread conversationId={selectedConversation} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Conversations;
