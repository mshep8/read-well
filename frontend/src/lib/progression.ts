import { allLessons } from "@/lib/lessonData";

export type LearningLevel = {
  level: number;
  title: string;
  difficulty: string;
  requiredLessons: number;
};

export const learningLevels: LearningLevel[] = [
  { level: 1, title: "Starter", difficulty: "Foundations", requiredLessons: 0 },
  { level: 2, title: "Builder", difficulty: "Guided Practice", requiredLessons: 8 },
  { level: 3, title: "Explorer", difficulty: "Mixed Skills", requiredLessons: 18 },
  { level: 4, title: "Advanced", difficulty: "Real-World Challenge", requiredLessons: 32 },
  { level: 5, title: "Master", difficulty: "Independent Reading", requiredLessons: allLessons.length },
];

const categoryUnlockLevel: Record<string, number> = {
  phonics: 1,
  "sight-words": 1,
  sentences: 2,
  "real-world": 3,
};

export function getCurrentLevel(totalCompleted: number): LearningLevel {
  return [...learningLevels].reverse().find((level) => totalCompleted >= level.requiredLessons) ?? learningLevels[0];
}

export function getNextLevel(totalCompleted: number): LearningLevel | null {
  const currentLevel = getCurrentLevel(totalCompleted);
  return learningLevels.find((level) => level.level === currentLevel.level + 1) ?? null;
}

export function getRequiredLevelForCategory(categoryId: string): number {
  return categoryUnlockLevel[categoryId] ?? 1;
}

export function isCategoryUnlocked(categoryId: string, totalCompleted: number): boolean {
  const currentLevel = getCurrentLevel(totalCompleted);
  return currentLevel.level >= getRequiredLevelForCategory(categoryId);
}
