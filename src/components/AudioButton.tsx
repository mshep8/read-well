import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak } from "@/lib/speak";

interface AudioButtonProps {
  /** Text to speak aloud when pressed */
  text?: string;
  label?: string;
  size?: "sm" | "default" | "icon";
  className?: string;
}

export function AudioButton({ text, label, size = "icon", className }: AudioButtonProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={className}
      onClick={() => {
        if (text) speak(text);
      }}
      aria-label={label ? `Listen to: ${label}` : "Listen"}
    >
      <Volume2 className="h-5 w-5 text-accent" />
      {label && size !== "icon" && <span className="ml-1">{label}</span>}
    </Button>
  );
}
