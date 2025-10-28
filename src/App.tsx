import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ConnectStore from "./pages/onboarding/ConnectStore";
import Importing from "./pages/onboarding/Importing";
import Customize from "./pages/onboarding/Customize";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/dashboard/Conversations";
import Analytics from "./pages/dashboard/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding/connect" element={<ConnectStore />} />
          <Route path="/onboarding/importing" element={<Importing />} />
          <Route path="/onboarding/customize" element={<Customize />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/conversations" element={<Conversations />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
