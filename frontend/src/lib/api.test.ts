import { afterEach, describe, expect, it, vi } from "vitest";

import { updateUsername } from "@/lib/api";

describe("updateUsername", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends only the username in the PATCH body", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ UserID: 1, Username: "taylor", Email: "taylor@example.com" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await updateUsername(1, "taylor");

    expect(fetchMock).toHaveBeenCalledWith("/api/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "taylor" }),
    });
  });
});
