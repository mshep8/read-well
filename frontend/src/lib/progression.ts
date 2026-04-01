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

export function getCurrentLevel(totalCompleted: number): LearningLevel {
  return [...learningLevels].reverse().find((level) => totalCompleted >= level.requiredLessons) ?? learningLevels[0];
}

export function getNextLevel(totalCompleted: number): LearningLevel | null {
  const currentLevel = getCurrentLevel(totalCompleted);
  return learningLevels.find((level) => level.level === currentLevel.level + 1) ?? null;
}

export function getRequiredLevelForCategory(_categoryId: string): number {
  return 1;
}

export function isCategoryUnlocked(_categoryId: string, _totalCompleted: number): boolean {
  return true;
}
