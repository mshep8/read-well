import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AppState, UserProfile, LessonProgress } from "@/lib/types";
import { loadState, saveProfile, saveLessonProgress, updateTextSize, resetProgress, clearAllData } from "@/lib/storage";

interface AppContextValue {
  state: AppState;
  setProfile: (profile: UserProfile) => void;
  completeLesson: (lessonId: string, score?: number) => void;
  changeTextSize: (size: "small" | "medium" | "large") => void;
  resetAllProgress: () => void;
  clearAll: () => void;
  isOnboarded: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  const isOnboarded = !!state.profile;

  const setProfile = useCallback((profile: UserProfile) => {
    setState(saveProfile(profile));
  }, []);

  const completeLesson = useCallback((lessonId: string, score?: number) => {
    const progress: LessonProgress = {
      lessonId,
      completed: true,
      score,
      completedAt: new Date().toISOString(),
    };
    setState(saveLessonProgress(lessonId, progress));
  }, []);

  const changeTextSize = useCallback((size: "small" | "medium" | "large") => {
    setState(updateTextSize(size));
  }, []);

  const resetAllProgress = useCallback(() => {
    setState(resetProgress());
  }, []);

  const clearAll = useCallback(() => {
    clearAllData();
    setState(loadState());
  }, []);

  // Apply text size to root
  useEffect(() => {
    const sizes = { small: "16px", medium: "18px", large: "22px" };
    document.documentElement.style.fontSize = sizes[state.textSize];
  }, [state.textSize]);

  return (
    <AppContext.Provider value={{ state, setProfile, completeLesson, changeTextSize, resetAllProgress, clearAll, isOnboarded }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
