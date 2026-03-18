import { useNavigate } from "react-router-dom";
import { Volume2, BookOpen, FileText, ClipboardList } from "lucide-react";
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

export default function LessonsHub() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        <h1 className="mb-6 text-2xl sm:text-3xl font-bold">Lessons</h1>

        <div className="space-y-4">
          {categoryInfo.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const lessons = getLessonsByCategory(cat.id);
            const completed = lessons.filter((l) => state.progress[l.id]?.completed).length;
            const progress = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;

            return (
              <Card key={cat.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => navigate(`/category/${cat.id}`)}
                    className="flex w-full items-start gap-3 sm:gap-4 p-4 sm:p-5 text-left hover:bg-accent/5 transition-colors min-h-[88px] sm:min-h-[100px]"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold">{cat.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
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
