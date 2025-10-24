import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Connected to your store", duration: 1000 },
  { id: 2, label: "Importing products", duration: 2000 },
  { id: 3, label: "Generating AI embeddings", duration: 2500 },
  { id: 4, label: "Loading store policies", duration: 1500 },
];

const Importing = () => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      // All done, show confetti and navigate
      setTimeout(() => {
        navigate("/onboarding/customize");
      }, 1000);
      return;
    }

    const currentStep = steps[currentStepIndex];
    const stepDuration = currentStep.duration;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min((elapsed / stepDuration) * 100, 100);
      
      // Calculate overall progress
      const overallProgress = ((currentStepIndex / steps.length) * 100) + (stepProgress / steps.length);
      setProgress(overallProgress);

      if (elapsed >= stepDuration) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentStepIndex, navigate]);

  return (
    <OnboardingLayout currentStep={2} totalSteps={3}>
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] mb-6 shadow-[0_0_60px_hsl(258_90%_66%/0.4)] animate-glow-pulse">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Setting Up Your AI Assistant
          </h1>
          <p className="text-lg text-muted-foreground">
            This will only take a moment...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center mt-3 text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Status Steps */}
        <div className="glass-effect rounded-2xl p-8 space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isCurrent && "bg-primary/5"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    isCompleted && "bg-[hsl(160,84%,39%)] shadow-[0_0_20px_hsl(160_84%_39%/0.3)]",
                    isCurrent && "bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] shadow-[0_0_20px_hsl(258_90%_66%/0.4)]",
                    isPending && "bg-muted"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  )}
                </div>
                <p
                  className={cn(
                    "font-medium transition-colors",
                    isCompleted && "text-[hsl(160,84%,39%)]",
                    isCurrent && "text-foreground",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {step.label}
                  {isCurrent && <span className="ml-2">...</span>}
                  {isCompleted && (
                    <span className="ml-2 text-sm">✓</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Importing;
