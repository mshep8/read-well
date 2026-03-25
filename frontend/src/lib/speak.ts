/**
 * Speak text aloud using the Web Speech API.
 * Natural voice selection, pause/resume/stop for long passages.
 */

const LANG = "en-US";
/** Slightly below 1.0 reads clearly without sounding as “slow robot” as 0.85 */
const RATE = 0.96;
const PITCH = 1;
/** Breathing room between sentences so users can hit Pause between chunks */
const GAP_MS = 500;

type PlaybackStatus = "idle" | "playing" | "paused";

export type SpeechPlaybackSnapshot = {
  status: PlaybackStatus;
  /** True when the current session was started as a long passage (show Pause / Stop) */
  longForm: boolean;
};

let queue: string[] = [];
let queueIndex = 0;
let gapTimer: ReturnType<typeof setTimeout> | null = null;
/** User paused in the gap between sentences (legacy path; gap cleared on pause) */
let pausedBetweenChunks = false;
/** True when user paused a long passage — we cancelled audio but kept queue (Safari-safe) */
let applicationPaused = false;
let longFormSession = false;
/** Bumps when a new speakSequence starts so stale utterance callbacks are ignored */
let playbackSessionId = 0;
/** True while the current utterance has fired onstart (covers browsers that lag `speaking`) */
let chunkAudiblyStarted = false;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

let snapshotCache: SpeechPlaybackSnapshot | null = null;

export function getPlaybackSnapshot(): SpeechPlaybackSnapshot {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    const idle = { status: "idle" as const, longForm: false };
    return idle;
  }
  const synth = window.speechSynthesis;
  const inGap = gapTimer !== null;
  const speaking = synth.speaking;
  const pausedSynth = synth.paused;

  let status: PlaybackStatus = "idle";
  // applicationPaused first: Safari often ignores speechSynthesis.pause(), so we use cancel + queue
  if (applicationPaused || pausedSynth || pausedBetweenChunks) status = "paused";
  else if (
    speaking ||
    chunkAudiblyStarted ||
    inGap ||
    (longFormSession && queueIndex < queue.length)
  ) {
    status = "playing";
  }

  const longForm = longFormSession;
  if (status === "idle" && !longForm) {
    const idle = { status: "idle" as const, longForm: false };
    if (snapshotCache?.status === "idle" && snapshotCache.longForm === false) return snapshotCache;
    snapshotCache = idle;
    return idle;
  }
  const next = { status, longForm };
  if (
    snapshotCache &&
    snapshotCache.status === next.status &&
    snapshotCache.longForm === next.longForm
  ) {
    return snapshotCache;
  }
  snapshotCache = next;
  return next;
}

/**
 * Subscribe to playback changes (for useSyncExternalStore).
 * Calls `onChange` whenever speaking / pause / queue state updates.
 */
export function subscribePlayback(onChange: () => void): () => void {
  listeners.add(onChange);
  onChange();
  return () => listeners.delete(onChange);
}

/** Prefer more natural system voices when the browser exposes them */
function pickNaturalVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const score = (v: SpeechSynthesisVoice): number => {
    const n = `${v.name} ${v.voiceURI || ""}`.toLowerCase();
    let s = 0;
    if (v.lang?.toLowerCase().startsWith("en")) s += 20;
    if (v.lang?.toLowerCase() === "en-us") s += 15;
    // Prefer enhanced / premium / neural labels (Chrome, Edge, some macOS builds)
    if (/premium|enhanced|neural|natural|wavenet|studio/i.test(n)) s += 80;
    if (/google us english|samantha|allison|ava|nicky|aaron|susan|zoe/i.test(n)) s += 45;
    if (/microsoft.*english|aria|jenny|guy|michelle|brandon/i.test(n)) s += 40;
    if (/fred|victoria|daniel|karen|moira|tessa|serena/i.test(n)) s += 25;
    return s;
  };

  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  const pool = en.length ? en : voices;
  return [...pool].sort((a, b) => score(b) - score(a))[0] ?? null;
}

function applyNaturalUtterance(utterance: SpeechSynthesisUtterance) {
  utterance.lang = LANG;
  utterance.rate = RATE;
  utterance.pitch = PITCH;
  const voice = pickNaturalVoice();
  if (voice) utterance.voice = voice;
}

function clearGapTimer() {
  if (gapTimer) {
    clearTimeout(gapTimer);
    gapTimer = null;
  }
}

function resetQueueState() {
  clearGapTimer();
  queue = [];
  queueIndex = 0;
  pausedBetweenChunks = false;
  applicationPaused = false;
  longFormSession = false;
  chunkAudiblyStarted = false;
}

function speakNextChunk() {
  if (!("speechSynthesis" in window)) return;
  clearGapTimer();
  pausedBetweenChunks = false;
  chunkAudiblyStarted = false;

  if (queueIndex >= queue.length) {
    resetQueueState();
    notify();
    return;
  }

  const sessionAtStart = playbackSessionId;
  const text = queue[queueIndex];
  const utterance = new SpeechSynthesisUtterance(text);
  applyNaturalUtterance(utterance);

  utterance.onstart = () => {
    if (sessionAtStart !== playbackSessionId) return;
    chunkAudiblyStarted = true;
    notify();
  };

  utterance.onend = () => {
    if (sessionAtStart !== playbackSessionId) return;
    chunkAudiblyStarted = false;
    queueIndex += 1;
    if (queueIndex >= queue.length) {
      resetQueueState();
      notify();
      return;
    }
    gapTimer = setTimeout(() => {
      gapTimer = null;
      if (!pausedBetweenChunks && !applicationPaused) speakNextChunk();
      notify();
    }, GAP_MS);
    notify();
  };

  utterance.onerror = () => {
    if (sessionAtStart !== playbackSessionId) return;
    chunkAudiblyStarted = false;
    queueIndex += 1;
    if (queueIndex >= queue.length) {
      resetQueueState();
    } else {
      speakNextChunk();
    }
    notify();
  };

  window.speechSynthesis.speak(utterance);
  notify();
  // Some engines set `speaking` / fire onstart on the next tick
  requestAnimationFrame(() => notify());
  setTimeout(() => notify(), 120);
}

/** Stop all speech and clear queued passages */
export function stopPlayback() {
  if (!("speechSynthesis" in window)) return;
  playbackSessionId += 1;
  window.speechSynthesis.cancel();
  resetQueueState();
  notify();
}

/**
 * Pause long-form playback. Uses cancel + preserved queue so it works on Safari (no reliable pause()).
 */
export function pausePlayback() {
  if (!("speechSynthesis" in window)) return;
  if (!longFormSession || queue.length === 0) return;

  const synth = window.speechSynthesis;
  const hasMoreToRead = queueIndex < queue.length;
  const inProgress =
    synth.speaking || gapTimer !== null || chunkAudiblyStarted || hasMoreToRead;

  if (!inProgress) return;

  playbackSessionId += 1;
  synth.cancel();
  clearGapTimer();
  pausedBetweenChunks = false;
  chunkAudiblyStarted = false;
  applicationPaused = true;
  notify();
}

/** Resume after app-level or gap pause */
export function resumePlayback() {
  if (!("speechSynthesis" in window)) return;

  if (applicationPaused) {
    applicationPaused = false;
    if (queueIndex < queue.length) speakNextChunk();
    else resetQueueState();
    notify();
    return;
  }

  const synth = window.speechSynthesis;
  if (synth.paused) {
    synth.resume();
    notify();
    return;
  }

  if (pausedBetweenChunks && queueIndex < queue.length) {
    pausedBetweenChunks = false;
    speakNextChunk();
  }
}

export interface SpeakSequenceOptions {
  /** If true, UI may show Pause / Stop (paragraphs, long documents) */
  longForm?: boolean;
}

/**
 * Queue phrases and speak in order. Cancels any current speech.
 */
export function speakSequence(parts: string[], options?: SpeakSequenceOptions) {
  if (!("speechSynthesis" in window)) return;

  const cleaned = parts.map((p) => p.trim()).filter(Boolean);
  if (cleaned.length === 0) return;

  window.speechSynthesis.cancel();
  clearGapTimer();
  playbackSessionId += 1;

  queue = cleaned;
  queueIndex = 0;
  pausedBetweenChunks = false;
  applicationPaused = false;
  chunkAudiblyStarted = false;
  longFormSession = options?.longForm ?? false;

  // Voices often load asynchronously (especially Chrome)
  window.speechSynthesis.getVoices();
  speakNextChunk();
}

export function speak(text: string) {
  speakSequence([text], { longForm: false });
}

/**
 * Extract example word from labels like "/æ/ as in 'cat'" or `/ʃ/ as in "shop"`.
 */
export function extractExampleWord(soundLabel: string): string | undefined {
  const m = soundLabel.match(/as in\s+['"]([^'"]+)['"]/i);
  return m?.[1]?.trim();
}

/**
 * Build short phrases for phonics intro (avoids TTS reading raw IPA like "slash ae slash").
 */
export function buildPhonicsIntroParts(letter: string, soundLabel: string): string[] {
  const example = extractExampleWord(soundLabel);
  const L = letter.trim().toUpperCase();

  if (letter.length > 1) {
    if (example) {
      return [
        `This lesson is about a sound you hear in the word ${example}.`,
        `Listen: ${example}.`,
      ];
    }
    return [`This lesson is about the ${L} sound.`];
  }

  if (example) {
    return [
      `Letter ${L}.`,
      `This sound is like the vowel you hear in ${example}.`,
      `${example}.`,
    ];
  }

  return [`Letter ${L}.`, "Listen to how this letter sounds in words."];
}

/** Break a long passage into sentences for clearer TTS pauses. */
export function passageToSpeechParts(passage: string): string[] {
  const chunks = passage
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return chunks.length ? chunks : [passage.trim()];
}

/** Prime voice list (call once from app root if needed) */
export function primeSpeechVoices() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}
