import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AppState, UserProfile, LessonProgress, QuizSummary } from "@/lib/types";
import { loadState, saveProfile, saveLessonProgress, updateTextSize, resetProgress, clearAllData } from "@/lib/storage";
import { getUser, DEFAULT_USER_ID } from "@/lib/api";

interface AppContextValue {
  state: AppState;
  setProfile: (profile: UserProfile) => void;
  completeLesson: (lessonId: string, score?: number, quiz?: QuizSummary) => void;
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

  const completeLesson = useCallback((lessonId: string, score?: number, quiz?: QuizSummary) => {
    const progress: LessonProgress = {
      lessonId,
      completed: true,
      score,
      completedAt: new Date().toISOString(),
      ...(quiz && { quizCorrect: quiz.correctCount, quizTotal: quiz.total }),
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

  // Sync username from backend on load (for persistence across refresh)
  useEffect(() => {
    getUser(DEFAULT_USER_ID)
      .then((user) => {
        if (!user.Username) return;
        setState((prev) => {
          if (prev.profile && prev.profile.username !== user.Username) {
            return saveProfile({ ...prev.profile, username: user.Username });
          }
          return prev;
        });
      })
      .catch(() => {});
  }, []);

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
