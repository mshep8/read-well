import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Volume2, Check, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { getLessonById, getLessonsByCategory } from "@/lib/lessonData";
import { cn } from "@/lib/utils";

export default function LessonScreen() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { state, completeLesson } = useApp();
  const lesson = getLessonById(lessonId || "");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (!lesson) return <div className="p-8 text-center">Lesson not found</div>;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
  };

  const getCorrectIndex = () => {
    if (lesson.category === "phonics") return lesson.exercise.correctIndex;
    if (lesson.category === "sentences") return lesson.questions[0]?.correctIndex;
    if (lesson.category === "real-world") return lesson.questions[0]?.correctIndex;
    return -1;
  };

  const isCorrect = selectedAnswer === getCorrectIndex();

  const handleComplete = () => {
    completeLesson(lesson.id, isCorrect ? 100 : 50);
    // Navigate to next lesson or back
    const siblings = getLessonsByCategory(lesson.category);
    const currentIdx = siblings.findIndex((l) => l.id === lesson.id);
    if (currentIdx < siblings.length - 1) {
      navigate(`/lesson/${siblings[currentIdx + 1].id}`);
    } else {
      navigate(`/category/${lesson.category}`);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="mx-auto max-w-md px-5 pt-6">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px]">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>

        {/* PHONICS */}
        {lesson.category === "phonics" && (
          <div className="animate-fade-in">
            <Card className="mb-6">
              <CardContent className="flex flex-col items-center p-8">
                <div className="text-7xl font-bold text-accent mb-2">{lesson.letter}</div>
                <p className="text-lg text-muted-foreground">{lesson.sound}</p>
                <button className="mt-3 flex items-center gap-2 text-accent" aria-label="Listen to sound">
                  <Volume2 className="h-6 w-6" />
                  <span>Listen</span>
                </button>
              </CardContent>
            </Card>

            <h2 className="text-lg font-bold mb-3">Example Words</h2>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {lesson.exampleWords.map((w) => (
                <button key={w.word} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-left min-h-[52px] hover:border-accent/40">
                  <Volume2 className="h-4 w-4 text-accent shrink-0" />
                  <div>
                    <div className="font-semibold">{w.word}</div>
                    <div className="text-xs text-muted-foreground">{w.phonetic}</div>
                  </div>
                </button>
              ))}
            </div>

            <h2 className="text-lg font-bold mb-3">Practice</h2>
            <p className="mb-4 text-muted-foreground">{lesson.exercise.prompt}</p>
            <div className="space-y-2">
              {lesson.exercise.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left text-lg font-medium transition-colors min-h-[56px]",
                    !answered && "border-border hover:border-accent/40",
                    answered && i === getCorrectIndex() && "border-success bg-success/10 text-foreground",
                    answered && selectedAnswer === i && i !== getCorrectIndex() && "border-destructive bg-destructive/10"
                  )}
                >
                  {answered && i === getCorrectIndex() && <Check className="h-5 w-5 text-success shrink-0" />}
                  {answered && selectedAnswer === i && i !== getCorrectIndex() && <X className="h-5 w-5 text-destructive shrink-0" />}
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SIGHT WORDS */}
        {lesson.category === "sight-words" && (
          <div className="animate-fade-in">
            <p className="mb-4 text-muted-foreground">Tap each word to see its meaning.</p>
            <SightWordCards words={lesson.words} onComplete={() => completeLesson(lesson.id, 100)} />
            <Button className="mt-6 w-full min-h-[52px] gap-2" onClick={() => navigate(`/category/${lesson.category}`)}>
              Done
              <Check className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* SENTENCES */}
        {lesson.category === "sentences" && (
          <div className="animate-fade-in">
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-accent uppercase">{lesson.topic}</span>
                  <button className="flex items-center gap-1 text-accent" aria-label="Listen">
                    <Volume2 className="h-5 w-5" /> <span className="text-sm">Listen</span>
                  </button>
                </div>
                <p className="text-lg leading-relaxed">{lesson.passage}</p>
              </CardContent>
            </Card>

            <h2 className="text-lg font-bold mb-3">Check Your Understanding</h2>
            <p className="mb-4 text-muted-foreground">{lesson.questions[0]?.question}</p>
            <div className="space-y-2">
              {lesson.questions[0]?.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left text-lg font-medium transition-colors min-h-[56px]",
                    !answered && "border-border hover:border-accent/40",
                    answered && i === getCorrectIndex() && "border-success bg-success/10",
                    answered && selectedAnswer === i && i !== getCorrectIndex() && "border-destructive bg-destructive/10"
                  )}
                >
                  {answered && i === getCorrectIndex() && <Check className="h-5 w-5 text-success shrink-0" />}
                  {answered && selectedAnswer === i && i !== getCorrectIndex() && <X className="h-5 w-5 text-destructive shrink-0" />}
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* REAL-WORLD */}
        {lesson.category === "real-world" && (
          <div className="animate-fade-in">
            <Card className="mb-4">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-accent uppercase">{lesson.documentType}</span>
                  <button className="flex items-center gap-1 text-accent" aria-label="Listen">
                    <Volume2 className="h-5 w-5" /> <span className="text-sm">Listen</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{lesson.content}</pre>
              </CardContent>
            </Card>

            <h2 className="text-lg font-bold mb-2">Key Vocabulary</h2>
            <div className="space-y-2 mb-6">
              {lesson.vocabulary.map((v) => (
                <button key={v.word} className="flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3 text-left min-h-[52px] hover:border-accent/40">
                  <Volume2 className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold">{v.word}</span>
                    <span className="text-xs text-muted-foreground ml-2">({v.phonetic})</span>
                    <p className="text-sm text-muted-foreground">{v.definition}</p>
                  </div>
                </button>
              ))}
            </div>

            <h2 className="text-lg font-bold mb-3">Check Your Understanding</h2>
            <p className="mb-4 text-muted-foreground">{lesson.questions[0]?.question}</p>
            <div className="space-y-2">
              {lesson.questions[0]?.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left text-lg font-medium transition-colors min-h-[56px]",
                    !answered && "border-border hover:border-accent/40",
                    answered && i === getCorrectIndex() && "border-success bg-success/10",
                    answered && selectedAnswer === i && i !== getCorrectIndex() && "border-destructive bg-destructive/10"
                  )}
                >
                  {answered && i === getCorrectIndex() && <Check className="h-5 w-5 text-success shrink-0" />}
                  {answered && selectedAnswer === i && i !== getCorrectIndex() && <X className="h-5 w-5 text-destructive shrink-0" />}
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback & navigation */}
        {answered && (
          <div className="mt-6 animate-fade-in">
            <Card className={isCorrect ? "border-success/30 bg-success/5" : "border-warm/30 bg-warm/5"}>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-semibold">
                  {isCorrect ? "That's right! Well done." : "Not quite — that's okay. Learning takes practice."}
                </p>
              </CardContent>
            </Card>
            <div className="mt-4 flex gap-3">
              {!isCorrect && (
                <Button variant="secondary" className="flex-1 min-h-[52px] gap-2" onClick={handleRetry}>
                  <RotateCcw className="h-5 w-5" />
                  Try Again
                </Button>
              )}
              <Button className="flex-1 min-h-[52px] gap-2" onClick={handleComplete}>
                Next
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sight word expandable cards
function SightWordCards({ words, onComplete }: { words: { word: string; definition: string; sentence: string }[]; onComplete: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const toggle = (word: string) => {
    setExpanded(expanded === word ? null : word);
    setSeen((prev) => {
      const next = new Set(prev).add(word);
      if (next.size === words.length) onComplete();
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {words.map((w) => (
        <button
          key={w.word}
          onClick={() => toggle(w.word)}
          className={cn(
            "flex w-full flex-col rounded-lg border-2 p-4 text-left transition-colors min-h-[52px]",
            seen.has(w.word) ? "border-success/30" : "border-border",
            expanded === w.word && "bg-card"
          )}
        >
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-accent shrink-0" />
            <span className="text-lg font-bold">{w.word}</span>
            {seen.has(w.word) && <Check className="h-4 w-4 text-success ml-auto" />}
          </div>
          {expanded === w.word && (
            <div className="mt-3 pl-7">
              <p className="text-muted-foreground">{w.definition}</p>
              <p className="mt-2 text-sm italic">"{w.sentence}"</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
