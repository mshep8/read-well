import { AppState, LessonProgress, UserProfile } from "./types";

const STORAGE_KEY = "read-app-state";

const defaultState: AppState = {
  profile: null,
  progress: {},
  streak: 0,
  lastSessionDate: null,
  textSize: "medium",
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function saveProfile(profile: UserProfile): AppState {
  const state = loadState();
  state.profile = profile;
  saveState(state);
  return state;
}

export function saveLessonProgress(lessonId: string, progress: LessonProgress): AppState {
  const state = loadState();
  state.progress[lessonId] = progress;

  // Update streak
  const today = new Date().toDateString();
  if (state.lastSessionDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streak = state.lastSessionDate === yesterday ? state.streak + 1 : 1;
    state.lastSessionDate = today;
  }

  saveState(state);
  return state;
}

export function updateTextSize(size: "small" | "medium" | "large"): AppState {
  const state = loadState();
  state.textSize = size;
  saveState(state);
  return state;
}

export function resetProgress(): AppState {
  const state = loadState();
  state.progress = {};
  state.streak = 0;
  state.lastSessionDate = null;
  saveState(state);
  return state;
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
