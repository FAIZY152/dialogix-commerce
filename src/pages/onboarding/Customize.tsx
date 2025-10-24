import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageCircle, Sparkles } from "lucide-react";

const Customize = () => {
  const navigate = useNavigate();
  const [brandVoice, setBrandVoice] = useState("friendly");
  const [primaryColor, setPrimaryColor] = useState("#7C3AED");
  const [greeting, setGreeting] = useState("Hi! How can I help you today?");

  const handleFinish = () => {
    console.log("Onboarding complete:", { brandVoice, primaryColor, greeting });
    navigate("/dashboard");
  };

  return (
    <OnboardingLayout currentStep={3} totalSteps={3}>
      <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
        {/* Left: Form */}
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Customize Your AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Make it sound like your brand
            </p>
          </div>

          <div className="space-y-8">
            {/* Brand Voice */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Brand Voice</Label>
              <RadioGroup value={brandVoice} onValueChange={setBrandVoice}>
                <div className="space-y-3">
                  {[
                    { value: "friendly", label: "Friendly", desc: "Warm and approachable (Recommended)" },
                    { value: "professional", label: "Professional", desc: "Formal and business-like" },
                    { value: "casual", label: "Casual", desc: "Laid-back and conversational" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-start gap-3 p-4 rounded-xl border-2 border-border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Primary Color */}
            <div className="space-y-3">
              <Label htmlFor="color" className="text-base font-semibold">
                Widget Color
              </Label>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="color"
                    id="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-14 h-14 rounded-lg cursor-pointer border-2 border-border"
                  />
                </div>
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 h-14 font-mono"
                />
              </div>
            </div>

            {/* Greeting Message */}
            <div className="space-y-3">
              <Label htmlFor="greeting" className="text-base font-semibold">
                Greeting Message
              </Label>
              <Textarea
                id="greeting"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="resize-none h-24"
                placeholder="Enter your greeting message..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button
              variant="gradient"
              size="lg"
              onClick={handleFinish}
              className="flex-1"
            >
              Save & Continue
            </Button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Label className="text-base font-semibold mb-4 block">Live Preview</Label>
            
            {/* Chat Widget Preview */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3 min-h-[300px]">
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                      <p className="text-sm">{greeting}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Just now</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled
                />
                <Button
                  size="icon"
                  style={{ backgroundColor: primaryColor }}
                  disabled
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Customize;
