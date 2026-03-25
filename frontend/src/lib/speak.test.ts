import { describe, expect, it } from "vitest";

import { passageToSpeechParts, preparePassageTextForSpeech } from "@/lib/speak";

describe("preparePassageTextForSpeech", () => {
  it("removes underscore fill-in lines so TTS does not read them", () => {
    expect(preparePassageTextForSpeech("Name: _______________ Done.")).toBe("Name: Done.");
  });

  it("replaces slashes between phrases with a comma pause", () => {
    expect(preparePassageTextForSpeech("Pain Reliever / Fever Reducer.")).toBe(
      "Pain Reliever, Fever Reducer."
    );
  });
});

describe("passageToSpeechParts", () => {
  it("produces chunks without underscores or slash characters for document-style text", () => {
    const sample = `Position: _______________
Pain Reliever / Fever Reducer. Next sentence here.`;
    const parts = passageToSpeechParts(sample);
    const joined = parts.join(" ");
    expect(joined.includes("_")).toBe(false);
    expect(joined.includes("/")).toBe(false);
    expect(joined).toContain("Pain Reliever, Fever Reducer.");
  });
});
