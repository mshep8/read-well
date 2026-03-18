import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { AudioButton } from "@/components/AudioButton";

export default function Welcome() {
  const navigate = useNavigate();
  const { isOnboarded } = useApp();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="flex w-full max-w-sm sm:max-w-md md:max-w-lg flex-col items-center text-center animate-fade-in">
        {/* Brand */}
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">READ.</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Your reading journey starts here
        </p>

        {/* Audio */}
        <AudioButton
          text="Your reading journey starts here. Tap Get Started to begin."
          label="Listen"
          size="default"
          className="mt-3 text-sm text-accent"
        />

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
