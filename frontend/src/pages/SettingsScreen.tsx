import { useState, useEffect } from "react";
import { User, Type, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { getUser, updateUsername, DEFAULT_USER_ID } from "@/lib/api";

export default function SettingsScreen() {
  const { state, setProfile, changeTextSize, resetAllProgress } = useApp();
  const [username, setUsername] = useState(state.profile?.username || "");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser(DEFAULT_USER_ID)
      .then((user) => setUsername(user.Username || ""))
      .catch(() => setUsername(state.profile?.username || ""))
      .finally(() => setLoading(false));
  }, [state.profile?.username]);

  const handleSaveUsername = async () => {
    const newUsername = username.trim() || "learner";
    setError(null);
    try {
      await updateUsername(DEFAULT_USER_ID, newUsername);
      if (state.profile) {
        setProfile({ ...state.profile, username: newUsername });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const sizes = [
    { id: "small" as const, label: "Small" },
    { id: "medium" as const, label: "Medium" },
    { id: "large" as const, label: "Large" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        <h1 className="mb-6 text-2xl sm:text-3xl font-bold">Settings</h1>

        {/* Username */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <User className="h-5 w-5 text-accent" />
              <h2 className="font-bold text-lg">Username</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-lg min-h-[48px] flex-1 min-w-0"
                  disabled={loading}
                  placeholder={loading ? "Loading..." : "Your username"}
                />
                <Button onClick={handleSaveUsername} className="min-h-[48px] sm:shrink-0" disabled={loading}>
                  {saved ? "Saved!" : "Save"}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
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
            <div className="flex flex-col sm:flex-row gap-2">
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
                <div className="flex flex-col sm:flex-row gap-2">
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
