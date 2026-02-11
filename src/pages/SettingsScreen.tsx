import { useState } from "react";
import { User, Type, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

export default function SettingsScreen() {
  const { state, setProfile, changeTextSize, resetAllProgress } = useApp();
  const [name, setName] = useState(state.profile?.name || "");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveName = () => {
    if (state.profile) {
      setProfile({ ...state.profile, name: name.trim() || "Learner" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const sizes = [
    { id: "small" as const, label: "Small" },
    { id: "medium" as const, label: "Medium" },
    { id: "large" as const, label: "Large" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-md px-5 pt-8">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>

        {/* Name */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <User className="h-5 w-5 text-accent" />
              <h2 className="font-bold text-lg">Display Name</h2>
            </div>
            <div className="flex gap-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} className="text-lg min-h-[48px]" />
              <Button onClick={handleSaveName} className="min-h-[48px]">
                {saved ? "Saved!" : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Text size */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Type className="h-5 w-5 text-accent" />
              <h2 className="font-bold text-lg">Text Size</h2>
            </div>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => changeTextSize(s.id)}
                  className={cn(
                    "flex-1 rounded-lg border-2 py-3 font-medium transition-colors min-h-[48px]",
                    state.textSize === s.id ? "border-accent bg-accent/10" : "border-border"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reset */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <RotateCcw className="h-5 w-5 text-destructive" />
              <h2 className="font-bold text-lg">Reset Progress</h2>
            </div>
            {!showResetConfirm ? (
              <Button variant="destructive" className="w-full min-h-[48px]" onClick={() => setShowResetConfirm(true)}>
                Reset All Progress
              </Button>
            ) : (
              <div>
                <p className="mb-3 text-muted-foreground">Are you sure? This will erase all your progress. This cannot be undone.</p>
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 min-h-[48px]" onClick={() => setShowResetConfirm(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" className="flex-1 min-h-[48px]" onClick={() => { resetAllProgress(); setShowResetConfirm(false); }}>
                    Yes, Reset
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Info className="h-5 w-5 text-accent" />
              <h2 className="font-bold text-lg">About READ.</h2>
            </div>
            <p className="text-muted-foreground">
              READ. is designed for adults building their reading skills. Your progress is stored privately on this device. 
              Learn at your own pace — there's no rush and no judgment.
            </p>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
