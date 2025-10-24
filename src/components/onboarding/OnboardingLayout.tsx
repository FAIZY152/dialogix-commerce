import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Connect Store" },
  { number: 2, label: "Import Data" },
  { number: 3, label: "Customize AI" },
];

export const OnboardingLayout = ({ children, currentStep, totalSteps }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Progress Bar */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                      currentStep > step.number
                        ? "bg-[hsl(160,84%,39%)] text-white shadow-[0_0_20px_hsl(160_84%_39%/0.4)]"
                        : currentStep === step.number
                        ? "bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] text-white shadow-[0_0_30px_hsl(258_90%_66%/0.4)]"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="hidden sm:block">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors",
                        currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-border relative overflow-hidden">
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(258,90%,66%)] to-[hsl(213,94%,68%)] transition-all duration-500",
                          currentStep > step.number ? "w-full" : "w-0"
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
};
