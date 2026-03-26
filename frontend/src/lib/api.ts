const API_BASE = "/api";

export interface ApiUser {
  UserID: number;
  Username: string;
  Email?: string | null;
}

export interface ApiLessonCatalogRow {
  LessonID: number;
  CategoryName: string;
  CategoryID: "phonics" | "sight-words" | "sentences" | "real-world";
  Topic: string;
  LessonDifficulty: number | null;
  LessonNumber: number;
  FrontendLessonID: string;
}

export interface ApiUserProgressRecord {
  LessonID: number;
  Completion: boolean;
  CompletedDate: string | null;
}

export interface ApiUserProgressResponse {
  UserID: number;
  Lessons: ApiUserProgressRecord[];
  Summary: {
    CompletedLessons: number;
    TotalLessons: number;
    OverallPercent: number;
    StreakDays: number;
    ByCategory: Array<{
      CategoryID: number;
      CategoryName: string;
      TotalLessons: number;
      CompletedLessons: number;
      Percent: number;
    }>;
  };
}

export async function registerUser(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    let message = "Registration failed";
    try {
      const payload = (await res.json()) as { error?: string };
      if (payload.error) {
        message = payload.error;
      }
    } catch {
      // Ignore non-JSON responses and use fallback message.
    }
    throw new Error(message);
  }

  return res.json() as Promise<ApiUser>;
}

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    let message = "Login failed";
    try {
      const payload = (await res.json()) as { error?: string };
      if (payload.error) {
        message = payload.error;
      }
    } catch {
      // Ignore non-JSON responses and use fallback message.
    }
    throw new Error(message);
  }

  return res.json() as Promise<ApiUser>;
}

export async function getUserByUsername(username: string) {
  const encoded = encodeURIComponent(username.trim());
  const res = await fetch(`${API_BASE}/users/by-username/${encoded}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<ApiUser>;
}

export async function getUser(id: number) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<ApiUser>;
}

export async function updateUsername(id: number, username: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    let message = "Failed to update username";
    try {
      const payload = (await res.json()) as { error?: string };
      if (payload.error) {
        message = payload.error;
      }
    } catch {
      // Ignore non-JSON responses and use fallback message.
    }
    throw new Error(message);
  }

  return res.json() as Promise<ApiUser>;
}

export async function getLessonsCatalog() {
  const res = await fetch(`${API_BASE}/lessons`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<ApiLessonCatalogRow[]>;
}

export async function getUserProgress(userId: number) {
  const res = await fetch(`${API_BASE}/users/${userId}/progress`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<ApiUserProgressResponse>;
}

export async function upsertUserProgress(userId: number, lessonId: number, completion = true, completedDate?: string) {
  const res = await fetch(`${API_BASE}/users/${userId}/progress/${lessonId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completion, completedDate }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<ApiUserProgressRecord>;
}

export async function clearUserProgress(userId: number) {
  const res = await fetch(`${API_BASE}/users/${userId}/progress`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ ok: boolean }>;
}
