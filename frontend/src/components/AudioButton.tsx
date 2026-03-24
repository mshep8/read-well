import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak, speakSequence } from "@/lib/speak";

interface AudioButtonProps {
  /** Single phrase to speak */
  text?: string;
  /** Multiple phrases in order (clearer pronunciation; used instead of text when set) */
  parts?: string[];
  label?: string;
  size?: "sm" | "default" | "icon";
  className?: string;
}

export function AudioButton({ text, parts, label, size = "icon", className }: AudioButtonProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      type="button"
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        if (parts?.length) speakSequence(parts);
        else if (text) speak(text);
      }}
      aria-label={label ? `Listen to: ${label}` : "Listen"}
    >
      <Volume2 className="h-5 w-5 text-accent" />
      {label && size !== "icon" && <span className="ml-1">{label}</span>}
    </Button>
  );
}
