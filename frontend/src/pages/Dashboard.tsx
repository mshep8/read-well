import { useNavigate } from "react-router-dom";
import { ArrowRight, Flame, BookOpen, Volume2, FileText, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { categoryInfo, getLessonsByCategory } from "@/lib/lessonData";

const iconMap: Record<string, React.ElementType> = {
  "volume-2": Volume2,
  "book-open": BookOpen,
  "file-text": FileText,
  "clipboard-list": ClipboardList,
};

export default function Dashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const name = state.profile?.name || "Learner";

  // Find next incomplete lesson
  const getNextLesson = () => {
    for (const cat of categoryInfo) {
      const lessons = getLessonsByCategory(cat.id);
      const next = lessons.find((l) => !state.progress[l.id]?.completed);
      if (next) return { lesson: next, category: cat };
    }
    return null;
  };

  const next = getNextLesson();

  const getCategoryProgress = (catId: string) => {
    const lessons = getLessonsByCategory(catId);
    if (!lessons.length) return 0;
    const completed = lessons.filter((l) => state.progress[l.id]?.completed).length;
    return Math.round((completed / lessons.length) * 100);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Greeting */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Welcome back, {name}</h1>
          {state.streak > 0 && (
            <div className="mt-2 flex items-center gap-2 text-warm">
              <Flame className="h-5 w-5" />
              <span className="font-medium">{state.streak} day streak — keep it up!</span>
            </div>
          )}
        </div>

        {/* Current lesson card */}
        {next && (
          <Card className="mb-8 border-accent/30 bg-accent/5 animate-fade-in">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-accent uppercase tracking-wide">Continue where you left off</p>
              <h2 className="mt-2 text-xl font-bold">{next.lesson.title}</h2>
              <p className="mt-1 text-muted-foreground">{next.category.description}</p>
              <Button
                className="mt-4 w-full min-h-[52px] gap-2 text-base"
                onClick={() => navigate(`/lesson/${next.lesson.id}`)}
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Learning path */}
        <h2 className="mb-4 text-xl font-bold">Your Learning Path</h2>
        <div className="space-y-3">
          {categoryInfo.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const progress = getCategoryProgress(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => navigate("/lessons")}
                className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-accent/40 min-h-[72px]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{cat.title}</div>
                  <Progress value={progress} className="mt-2 h-2" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
