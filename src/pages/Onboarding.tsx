import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Volume2, BookOpen, FileText, ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { LessonCategory } from "@/lib/types";
import { updateUserName, DEFAULT_USER_ID } from "@/lib/api";

const levels = [
  { id: "phonics" as LessonCategory, label: "Letters & Sounds", desc: "Start with the basics", icon: Volume2 },
  { id: "sight-words" as LessonCategory, label: "Everyday Words", desc: "Learn words you see often", icon: BookOpen },
  { id: "sentences" as LessonCategory, label: "Reading Practice", desc: "Read short passages", icon: FileText },
  { id: "real-world" as LessonCategory, label: "Real-World Documents", desc: "Forms, labels, and more", icon: ClipboardList },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<LessonCategory>("phonics");
  const navigate = useNavigate();
  const { setProfile } = useApp();

  const handleFinish = async () => {
    const displayName = name.trim() || "Learner";
    setProfile({
      name: displayName,
      startingLevel: selectedLevel,
      createdAt: new Date().toISOString(),
    });
    try {
      await updateUserName(DEFAULT_USER_ID, displayName);
    } catch {
      // Continue even if backend fails; localStorage still has the name
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-in">
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
            <h2 className="text-2xl font-bold">What should we call you?</h2>
            <p className="mt-2 text-muted-foreground">First name is fine — this is just for you.</p>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
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
            <h2 className="text-2xl font-bold">Where would you like to start?</h2>
            <p className="mt-2 text-muted-foreground">You can change this anytime. There's no wrong answer.</p>

            <div className="mt-6 flex w-full flex-col gap-3">
              {levels.map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedLevel(id)}
                  className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-colors min-h-[64px] ${
                    selectedLevel === id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/40"
                  }`}
                >
                  <Icon className="h-6 w-6 shrink-0 text-accent" />
                  <div>
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
