import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { isOnboarded } = useApp();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex w-full max-w-sm flex-col items-center text-center animate-fade-in">
        {/* Brand */}
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-foreground">READ.</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Your reading journey starts here
        </p>

        {/* Audio placeholder */}
        <button
          className="mt-3 flex items-center gap-2 text-sm text-accent hover:underline"
          aria-label="Listen to welcome message"
        >
          <Volume2 className="h-5 w-5" />
          <span>Listen</span>
        </button>

        {/* Actions */}
        <div className="mt-10 flex w-full flex-col gap-3">
          <Button
            size="lg"
            className="w-full text-lg min-h-[56px] gap-2"
            onClick={() => navigate("/onboarding")}
          >
            <ArrowRight className="h-5 w-5" />
            Get Started
          </Button>

          {isOnboarded && (
            <Button
              variant="secondary"
              size="lg"
              className="w-full text-lg min-h-[56px] gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <BookOpen className="h-5 w-5" />
              Continue Learning
            </Button>
          )}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Your progress stays private on this device.
        </p>
      </div>
    </div>
  );
}
