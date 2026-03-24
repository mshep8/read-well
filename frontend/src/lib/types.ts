export type LessonCategory = "phonics" | "sight-words" | "sentences" | "real-world";

export interface UserProfile {
  name: string;
  startingLevel: LessonCategory;
  createdAt: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
  /** How many quiz questions were answered correctly (when lesson has a quiz) */
  quizCorrect?: number;
  /** Total quiz questions in that lesson */
  quizTotal?: number;
}

/** Optional quiz summary passed when completing a lesson */
export interface QuizSummary {
  correctCount: number;
  total: number;
}

export interface AppState {
  profile: UserProfile | null;
  progress: Record<string, LessonProgress>;
  streak: number;
  lastSessionDate: string | null;
  textSize: "small" | "medium" | "large";
}

export interface PhonicsLesson {
  id: string;
  category: "phonics";
  title: string;
  letter: string;
  sound: string;
  exampleWords: { word: string; phonetic: string }[];
  exercise: {
    prompt: string;
    targetSound: string;
    options: string[];
    correctIndex: number;
    /** Why the correct answer is right (and others are not) */
    explanation: string;
  };
}

export interface SightWordLesson {
  id: string;
  category: "sight-words";
  title: string;
  words: { word: string; definition: string; sentence: string }[];
}

export interface SentenceLesson {
  id: string;
  category: "sentences";
  title: string;
  passage: string;
  topic: string;
  questions: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}

export interface RealWorldLesson {
  id: string;
  category: "real-world";
  title: string;
  documentType: string;
  content: string;
  vocabulary: { word: string; definition: string; phonetic: string }[];
  questions: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}

export type Lesson = PhonicsLesson | SightWordLesson | SentenceLesson | RealWorldLesson;
