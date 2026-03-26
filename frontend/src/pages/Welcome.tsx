import { useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioButton } from "@/components/AudioButton";

export default function Welcome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showAuthMessage = searchParams.get("auth") === "required";

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
        {showAuthMessage && (
          <p className="mt-3 text-sm font-medium text-destructive">Please login or sign up</p>
        )}

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
            variant="secondary"
            size="lg"
            className="w-full text-lg min-h-[56px] gap-2"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full text-lg min-h-[56px]"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>

      </div>
    </div>
  );
}
