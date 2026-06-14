// Procedurally synthesizes the background music and sound effects for the
// BearCleaning video into public/audio/*.wav. Run with: npm run generate-audio
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

const triangleWave = (phase) => 2 * Math.abs(2 * (phase - Math.floor(phase + 0.5))) - 1;
const sawWave = (phase) => 2 * (phase - Math.floor(phase + 0.5));

/** Adds a decaying note into an existing sample buffer (additive synthesis). */
function addNote(samples, startTime, duration, freq, amp, wave = "triangle", decay = 4) {
  const startSample = Math.floor(startTime * SAMPLE_RATE);
  const numSamples = Math.floor(duration * SAMPLE_RATE);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx < 0 || idx >= samples.length) continue;

    const t = i / SAMPLE_RATE;
    const env = Math.exp(-decay * t);
    const phase = (freq * t) % 1;
    let w;
    if (wave === "triangle") w = triangleWave(phase);
    else if (wave === "saw") w = sawWave(phase);
    else w = Math.sin(2 * Math.PI * freq * t);

    samples[idx] += w * env * amp;
  }
}

function noiseBurst(duration, decay, amp) {
  const n = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    samples[i] = (Math.random() * 2 - 1) * Math.exp(-decay * t) * amp;
  }
  return samples;
}

const NOTES = {
  C3: 130.81,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  A4: 440.0,
  C5: 523.25,
  E5: 659.25,
};

// ---------------------------------------------------------------------------
// Background music: bouncy 8-second pentatonic loop (Remotion loops it)
// ---------------------------------------------------------------------------
{
  const BPM = 120;
  const beat = 60 / BPM; // 0.5s
  const eighth = beat / 2; // 0.25s
  const bars = 4;
  const duration = bars * 4 * beat; // 8s
  const music = new Float32Array(Math.floor(duration * SAMPLE_RATE));

  // Bouncy pentatonic walk, 8 eighth-notes per bar
  const melody = [
    "C4", "E4", "G4", "E4", "A4", "G4", "E4", "D4",
    "C4", "D4", "E4", "G4", "E4", "C4", "D4", "E4",
    "G4", "E4", "C5", "A4", "G4", "E4", "D4", "C4",
    "E4", "G4", "A4", "G4", "E4", "D4", "C4", null,
  ];

  melody.forEach((note, i) => {
    if (!note) return;
    addNote(music, i * eighth, eighth * 1.6, NOTES[note], 0.32, "triangle", 6);
  });

  // Soft "boom-chick" bass on beats 1 and 3 of every bar
  for (let bar = 0; bar < bars; bar++) {
    addNote(music, bar * 4 * beat, beat * 0.9, NOTES.C3, 0.22, "sine", 3);
    addNote(music, bar * 4 * beat + 2 * beat, beat * 0.9, NOTES.C3, 0.18, "sine", 3);
  }

  writeWav(path.join(OUT_DIR, "bg-music.wav"), music);
}

// ---------------------------------------------------------------------------
// Splash: noise burst + a couple of high "droplet" blips
// ---------------------------------------------------------------------------
{
  const splash = noiseBurst(0.4, 10, 0.5);
  addNote(splash, 0.05, 0.15, 1400, 0.3, "sine", 25);
  addNote(splash, 0.15, 0.15, 1900, 0.25, "sine", 25);
  writeWav(path.join(OUT_DIR, "splash.wav"), splash);
}

// ---------------------------------------------------------------------------
// Vacuum: struggling motor hum (sawtooth + noise + tremolo, fades in/out)
// ---------------------------------------------------------------------------
{
  const duration = 3;
  const n = Math.floor(duration * SAMPLE_RATE);
  const vacuum = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const tremolo = 1 + 0.3 * Math.sin(2 * Math.PI * 8 * t);
    const motor = sawWave((90 * t) % 1) * 0.25;
    const hiss = (Math.random() * 2 - 1) * 0.12;
    const fade = Math.min(t / 0.15, (duration - t) / 0.15, 1);
    vacuum[i] = (motor + hiss) * tremolo * fade;
  }

  writeWav(path.join(OUT_DIR, "vacuum.wav"), vacuum);
}

// ---------------------------------------------------------------------------
// Crash: bright noise burst + descending low-end thud (door impact)
// ---------------------------------------------------------------------------
{
  const crash = noiseBurst(0.35, 9, 0.55);
  for (let i = 0; i < crash.length; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 220 - 160 * Math.min(t / 0.2, 1);
    crash[i] += Math.sin(2 * Math.PI * freq * t) * Math.exp(-8 * t) * 0.5;
  }
  writeWav(path.join(OUT_DIR, "crash.wav"), crash);
}

// ---------------------------------------------------------------------------
// Ta-da: rising arpeggio ending on a held chord (final reveal)
// ---------------------------------------------------------------------------
{
  const duration = 1.2;
  const tada = new Float32Array(Math.floor(duration * SAMPLE_RATE));

  addNote(tada, 0, 0.18, NOTES.C4, 0.4, "triangle", 3);
  addNote(tada, 0.15, 0.18, NOTES.E4, 0.4, "triangle", 3);
  addNote(tada, 0.3, 0.18, NOTES.G4, 0.4, "triangle", 3);
  addNote(tada, 0.45, 0.7, NOTES.C5, 0.4, "triangle", 2.5);
  addNote(tada, 0.45, 0.7, NOTES.E5, 0.25, "triangle", 2.5);

  writeWav(path.join(OUT_DIR, "tada.wav"), tada);
}

// ---------------------------------------------------------------------------
// Machine rumble: a washing machine bouncing across the floor (loopable)
// ---------------------------------------------------------------------------
{
  const duration = 2; // 8 thumps at 0.25s each, loops cleanly
  const n = Math.floor(duration * SAMPLE_RATE);
  const rumble = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const thumpPhase = t % 0.25;
    const thumpEnv = Math.exp(-32 * thumpPhase);
    const thud = Math.sin(2 * Math.PI * 55 * t) * thumpEnv * 0.6;
    const rattle = (Math.random() * 2 - 1) * thumpEnv * 0.25;
    rumble[i] = thud + rattle;
  }

  writeWav(path.join(OUT_DIR, "machine-rumble.wav"), rumble);
}

// ---------------------------------------------------------------------------
// Alarm: shrill smoke-detector beeping (loopable)
// ---------------------------------------------------------------------------
{
  const duration = 1; // two beeps, loops cleanly
  const n = Math.floor(duration * SAMPLE_RATE);
  const alarm = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const beepOn = (t % 0.5) < 0.22;
    const square = Math.sign(Math.sin(2 * Math.PI * 1300 * t));
    alarm[i] = beepOn ? square * 0.28 : 0;
  }

  writeWav(path.join(OUT_DIR, "alarm.wav"), alarm);
}
