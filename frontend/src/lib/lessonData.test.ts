import { describe, expect, it } from "vitest";

import {
  categoryInfo,
  getLessonsByCategoryAndContext,
  PRACTICE_CONTEXTS,
  phonicsLessons,
  realWorldLessons,
  sentenceLessons,
  sightWordLessons,
  STANDARD_TOPICS,
} from "@/lib/lessonData";

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

describe("standard topics", () => {
  it("keeps legacy topics available for backward compatibility", () => {
    expect(STANDARD_TOPICS).toEqual([
      "Documents",
      "Shopping",
      "Everyday terms",
      "Driving",
      "Auto/legal",
    ]);
  });
});

describe("practice context filtering", () => {
  it("exposes the configured practice context dropdown options", () => {
    expect(PRACTICE_CONTEXTS).toEqual([
      "Everyday Terms",
      "Employment",
      "Finance",
      "Legal",
      "Medical",
      "Housing",
      "Shopping",
      "Auto",
      "Technology",
      "Social Life",
      "Dining",
      "Emergencies",
      "Community",
    ]);
  });

  it("returns one lesson per level for legacy mapped contexts", () => {
    expect(getLessonsByCategoryAndContext("sight-words", "Shopping")).toHaveLength(1);
    expect(getLessonsByCategoryAndContext("sentences", "Shopping")).toHaveLength(1);
    expect(getLessonsByCategoryAndContext("real-world", "Shopping")).toHaveLength(1);
    expect(getLessonsByCategoryAndContext("phonics", "Shopping")).toHaveLength(1);
  });

  it("returns at least one lesson per level for every dropdown context", () => {
    for (const context of PRACTICE_CONTEXTS) {
      expect(getLessonsByCategoryAndContext("sight-words", context).length).toBeGreaterThan(0);
      expect(getLessonsByCategoryAndContext("sentences", context).length).toBeGreaterThan(0);
      expect(getLessonsByCategoryAndContext("real-world", context).length).toBeGreaterThan(0);
      expect(getLessonsByCategoryAndContext("phonics", context).length).toBeGreaterThan(0);
    }
  });
});
