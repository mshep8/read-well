const API_BASE = "/api";

export const DEFAULT_USER_ID = 1;

export interface ApiUser {
  UserID: number;
  Username: string;
  Email?: string | null;
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
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<ApiUser>;
}
