import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Volume2, BookOpen, FileText, ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { LessonCategory } from "@/lib/types";
import { categoryInfo } from "@/lib/lessonData";
import { updateUsername, DEFAULT_USER_ID } from "@/lib/api";

const onboardingCopy: Record<LessonCategory, { label: string; desc: string }> = {
  phonics: { label: "Letters & Sounds", desc: "Start with the basics" },
  "sight-words": { label: "Everyday Words", desc: "Learn words you see often" },
  sentences: { label: "Reading Practice", desc: "Read short passages" },
  "real-world": { label: "Real-World Documents", desc: "Forms, labels, and more" },
};

const iconByCategory: Record<LessonCategory, typeof Volume2> = {
  phonics: Volume2,
  "sight-words": BookOpen,
  sentences: FileText,
  "real-world": ClipboardList,
};

const levels = categoryInfo.map((cat) => ({
  id: cat.id as LessonCategory,
  ...onboardingCopy[cat.id as LessonCategory],
  icon: iconByCategory[cat.id as LessonCategory],
}));

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<LessonCategory>("phonics");
  const navigate = useNavigate();
  const { setProfile } = useApp();

  const handleFinish = async () => {
    const normalizedUsername = username.trim() || "learner";
    setProfile({
      username: normalizedUsername,
      startingLevel: selectedLevel,
      createdAt: new Date().toISOString(),
    });
    try {
      await updateUsername(DEFAULT_USER_ID, normalizedUsername);
    } catch {
      // Continue even if backend fails; localStorage still has the username.
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg animate-fade-in">
        {/* Progress dots */}
        <div className="mb-8 flex justify-center gap-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${i === step ? "bg-accent" : "bg-muted"}`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <User className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Pick a username</h2>
            <p className="mt-2 text-muted-foreground">This is how your account is identified.</p>

            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mt-6 text-lg text-center min-h-[56px]"
              autoFocus
            />

            <Button
              size="lg"
              className="mt-6 w-full text-lg min-h-[56px] gap-2"
              onClick={() => setStep(1)}
            >
              Next
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl font-bold">Where would you like to start?</h2>
            <p className="mt-2 text-muted-foreground">You can change this anytime. There is no wrong answer.</p>

            <div className="mt-6 flex w-full flex-col gap-3">
              {levels.map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedLevel(id)}
                  className={`flex items-center gap-3 sm:gap-4 rounded-lg border-2 p-3 sm:p-4 text-left transition-colors min-h-[64px] ${
                    selectedLevel === id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/40"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{label}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-6 w-full text-lg min-h-[56px] gap-2"
              onClick={handleFinish}
            >
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
