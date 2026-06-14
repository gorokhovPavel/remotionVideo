// The video is a Series of self-contained shots. Each shot's frame numbers
// are relative to its own start — Remotion's <Series.Sequence> handles the
// offsetting, so these constants never need to know about each other.

export const MAIN_SCENE = {
  durationInFrames: 540,
  // The bear turns from the sink to face the camera
  turnToCameraStart: 195,
  turnDuration: 30,
  // The spoken line, synced to public/audio/voiceover.wav (~1.98s)
  voiceoverStart: 235,
  voiceoverDuration: 60,
  // The bear turns back to the sink and resumes washing
  turnBackStart: 330,
  // Humming begins once the bear is back at the sink
  humStart: 360,
} as const;

// Gag 1 — the kettle finally boils over and blasts the bear in the face.
// Punchline synced to public/audio/voiceover-gag1.wav (~2.95s).
export const GAG1 = {
  durationInFrames: 160,
  blastStart: 40,
  blastDuration: 14,
  voiceoverStart: 56,
  voiceoverDuration: 92,
} as const;

// Gag 2 — the borsch erupts, lands on the bear's head like a hat, and he
// breaks into a spin. Punchline synced to public/audio/voiceover-gag2.wav
// (~0.91s).
export const GAG2 = {
  durationInFrames: 130,
  eruptStart: 30,
  eruptDuration: 14,
  voiceoverStart: 46,
  voiceoverDuration: 32,
} as const;

// Gag 3 — a shelf's worth of jars and cans avalanches onto the bear.
// Punchline synced to public/audio/voiceover-gag3.wav (~2.39s).
export const GAG3 = {
  durationInFrames: 170,
  fallStart: 12,
  fallDuration: 22,
  voiceoverStart: 50,
  voiceoverDuration: 75,
} as const;

export const TIMING = {
  totalDuration:
    MAIN_SCENE.durationInFrames +
    GAG1.durationInFrames +
    GAG2.durationInFrames +
    GAG3.durationInFrames,
} as const;
