const API_BASE = "/api";

export const DEFAULT_USER_ID = 1;

export async function getUser(id: number) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ UserID: number; Name: string; Email: string }>;
}

export async function updateUserName(id: number, name: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ UserID: number; Name: string; Email: string }>;
}
