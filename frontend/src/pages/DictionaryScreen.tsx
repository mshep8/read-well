import { useState, FormEvent } from "react";
import { BookText, Search, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { fetchDictionaryEntries, DictionaryLookupError, type DictionaryEntry } from "@/lib/dictionaryApi";
import { speak } from "@/lib/speak";

export default function DictionaryScreen() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<DictionaryEntry[] | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setEntries(null);
    const q = query.trim();
    if (!q) {
      setError("Type a word to look up.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchDictionaryEntries(q);
      setEntries(data);
    } catch (err) {
      if (err instanceof DictionaryLookupError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto w-full max-w-md md:max-w-2xl px-4 sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <BookText className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Dictionary</h1>
            <p className="text-sm text-muted-foreground">Look up a word you don&apos;t know</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <label htmlFor="dict-word" className="text-sm font-medium">
                  Word
                </label>
                <Input
                  id="dict-word"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. receipt, schedule, caution"
                  className="min-h-[48px] text-lg"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={true}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="min-h-[48px] gap-2 sm:shrink-0" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Looking up…
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </form>
            {error && (
              <p className="mt-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {entries && entries.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            {entries.map((entry, ei) => {
              const phoneticText = entry.phonetics?.find((p) => p.text)?.text;
              const audioForEntry = entry.phonetics?.find((p) => p.audio)?.audio;

              return (
                <Card key={`${entry.word}-${ei}`} className="overflow-hidden">
                  <CardContent className="p-4 sm:p-5">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold capitalize">{entry.word}</h2>
                        {phoneticText && (
                          <p className="mt-1 font-mono text-sm text-muted-foreground">{phoneticText}</p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => speak(entry.word)}
                          aria-label={`Listen to ${entry.word}`}
                        >
                          <Volume2 className="h-4 w-4 text-accent" />
                          Say word
                        </Button>
                        {audioForEntry && (
                          <audio controls className="h-9 max-w-[200px] sm:max-w-[240px]" preload="none">
                            <source src={audioForEntry} type="audio/mpeg" />
                          </audio>
                        )}
                      </div>
                    </div>

                    <div className="space-y-5">
                      {entry.meanings.map((meaning, mi) => (
                        <div key={`${meaning.partOfSpeech}-${mi}`}>
                          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
                            {meaning.partOfSpeech}
                          </p>
                          <ol className="list-decimal space-y-3 pl-5 text-base leading-relaxed">
                            {meaning.definitions.map((def, di) => (
                              <li key={di}>
                                <p>{def.definition}</p>
                                {def.example && (
                                  <p className="mt-1 text-sm italic text-muted-foreground">&ldquo;{def.example}&rdquo;</p>
                                )}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="mt-1 h-8 gap-1 px-2 text-accent"
                                  onClick={() => speak(def.definition + (def.example ? `. Example: ${def.example}` : ""))}
                                >
                                  <Volume2 className="h-3.5 w-3.5" />
                                  Listen
                                </Button>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <p className="text-center text-xs text-muted-foreground pb-2">
              Definitions from{" "}
              <a
                href="https://dictionaryapi.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:no-underline"
              >
                Free Dictionary API
              </a>
              .
            </p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
