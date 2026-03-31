import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, X, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { getLessonById, getLessonsByCategoryAndContext, PRACTICE_CONTEXTS, type PracticeContext } from "@/lib/lessonData";
import { cn } from "@/lib/utils";
import { AudioButton } from "@/components/AudioButton";
import { PassageSpeechControls } from "@/components/PassageSpeechControls";
import {
  speak,
  speakSequence,
  buildPhonicsIntroParts,
  passageToSpeechParts,
} from "@/lib/speak";
import type { Lesson } from "@/lib/types";

export default function LessonScreen() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contextParam = searchParams.get("context");
  const selectedContext = (PRACTICE_CONTEXTS.includes(contextParam as PracticeContext)
    ? contextParam
    : PRACTICE_CONTEXTS[0]) as PracticeContext;
  const { completeLesson } = useApp();
  const lesson = getLessonById(lessonId || "");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  /** Sentence / real-world: which question in the list */
  const [questionIndex, setQuestionIndex] = useState(0);
  /** Completed answers for multi-question lessons (before current is finalized on continue) */
  const [priorResults, setPriorResults] = useState<boolean[]>([]);

  useEffect(() => {
    setQuestionIndex(0);
    setPriorResults([]);
    setAnswered(false);
    setSelectedAnswer(null);
  }, [lessonId]);

  const multiQuiz =
    lesson && (lesson.category === "sentences" || lesson.category === "real-world") ? lesson.questions : null;
  const totalQuestions = multiQuiz?.length ?? 0;
  const currentQuestion = multiQuiz?.[questionIndex];

  const getCorrectIndex = (): number => {
    if (!lesson) return -1;
    if (lesson.category === "phonics") return lesson.exercise.correctIndex;
    if (lesson.category === "sentences" || lesson.category === "real-world") {
      return currentQuestion?.correctIndex ?? -1;
    }
    return -1;
  };

  const currentExplanation =
    lesson?.category === "phonics" ? lesson.exercise.explanation : currentQuestion?.explanation ?? "";

  if (!lesson) return <div className="p-8 text-center">Lesson not found</div>;

  const isCorrect = selectedAnswer !== null && selectedAnswer === getCorrectIndex();

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
  };

  const navigateAfterLesson = (finishedLesson: Lesson) => {
    const siblings = getLessonsByCategoryAndContext(finishedLesson.category, selectedContext);
    const currentIdx = siblings.findIndex((l) => l.id === finishedLesson.id);
    if (currentIdx < siblings.length - 1) {
      navigate(`/lesson/${siblings[currentIdx + 1].id}?context=${encodeURIComponent(selectedContext)}`);
    } else {
      navigate(`/category/${finishedLesson.category}?context=${encodeURIComponent(selectedContext)}`);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setAnswered(false);
  };

  /** Phonics: one question — finish and save */
  const finishPhonicsLesson = () => {
    const correct = selectedAnswer === getCorrectIndex();
    completeLesson(lesson.id, correct ? 100 : 50, { correctCount: correct ? 1 : 0, total: 1 });
    navigateAfterLesson(lesson);
  };

  /** Multi-question: continue to next or finish */
  const handleContinueMultiQuiz = () => {
    if (!multiQuiz || selectedAnswer === null) return;
    const correct = selectedAnswer === getCorrectIndex();
    const combined = [...priorResults, correct];

    if (questionIndex < totalQuestions - 1) {
      setPriorResults(combined);
      setQuestionIndex((i) => i + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      return;
    }

    const correctCount = combined.filter(Boolean).length;
    const total = combined.length;
    const pct = total ? Math.round((correctCount / total) * 100) : 0;
    completeLesson(lesson.id, pct, { correctCount, total });
    navigateAfterLesson(lesson);
  };

  const showQuizFeedback = answered && (lesson.category === "phonics" || currentQuestion);

  return (
    <div className="min-h-screen pb-8">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-4 sm:pt-6">
        <button
          type="button"
          onClick={() => navigate(`/category/${lesson.category}?context=${encodeURIComponent(selectedContext)}`)}
          className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="mb-2">
          <p className="text-sm font-medium text-accent uppercase tracking-wide">{lesson.topic}</p>
          <h1 className="text-xl sm:text-2xl font-bold">{lesson.title}</h1>
        </div>

        {/* PHONICS */}
        {lesson.category === "phonics" && (
          <div className="animate-fade-in">
            <Card className="mb-6">
              <CardContent className="flex flex-col items-center p-8">
                <div className="text-7xl sm:text-8xl font-bold text-accent mb-2">{lesson.letter}</div>
                <p className="text-lg text-muted-foreground">{lesson.sound}</p>
                <div className="mt-3 flex items-center gap-2 text-accent">
                  <AudioButton
                    parts={buildPhonicsIntroParts(lesson.letter, lesson.sound)}
                    label="letter and sound"
                    size="default"
                    className="text-accent"
                  />
                  <span className="text-sm">Listen</span>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-lg font-bold mb-3">Example Words</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {lesson.exampleWords.map((w) => (
                <button
                  key={w.word}
                  type="button"
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left min-h-[52px] hover:border-accent/40 w-full"
                  onClick={() => speak(w.word)}
                >
                  <Volume2 className="h-5 w-5 text-accent shrink-0" aria-hidden />
                  <div className="min-w-0">
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
                  type="button"
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
            <p className="mb-4 text-muted-foreground">
              Tap a word to open it. Use the speaker to hear the word, meaning, and example.
            </p>
            <SightWordCards words={lesson.words} onComplete={() => completeLesson(lesson.id, 100, { correctCount: lesson.words.length, total: lesson.words.length })} />
            <Button
              className="mt-6 w-full min-h-[52px] gap-2"
              onClick={() => navigate(`/category/${lesson.category}?context=${encodeURIComponent(selectedContext)}`)}
            >
              Done
              <Check className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* SENTENCES */}
        {lesson.category === "sentences" && currentQuestion && (
          <div className="animate-fade-in">
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Passage</span>
                  <PassageSpeechControls parts={passageToSpeechParts(lesson.passage)} />
                </div>
                <p className="text-lg leading-relaxed">{lesson.passage}</p>
              </CardContent>
            </Card>

            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold">Check your understanding</h2>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Question {questionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">{currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
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
        {lesson.category === "real-world" && currentQuestion && (
          <div className="animate-fade-in">
            <Card className="mb-4">
              <CardContent className="p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{lesson.documentType}</span>
                  <PassageSpeechControls parts={passageToSpeechParts(lesson.content)} />
                </div>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{lesson.content}</pre>
              </CardContent>
            </Card>

            <h2 className="text-lg font-bold mb-1">Key vocabulary</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Tap a word to open it. Use the speaker to hear the word and its meaning.
            </p>
            <RealWorldVocabCards vocabulary={lesson.vocabulary} />

            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold">Check your understanding</h2>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Question {questionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">{currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
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

        {/* Feedback & actions */}
        {showQuizFeedback && (
          <div className="mt-6 animate-fade-in space-y-4">
            <Card className={isCorrect ? "border-success/30 bg-success/5" : "border-warm/30 bg-warm/5"}>
              <CardContent className="p-4 sm:p-5">
                <p className="text-lg font-semibold mb-2">
                  {isCorrect ? "That's right!" : "Not quite."}
                </p>
                <p className="text-base text-foreground leading-relaxed">{currentExplanation}</p>
              </CardContent>
            </Card>

            {multiQuiz && answered && (
              <p className="text-sm text-muted-foreground text-center">
                Running score:{" "}
                {priorResults.filter(Boolean).length + (isCorrect ? 1 : 0)} of {priorResults.length + 1} correct
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {!isCorrect && (
                <Button variant="secondary" className="flex-1 min-h-[52px] gap-2 w-full sm:w-auto" onClick={handleRetry}>
                  <RotateCcw className="h-5 w-5" />
                  Try again
                </Button>
              )}
              {lesson.category === "phonics" && (
                <Button className="flex-1 min-h-[52px] gap-2 w-full sm:w-auto" onClick={finishPhonicsLesson}>
                  Next lesson
                  <ArrowRight className="h-5 w-5" />
                </Button>
              )}
              {(lesson.category === "sentences" || lesson.category === "real-world") && (
                <Button className="flex-1 min-h-[52px] gap-2 w-full sm:w-auto" onClick={handleContinueMultiQuiz}>
                  {questionIndex < totalQuestions - 1 ? (
                    <>
                      Next question
                      <ArrowRight className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Finish lesson
                      <Check className="h-5 w-5" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RealWorldVocabCards({
  vocabulary,
}: {
  vocabulary: { word: string; definition: string; phonetic: string }[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-2 mb-6">
      {vocabulary.map((v) => (
        <div
          key={v.word}
          className={cn(
            "flex w-full flex-col rounded-lg border-2 border-border text-left transition-colors overflow-hidden",
            expanded === v.word && "bg-card"
          )}
        >
          <button
            type="button"
            onClick={() => setExpanded((cur) => (cur === v.word ? null : v.word))}
            className="flex w-full items-center gap-3 p-4 text-left min-h-[52px] hover:bg-accent/5 transition-colors"
          >
            <span className="text-lg font-bold">{v.word}</span>
          </button>
          {expanded === v.word && (
            <div className="flex gap-3 border-t border-border px-4 py-3">
              <AudioButton
                parts={[v.word, v.definition]}
                label={`Read ${v.word} and its meaning`}
                className="shrink-0"
              />
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-xs text-muted-foreground mb-1">({v.phonetic})</p>
                <p className="text-muted-foreground">{v.definition}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SightWordCards({ words, onComplete }: { words: { word: string; definition: string; sentence: string }[]; onComplete: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const onCardClick = (word: string) => {
    const willExpand = expanded !== word;
    setExpanded(willExpand ? word : null);
    setSeen((prev) => {
      const next = new Set(prev).add(word);
      if (next.size === words.length) onComplete();
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {words.map((w) => (
        <div
          key={w.word}
          className={cn(
            "flex w-full flex-col rounded-lg border-2 text-left transition-colors overflow-hidden",
            seen.has(w.word) ? "border-success/30" : "border-border",
            expanded === w.word && "bg-card"
          )}
        >
          <button
            type="button"
            onClick={() => onCardClick(w.word)}
            className="flex w-full items-center gap-3 p-4 text-left min-h-[52px] hover:bg-accent/5 transition-colors"
          >
            <span className="text-lg font-bold">{w.word}</span>
            {seen.has(w.word) && <Check className="h-4 w-4 text-success ml-auto shrink-0" aria-hidden />}
          </button>
          {expanded === w.word && (
            <div className="flex gap-3 border-t border-border px-4 py-3">
              <AudioButton
                parts={[w.word, w.definition, `Example sentence: ${w.sentence}`]}
                label={`Read ${w.word}, its meaning, and example sentence`}
                className="shrink-0"
              />
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-muted-foreground">{w.definition}</p>
                <p className="mt-2 text-sm italic">"{w.sentence}"</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
