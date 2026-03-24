import { Volume2, Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  speakSequence,
  pausePlayback,
  resumePlayback,
  stopPlayback,
} from "@/lib/speak";
import { useSpeechPlayback } from "@/hooks/useSpeechPlayback";
import { cn } from "@/lib/utils";

interface PassageSpeechControlsProps {
  parts: string[];
  className?: string;
}

/**
 * Listen + Pause / Resume / Stop for long passages (sentences, documents).
 */
export function PassageSpeechControls({ parts, className }: PassageSpeechControlsProps) {
  const { status, longForm } = useSpeechPlayback();
  const hasContent = parts.some((p) => p.trim());

  const handleListen = () => {
    if (!hasContent) return;
    speakSequence(parts, { longForm: true });
  };

  const showTransport = longForm && hasContent;
  const isPlaying = showTransport && status === "playing";
  const isPaused = showTransport && status === "paused";

  return (
    <div className={cn("flex flex-wrap items-center justify-end gap-2", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-9 gap-1.5 text-accent px-2"
        disabled={!hasContent}
        onClick={handleListen}
        title={isPaused ? "Start reading again from the beginning" : undefined}
        aria-label="Listen from the start"
      >
        <Volume2 className="h-4 w-4 shrink-0" />
        <span className="text-sm">Listen</span>
      </Button>

      {showTransport && (
        <>
          {(isPlaying || isPaused) && (
            <Button
              type="button"
              variant={isPaused ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-9 min-w-[6.25rem] gap-2 px-3 transition-[color,background-color,border-color,box-shadow] duration-200 ease-out"
              )}
              onClick={isPlaying ? pausePlayback : resumePlayback}
              aria-label={isPlaying ? "Pause reading" : "Play reading"}
              aria-pressed={isPaused}
            >
              <span className="relative grid h-4 w-4 shrink-0 place-items-center">
                <Pause
                  className={cn(
                    "col-start-1 row-start-1 h-4 w-4 transition-all duration-200 ease-out",
                    isPlaying ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  )}
                  aria-hidden
                />
                <Play
                  className={cn(
                    "col-start-1 row-start-1 h-4 w-4 transition-all duration-200 ease-out",
                    isPaused ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  )}
                  aria-hidden
                />
              </span>
              <span className="relative inline-flex h-5 min-w-[2.5rem] items-center justify-center overflow-hidden text-sm font-medium">
                <span
                  className={cn(
                    "transition-all duration-200 ease-out",
                    isPlaying ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-3 opacity-0"
                  )}
                >
                  Pause
                </span>
                <span
                  className={cn(
                    "transition-all duration-200 ease-out",
                    isPaused ? "translate-y-0 opacity-100" : "pointer-events-none absolute -translate-y-3 opacity-0"
                  )}
                >
                  Play
                </span>
              </span>
            </Button>
          )}
          {(isPlaying || isPaused) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 gap-1 text-muted-foreground"
              onClick={stopPlayback}
              aria-label="Stop reading"
            >
              <Square className="h-3.5 w-3.5" />
              <span className="text-sm">Stop</span>
            </Button>
          )}
        </>
      )}
    </div>
  );
}
