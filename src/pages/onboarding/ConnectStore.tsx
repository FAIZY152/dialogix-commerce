import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package } from "lucide-react";

const ConnectStore = () => {
  const navigate = useNavigate();

  const handleConnect = (platform: string) => {
    console.log("Connecting to:", platform);
    navigate("/onboarding/importing");
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={3}>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Connect Your Store
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your e-commerce platform to get started
          </p>
        </div>

        <div className="space-y-4">
          {/* Shopify Card */}
          <button
            onClick={() => handleConnect("shopify")}
            className="w-full group"
          >
            <div className="glass-effect rounded-2xl p-8 hover-scale hover-glow transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-[#95BF47] flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold mb-2">Shopify</h3>
                  <p className="text-muted-foreground">
                    Most popular choice for online stores
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-primary">
                    <span className="font-medium">Connect now</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* WooCommerce Card */}
          <button
            onClick={() => handleConnect("woocommerce")}
            className="w-full group"
          >
            <div className="glass-effect rounded-2xl p-8 hover-scale hover-glow transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-[#96588A] flex items-center justify-center flex-shrink-0">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold mb-2">WooCommerce</h3>
                  <p className="text-muted-foreground">
                    Perfect for WordPress stores
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-primary">
                    <span className="font-medium">Connect now</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't see your platform?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ConnectStore;
