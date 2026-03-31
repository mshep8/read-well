import { BookOpen, Flame, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/contexts/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { categoryInfo, getLessonsByCategory, allLessons } from "@/lib/lessonData";
import { getCurrentLevel, getNextLevel } from "@/lib/progression";

export default function ProgressScreen() {
  const { state } = useApp();

  const totalCompleted = Object.values(state.progress).filter((p) => p.completed).length;
  const totalLessons = allLessons.length;
  const overallPct = totalLessons ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  const quizTotals = Object.values(state.progress).reduce(
    (acc, p) => {
      if (p.quizTotal != null && p.quizCorrect != null) {
        acc.correct += p.quizCorrect;
        acc.total += p.quizTotal;
      }
      return acc;
    },
    { correct: 0, total: 0 }
  );

  const getEncouragement = () => {
    const pct = totalLessons ? (totalCompleted / totalLessons) * 100 : 0;
    if (pct === 0) return "Every journey starts with a single step. You've got this.";
    if (pct < 25) return "You're making progress — keep going!";
    if (pct < 50) return "You're building real skills. Be proud of how far you've come.";
    if (pct < 75) return "More than halfway there — your dedication is paying off.";
    if (pct < 100) return "Almost there! You've accomplished so much.";
    return "You've completed all available lessons — incredible work!";
  };

  const currentLevel = getCurrentLevel(totalCompleted);
  const nextLevel = getNextLevel(totalCompleted);
  const lessonsIntoCurrentLevel = totalCompleted - currentLevel.requiredLessons;
  const lessonsNeededForNextLevel = nextLevel ? nextLevel.requiredLessons - currentLevel.requiredLessons : 0;
  const levelProgressPct =
    nextLevel && lessonsNeededForNextLevel > 0
      ? Math.min(100, Math.round((lessonsIntoCurrentLevel / lessonsNeededForNextLevel) * 100))
      : 100;

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        <h1 className="mb-6 text-2xl sm:text-3xl font-bold">Your Progress</h1>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <BookOpen className="h-6 w-6 text-accent mb-1" />
              <div className="text-2xl font-bold">{totalCompleted}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Flame className="h-6 w-6 text-warm mb-1" />
              <div className="text-2xl font-bold">{state.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Award className="h-6 w-6 text-accent mb-1" />
              <div className="text-2xl font-bold">{overallPct}%</div>
              <div className="text-xs text-muted-foreground">Overall</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-accent/25">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Current level</p>
                <p className="text-lg font-semibold">
                  Level {currentLevel.level}: {currentLevel.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-medium">{currentLevel.difficulty}</p>
              </div>
            </div>

            <Progress value={levelProgressPct} className="h-3 mb-2" />

            {nextLevel ? (
              <p className="text-sm text-muted-foreground">
                Complete{" "}
                <span className="font-semibold text-foreground">{Math.max(0, nextLevel.requiredLessons - totalCompleted)}</span>{" "}
                more lesson{nextLevel.requiredLessons - totalCompleted === 1 ? "" : "s"} to reach Level {nextLevel.level}:{" "}
                <span className="font-medium text-foreground">{nextLevel.title}</span>.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                You are at the highest level. Keep practicing to strengthen fluency.
              </p>
            )}
          </CardContent>
        </Card>

        {quizTotals.total > 0 && (
          <Card className="mb-6 border-accent/20 bg-accent/5">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Quiz performance (all lessons)</p>
              <p className="text-lg font-semibold">
                {quizTotals.correct} of {quizTotals.total} correct
              </p>
            </CardContent>
          </Card>
        )}

        {/* Category breakdown */}
        <h2 className="mb-1 text-xl font-bold">Learning Path</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Build each skill area to unlock harder reading levels.
        </p>
        <div className="space-y-4 mb-6">
          {categoryInfo.map((cat) => {
            const lessons = getLessonsByCategory(cat.id);
            const completed = lessons.filter((l) => state.progress[l.id]?.completed).length;
            const pct = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;

            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{cat.title}</span>
                  <span className="text-sm text-muted-foreground">{completed}/{lessons.length}</span>
                </div>
                <Progress value={pct} className="h-3" />
              </div>
            );
          })}
        </div>

        {/* Milestones */}
        {totalCompleted >= 5 && (
          <Card className="border-accent/30 bg-accent/5 mb-4">
            <CardContent className="flex items-center gap-3 p-4">
              <Award className="h-8 w-8 text-accent shrink-0" />
              <div>
                <div className="font-bold">5 Lessons Complete</div>
                <p className="text-sm text-muted-foreground">You're building a strong foundation.</p>
              </div>
            </CardContent>
          </Card>
        )}
        {totalCompleted >= 10 && (
          <Card className="border-warm/30 bg-warm/5 mb-4">
            <CardContent className="flex items-center gap-3 p-4">
              <Award className="h-8 w-8 text-warm shrink-0" />
              <div>
                <div className="font-bold">10 Lessons Complete</div>
                <p className="text-sm text-muted-foreground">Your commitment is inspiring — keep going!</p>
              </div>
            </CardContent>
          </Card>
        )}
        {totalCompleted >= 8 && (
          <Card className="border-accent/30 bg-accent/5 mb-4">
            <CardContent className="flex items-center gap-3 p-4">
              <Award className="h-8 w-8 text-accent shrink-0" />
              <div>
                <div className="font-bold">Level 2 Unlocked</div>
                <p className="text-sm text-muted-foreground">You moved into guided practice difficulty.</p>
              </div>
            </CardContent>
          </Card>
        )}
        {totalCompleted >= 18 && (
          <Card className="border-warm/30 bg-warm/5 mb-4">
            <CardContent className="flex items-center gap-3 p-4">
              <Award className="h-8 w-8 text-warm shrink-0" />
              <div>
                <div className="font-bold">Level 3 Unlocked</div>
                <p className="text-sm text-muted-foreground">You can now handle mixed-skill reading challenges.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Encouragement */}
        <Card className="bg-muted/50">
          <CardContent className="p-5 text-center">
            <p className="text-lg font-medium">{getEncouragement()}</p>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
