import { describe, expect, it } from "vitest";

import {
  categoryInfo,
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
  it("uses the same five themes in the same order for every lesson category", () => {
    expect(STANDARD_TOPICS).toEqual([
      "Documents",
      "Shopping",
      "Everyday terms",
      "Driving",
      "Auto/legal",
    ]);
    for (const list of [phonicsLessons, sightWordLessons, sentenceLessons, realWorldLessons]) {
      expect(list.map((l) => l.topic)).toEqual(STANDARD_TOPICS);
    }
  });
});
