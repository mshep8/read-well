import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, BookOpen, FileText, ClipboardList, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { categoryInfo, getLessonsByCategoryAndContext, PRACTICE_CONTEXTS, type PracticeContext } from "@/lib/lessonData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentLevel, getRequiredLevelForCategory, isCategoryUnlocked } from "@/lib/progression";

const iconMap: Record<string, React.ElementType> = {
  "volume-2": Volume2,
  "book-open": BookOpen,
  "file-text": FileText,
  "clipboard-list": ClipboardList,
};

export default function LessonsHub() {
  const { state } = useApp();
  const navigate = useNavigate();
  const totalCompleted = Object.values(state.progress).filter((p) => p.completed).length;
  const currentLevel = getCurrentLevel(totalCompleted);
  const [selectedContext, setSelectedContext] = useState<PracticeContext>(() => {
    const persisted = localStorage.getItem("selectedPracticeContext");
    return (PRACTICE_CONTEXTS.includes(persisted as PracticeContext) ? persisted : PRACTICE_CONTEXTS[0]) as PracticeContext;
  });

  const handleContextChange = (value: string) => {
    const next = value as PracticeContext;
    setSelectedContext(next);
    localStorage.setItem("selectedPracticeContext", next);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        <h1 className="mb-6 text-2xl sm:text-3xl font-bold">Lessons</h1>
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-muted-foreground">Choose a practice category</p>
          <Select value={selectedContext} onValueChange={handleContextChange}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PRACTICE_CONTEXTS.map((context) => (
                <SelectItem key={context} value={context}>
                  {context}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {categoryInfo.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const lessons = getLessonsByCategoryAndContext(cat.id, selectedContext);
            const completed = lessons.filter((l) => state.progress[l.id]?.completed).length;
            const progress = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
            const unlocked = isCategoryUnlocked(cat.id, totalCompleted);
            const requiredLevel = getRequiredLevelForCategory(cat.id);

            return (
              <Card key={cat.id} className={`overflow-hidden ${!unlocked ? "opacity-80" : ""}`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => {
                      if (!unlocked) return;
                      navigate(`/category/${cat.id}?context=${encodeURIComponent(selectedContext)}`);
                    }}
                    className={`flex w-full items-start gap-3 sm:gap-4 p-4 sm:p-5 text-left transition-colors min-h-[88px] sm:min-h-[100px] ${
                      unlocked ? "hover:bg-accent/5" : "cursor-not-allowed"
                    }`}
                    aria-disabled={!unlocked}
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        {cat.title}
                        {!unlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                      {!unlocked && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Unlocks at Level {requiredLevel}. You are currently Level {currentLevel.level}.
                        </p>
                      )}
                      <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <Progress value={progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                          {completed} of {lessons.length}
                        </span>
                      </div>
                    </div>
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
