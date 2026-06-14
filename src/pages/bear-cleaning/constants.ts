export const SHOT_DURATIONS = {
  shot1: 150,
  shot2: 270,
  shot3: 210,
  shot5: 210,
  shot6: 210,
  shot4: 270,
} as const;

export const TOTAL_DURATION =
  SHOT_DURATIONS.shot1 +
  SHOT_DURATIONS.shot2 +
  SHOT_DURATIONS.shot3 +
  SHOT_DURATIONS.shot5 +
  SHOT_DURATIONS.shot6 +
  SHOT_DURATIONS.shot4;
