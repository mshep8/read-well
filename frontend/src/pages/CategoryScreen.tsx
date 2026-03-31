import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BookOpen, Volume2, FileText, ClipboardList, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/BottomNav";
import {
  categoryInfo,
  getLessonsByCategoryAndContext,
  PRACTICE_CONTEXTS,
  type PracticeContext,
} from "@/lib/lessonData";
import { Check } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "volume-2": Volume2,
  "book-open": BookOpen,
  "file-text": FileText,
  "clipboard-list": ClipboardList,
};

export default function CategoryScreen() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { state } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contextParam = searchParams.get("context");
  const selectedContext = (PRACTICE_CONTEXTS.includes(contextParam as PracticeContext)
    ? contextParam
    : PRACTICE_CONTEXTS[0]) as PracticeContext;

  const cat = categoryInfo.find((c) => c.id === categoryId);
  const lessons = getLessonsByCategoryAndContext(categoryId || "", selectedContext);

  if (!cat) return <div className="p-8 text-center">Category not found</div>;

  const Icon = iconMap[cat.icon] || BookOpen;

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{cat.title}</h1>
            <p className="text-sm text-muted-foreground">{cat.description}</p>
          </div>
        </div>

        {/* Lesson list */}
        <div className="space-y-3">
          {lessons.map((lesson, i) => {
            const done = state.progress[lesson.id]?.completed;
            return (
              <Card key={lesson.id} className={done ? "border-success/30 bg-success/5" : ""}>
                <CardContent className="p-0">
                  <button
                    onClick={() => navigate(`/lesson/${lesson.id}?context=${encodeURIComponent(selectedContext)}`)}
                    className="flex w-full items-center gap-4 p-4 text-left min-h-[64px]"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {done ? <Check className="h-5 w-5" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium uppercase tracking-wide text-accent">{lesson.topic}</div>
                      <div className="font-semibold">{lesson.title}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {lessons.length === 0 && (
          <Card className="mt-3">
            <CardContent className="p-4 text-sm text-muted-foreground">
              No {cat.title.toLowerCase()} lessons are available yet for {selectedContext}.
            </CardContent>
          </Card>
        )}

        <Button variant="secondary" className="mt-6 w-full min-h-[48px]" onClick={() => navigate("/lessons")}>
          Back to Lessons
        </Button>
      </div>
      <BottomNav />
    </div>
  );
}
