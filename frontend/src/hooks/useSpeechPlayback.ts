import { useSyncExternalStore } from "react";
import { getPlaybackSnapshot, subscribePlayback, type SpeechPlaybackSnapshot } from "@/lib/speak";

const serverSnapshot: SpeechPlaybackSnapshot = { status: "idle", longForm: false };

export function useSpeechPlayback() {
  return useSyncExternalStore(subscribePlayback, getPlaybackSnapshot, () => serverSnapshot);
}
