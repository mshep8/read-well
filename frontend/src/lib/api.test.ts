import { afterEach, describe, expect, it, vi } from "vitest";

import { updateUserName } from "@/lib/api";

describe("updateUserName", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends only the name in the PATCH body", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ UserID: 1, Name: "Taylor", Email: "taylor@example.com" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await updateUserName(1, "Taylor");

    expect(fetchMock).toHaveBeenCalledWith("/api/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Taylor" }),
    });
  });
});
