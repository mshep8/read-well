/**
 * Free Dictionary API — no key required.
 * https://dictionaryapi.dev/
 */

export type DictionaryPhonetic = {
  text?: string;
  audio?: string;
};

export type DictionaryDefinition = {
  definition: string;
  example?: string;
  synonyms?: string[];
};

export type DictionaryMeaning = {
  partOfSpeech: string;
  definitions: DictionaryDefinition[];
};

export type DictionaryEntry = {
  word: string;
  phonetics?: DictionaryPhonetic[];
  meanings: DictionaryMeaning[];
  sourceUrls?: string[];
};

export class DictionaryLookupError extends Error {
  constructor(
    message: string,
    public readonly code: "empty" | "not_found" | "network" | "unknown"
  ) {
    super(message);
    this.name = "DictionaryLookupError";
  }
}

export async function fetchDictionaryEntries(word: string): Promise<DictionaryEntry[]> {
  const trimmed = word.trim();
  if (!trimmed) {
    throw new DictionaryLookupError("Type a word to look up.", "empty");
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(trimmed)}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new DictionaryLookupError("Check your internet connection and try again.", "network");
  }

  if (res.status === 404) {
    throw new DictionaryLookupError(
      "No entry found. Try a different spelling or a single word.",
      "not_found"
    );
  }

  if (!res.ok) {
    throw new DictionaryLookupError("The dictionary service is busy. Try again in a moment.", "unknown");
  }

  try {
    const data = (await res.json()) as DictionaryEntry[];
    if (!Array.isArray(data) || data.length === 0) {
      throw new DictionaryLookupError("No definitions found for that word.", "not_found");
    }
    return data;
  } catch (e) {
    if (e instanceof DictionaryLookupError) throw e;
    throw new DictionaryLookupError("Could not read the response. Try again.", "unknown");
  }
}
