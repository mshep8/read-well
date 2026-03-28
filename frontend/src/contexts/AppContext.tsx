import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { AppState, UserProfile, LessonProgress, QuizSummary } from "@/lib/types";
import { loadState, saveProfile, saveLessonProgress, saveState, updateTextSize, resetProgress, clearAllData } from "@/lib/storage";
import {
  clearUserProgress,
  getLessonsCatalog,
  getUser,
  getUserByUsername,
  getUserProgress,
  upsertUserProgress,
} from "@/lib/api";

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
  const [lessonCatalogLoaded, setLessonCatalogLoaded] = useState(false);
  const frontendToDbLessonMapRef = useRef<Record<string, number>>({});
  const dbToFrontendLessonMapRef = useRef<Record<number, string>>({});

  const isOnboarded = !!state.profile;

  const setProfile = useCallback((profile: UserProfile) => {
    setState(saveProfile(profile));
  }, []);

  const completeLesson = useCallback((lessonId: string, score?: number, quiz?: QuizSummary) => {
    const completedAt = new Date().toISOString();
    const progress: LessonProgress = {
      lessonId,
      completed: true,
      score,
      completedAt,
      ...(quiz && { quizCorrect: quiz.correctCount, quizTotal: quiz.total }),
    };
    setState(saveLessonProgress(lessonId, progress));

    const userId = state.profile?.userId;
    const dbLessonId = frontendToDbLessonMapRef.current[lessonId];
    if (userId && dbLessonId) {
      upsertUserProgress(userId, dbLessonId, true, completedAt).catch(() => {});
    }
  }, [state.profile?.userId]);

  const changeTextSize = useCallback((size: "small" | "medium" | "large") => {
    setState(updateTextSize(size));
  }, []);

  const resetAllProgress = useCallback(() => {
    setState(resetProgress());
    const userId = state.profile?.userId;
    if (userId) {
      clearUserProgress(userId).catch(() => {});
    }
  }, [state.profile?.userId]);

  const clearAll = useCallback(() => {
    clearAllData();
    setState(loadState());
  }, []);

  // Apply text size to root
  useEffect(() => {
    const sizes = { small: "16px", medium: "18px", large: "22px" };
    document.documentElement.style.fontSize = sizes[state.textSize];
  }, [state.textSize]);

  // Load backend lesson catalog so frontend lesson IDs can map to DB lesson IDs.
  useEffect(() => {
    getLessonsCatalog()
      .then((rows) => {
        const forward: Record<string, number> = {};
        const reverse: Record<number, string> = {};

        for (const row of rows) {
          forward[row.FrontendLessonID] = row.LessonID;
          reverse[row.LessonID] = row.FrontendLessonID;
        }

        frontendToDbLessonMapRef.current = forward;
        dbToFrontendLessonMapRef.current = reverse;
      })
      .catch(() => {})
      .finally(() => setLessonCatalogLoaded(true));
  }, []);

  // Backfill userId from username for older localStorage profiles.
  useEffect(() => {
    if (!state.profile || state.profile.userId) {
      return;
    }

    const username = state.profile.username.trim();
    if (!username) {
      return;
    }

    getUserByUsername(username)
      .then((user) => {
        setState((prev) => {
          if (!prev.profile || prev.profile.userId || prev.profile.username !== username) {
            return prev;
          }

          const next = {
            ...prev,
            profile: {
              ...prev.profile,
              userId: user.UserID,
              username: user.Username,
            },
          };
          saveState(next);
          return next;
        });
      })
      .catch(() => {});
  }, [state.profile]);

  // Keep username in sync with backend for the authenticated user.
  useEffect(() => {
    const userId = state.profile?.userId;
    if (!userId) {
      return;
    }

    getUser(userId)
      .then((user) => {
        if (!user.Username) return;
        setState((prev) => {
          if (!prev.profile || prev.profile.userId !== userId) {
            return prev;
          }
          if (prev.profile.username === user.Username) {
            return prev;
          }

          const next = {
            ...prev,
            profile: {
              ...prev.profile,
              username: user.Username,
            },
          };
          saveState(next);
          return next;
        });
      })
      .catch(() => {});
  }, [state.profile?.userId]);

  // Hydrate local progress from backend once lesson/user mapping is known.
  useEffect(() => {
    if (!lessonCatalogLoaded) {
      return;
    }

    const userId = state.profile?.userId;
    if (!userId) {
      return;
    }

    const reverseMap = dbToFrontendLessonMapRef.current;
    if (!Object.keys(reverseMap).length) {
      return;
    }

    getUserProgress(userId)
      .then((result) => {
        setState((prev) => {
          const mergedProgress = { ...prev.progress };

          for (const row of result.Lessons) {
            if (!row.Completion) continue;

            const frontendLessonId = reverseMap[row.LessonID];
            if (!frontendLessonId) continue;

            const existing = mergedProgress[frontendLessonId];
            mergedProgress[frontendLessonId] = {
              lessonId: frontendLessonId,
              completed: true,
              score: existing?.score ?? 100,
              completedAt: row.CompletedDate ?? existing?.completedAt ?? new Date().toISOString(),
              quizCorrect: existing?.quizCorrect,
              quizTotal: existing?.quizTotal,
            };
          }

          const next = {
            ...prev,
            progress: mergedProgress,
            streak: result.Summary?.StreakDays ?? prev.streak,
          };
          saveState(next);
          return next;
        });
      })
      .catch(() => {});
  }, [lessonCatalogLoaded, state.profile?.userId]);

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
