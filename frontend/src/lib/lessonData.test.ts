import { describe, expect, it } from "vitest";

import { categoryInfo } from "@/lib/lessonData";

describe("categoryInfo display order", () => {
  it("lists adult-practical categories first and phonics last", () => {
    expect(categoryInfo.map((c) => c.id)).toEqual([
      "sight-words",
      "sentences",
      "real-world",
      "phonics",
    ]);
  });
});
