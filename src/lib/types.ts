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
  questions: { question: string; options: string[]; correctIndex: number }[];
}

export interface RealWorldLesson {
  id: string;
  category: "real-world";
  title: string;
  documentType: string;
  content: string;
  vocabulary: { word: string; definition: string; phonetic: string }[];
  questions: { question: string; options: string[]; correctIndex: number }[];
}

export type Lesson = PhonicsLesson | SightWordLesson | SentenceLesson | RealWorldLesson;
