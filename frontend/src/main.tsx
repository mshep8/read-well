import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { primeSpeechVoices } from "./lib/speak";

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  primeSpeechVoices();
  window.speechSynthesis.addEventListener("voiceschanged", primeSpeechVoices);
}

createRoot(document.getElementById("root")!).render(<App />);
