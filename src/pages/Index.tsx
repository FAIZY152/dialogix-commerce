import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(258,90%,66%,0.1)] via-background to-[hsl(213,94%,68%,0.1)]" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(258,90%,66%,0.15)] rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(213,94%,68%,0.15)] rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] flex items-center justify-center shadow-[0_0_20px_hsl(258_90%_66%/0.3)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">AI Support</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8">
              <span className="w-2 h-2 rounded-full bg-[hsl(160,84%,39%)] animate-glow-pulse"></span>
              <span className="text-sm font-medium">AI-Powered Customer Support</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="gradient-text"> E-commerce Support</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Automate customer service, boost sales, and delight your customers with AI that understands your store inside and out.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-16">
              <Link to="/signup">
                <Button variant="gradient" size="xl">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="xl">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {[
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Instant Responses",
                  desc: "Answer customer queries in under 2 seconds with AI trained on your products",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Always Accurate",
                  desc: "Powered by your store data, policies, and product information",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Boost Sales",
                  desc: "Convert more visitors into customers with intelligent recommendations",
                },
              ].map((feature, i) => (
                <div key={i} className="glass-effect rounded-2xl p-6 hover-scale">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] flex items-center justify-center mb-4 shadow-[0_0_20px_hsl(258_90%_66%/0.3)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
