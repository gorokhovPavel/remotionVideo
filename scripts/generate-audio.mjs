// Procedurally synthesizes the ambient kitchen sounds and humming tune for
// the BearKitchen video into public/audio/*.wav. Run with: npm run generate-audio
//
// The Russian voiceover line (public/audio/voiceover.wav) is generated
// separately via macOS `say` — see scripts/generate-voiceover.sh.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "audio");
const SAMPLE_RATE = 44100;

fs.mkdirSync(OUT_DIR, { recursive: true });

/** @param {Float32Array} samples */
function writeWav(filePath, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write("RIFF", 0, "ascii");
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8, "ascii");
  buffer.write("fmt ", 12, "ascii");
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36, "ascii");
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }

  fs.writeFileSync(filePath, buffer);
  console.log(`Wrote ${path.relative(process.cwd(), filePath)} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

/** Soft low-pass filtered white noise (steam / rumble texture). */
function lowpassNoise(n, alpha) {
  const out = new Float32Array(n);
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const white = Math.random() * 2 - 1;
    prev = alpha * prev + (1 - alpha) * white;
    out[i] = prev;
  }
  return out;
}

const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  A4: 440.0,
  C5: 523.25,
};

/** A warm, "hummed" note: sine + faint harmonic, vibrato, soft attack/release. */
function addHumNote(samples, startTime, duration, freq, amp) {
  const startSample = Math.floor(startTime * SAMPLE_RATE);
  const numSamples = Math.floor(duration * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx < 0 || idx >= samples.length) continue;

    const t = i / SAMPLE_RATE;
    const vibrato = 1 + Math.sin(2 * Math.PI * 5 * t) * 0.01;
    const f = freq * vibrato;
    const attack = Math.min(t / 0.05, 1);
    const release = Math.min((duration - t) / 0.08, 1);
    const env = Math.max(0, Math.min(attack, release));
    const main = Math.sin(2 * Math.PI * f * t);
    const harmonic = Math.sin(2 * Math.PI * f * 2 * t) * 0.15;

    samples[idx] += (main + harmonic) * env * amp;
  }
}

// ---------------------------------------------------------------------------
// Kettle hiss: soft steam whistle, loopable
// ---------------------------------------------------------------------------
{
  const duration = 2;
  const n = Math.floor(duration * SAMPLE_RATE);
  const hiss = lowpassNoise(n, 0.96);

  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const breath = 0.7 + 0.3 * Math.sin(2 * Math.PI * 0.6 * t);
    const whistle =
      Math.sin(2 * Math.PI * 1900 * t) *
      (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.6 * t)) *
      0.05;
    hiss[i] = hiss[i] * 0.18 * breath + whistle;
  }

  writeWav(path.join(OUT_DIR, "kettle-hiss.wav"), hiss);
}

// ---------------------------------------------------------------------------
// Borsch bubble: gentle simmering pot, occasional "plop" bubbles, loopable
// ---------------------------------------------------------------------------
{
  const duration = 2.5;
  const n = Math.floor(duration * SAMPLE_RATE);
  const pot = lowpassNoise(n, 0.9);
  for (let i = 0; i < n; i++) pot[i] *= 0.05;

  const bubbleTimes = [0.1, 0.5, 0.78, 1.15, 1.5, 1.85, 2.15, 2.35];
  for (const start of bubbleTimes) {
    const startFreq = 160 + Math.random() * 60;
    const startSample = Math.floor(start * SAMPLE_RATE);
    const len = Math.floor(0.09 * SAMPLE_RATE);
    for (let i = 0; i < len; i++) {
      const idx = startSample + i;
      if (idx >= n) continue;
      const t = i / SAMPLE_RATE;
      const freq = startFreq * (1 - t / 0.09) + 60;
      const env = Math.exp(-30 * t);
      pot[idx] += Math.sin(2 * Math.PI * freq * t) * env * 0.35;
    }
  }

  writeWav(path.join(OUT_DIR, "borsch-bubble.wav"), pot);
}

// ---------------------------------------------------------------------------
// Hum: cheerful melodic "mmm" tune, loopable
// ---------------------------------------------------------------------------
{
  const duration = 4;
  const hum = new Float32Array(Math.floor(duration * SAMPLE_RATE));

  const melody = ["G4", "A4", "C5", "A4", "G4", "E4", "D4", "C4"];
  melody.forEach((note, i) => {
    addHumNote(hum, i * 0.5, 0.35, NOTES[note], 0.28);
  });

  writeWav(path.join(OUT_DIR, "hum.wav"), hum);
}

// ---------------------------------------------------------------------------
// Steam blast: a sharp burst of escaping steam (Gag 1 — the kettle erupts)
// ---------------------------------------------------------------------------
{
  const duration = 1.1;
  const n = Math.floor(duration * SAMPLE_RATE);
  const blast = lowpassNoise(n, 0.9);

  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.sin(Math.min(1, t / 0.08) * (Math.PI / 2)) * Math.exp(-1.6 * t);
    const whistle = Math.sin(2 * Math.PI * (2400 - t * 600) * t) * 0.18 * env;
    blast[i] = blast[i] * 0.6 * env + whistle;
  }

  writeWav(path.join(OUT_DIR, "steam-blast.wav"), blast);
}

// ---------------------------------------------------------------------------
// Pot overflow: a bubbling crescendo into a wet splat (Gag 2 — the borsch
// erupts and lands on the bear's head)
// ---------------------------------------------------------------------------
{
  const duration = 1.3;
  const n = Math.floor(duration * SAMPLE_RATE);
  const overflow = lowpassNoise(n, 0.88);
  for (let i = 0; i < n; i++) overflow[i] *= 0.05;

  // Rapid-fire bubbles, building in intensity
  for (let b = 0; b < 14; b++) {
    const start = (b / 14) * 0.7;
    const startFreq = 140 + Math.random() * 80;
    const startSample = Math.floor(start * SAMPLE_RATE);
    const len = Math.floor(0.07 * SAMPLE_RATE);
    const intensity = 0.2 + (b / 14) * 0.6;
    for (let i = 0; i < len; i++) {
      const idx = startSample + i;
      if (idx >= n) continue;
      const t = i / SAMPLE_RATE;
      const freq = startFreq * (1 - t / 0.07) + 50;
      const env = Math.exp(-25 * t);
      overflow[idx] += Math.sin(2 * Math.PI * freq * t) * env * intensity;
    }
  }

  // The final splat
  const splatStart = Math.floor(0.75 * SAMPLE_RATE);
  const splatLen = Math.floor(0.35 * SAMPLE_RATE);
  for (let i = 0; i < splatLen; i++) {
    const idx = splatStart + i;
    if (idx >= n) continue;
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-9 * t);
    overflow[idx] += (Math.random() * 2 - 1) * env * 0.7;
  }

  writeWav(path.join(OUT_DIR, "pot-overflow.wav"), overflow);
}

// ---------------------------------------------------------------------------
// Jar crash: a clatter of jars and cans tumbling onto the bear (Gag 3)
// ---------------------------------------------------------------------------
{
  const duration = 1.3;
  const n = Math.floor(duration * SAMPLE_RATE);
  const crash = new Float32Array(n);

  // Dull thuds for cans landing
  const thuds = [0.05, 0.18, 0.32, 0.5, 0.68, 0.9];
  for (const start of thuds) {
    const startSample = Math.floor(start * SAMPLE_RATE);
    const len = Math.floor(0.12 * SAMPLE_RATE);
    const freq = 90 + Math.random() * 40;
    for (let i = 0; i < len; i++) {
      const idx = startSample + i;
      if (idx >= n) continue;
      const t = i / SAMPLE_RATE;
      const env = Math.exp(-22 * t);
      crash[idx] += Math.sin(2 * Math.PI * freq * t) * env * 0.5;
    }
  }

  // Bright glassy clinks for jars
  const clinks = [0.08, 0.22, 0.4, 0.58, 0.8, 1.0];
  for (const start of clinks) {
    const startSample = Math.floor(start * SAMPLE_RATE);
    const len = Math.floor(0.18 * SAMPLE_RATE);
    const freq = 1800 + Math.random() * 1400;
    for (let i = 0; i < len; i++) {
      const idx = startSample + i;
      if (idx >= n) continue;
      const t = i / SAMPLE_RATE;
      const env = Math.exp(-18 * t);
      crash[idx] += Math.sin(2 * Math.PI * freq * t) * env * 0.25;
    }
  }

  // A wash of noise to tie it all together
  const noise = lowpassNoise(n, 0.85);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    crash[i] += noise[i] * 0.15 * Math.exp(-2.5 * t);
  }

  writeWav(path.join(OUT_DIR, "jar-crash.wav"), crash);
}
