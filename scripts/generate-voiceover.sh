#!/bin/sh
# Generates the Russian voiceover lines for BearKitchen via macOS's built-in
# `say` command (Milena voice) and converts each to a 16-bit PCM WAV.
# macOS only. Run with: npm run generate-voiceover
set -e

OUT_DIR="$(dirname "$0")/../public/audio"
mkdir -p "$OUT_DIR"

generate() {
  name="$1"
  text="$2"
  say -v Milena -o "$OUT_DIR/$name.aiff" "$text"
  afconvert -f WAVE -d LEI16@44100 -c 1 "$OUT_DIR/$name.aiff" "$OUT_DIR/$name.wav"
  rm "$OUT_DIR/$name.aiff"
  afinfo "$OUT_DIR/$name.wav" | grep -E "estimated duration"
}

# Main line: the bear turns to the camera mid-dishwashing.
generate voiceover "Отлично, тепленькая пошла"

# Gag 1: the kettle blasts the bear with steam.
generate voiceover-gag1 "Какая гадость, эта ваша геркулесовая каша"

# Gag 2: the borsch pot overflows and lands on the bear's head.
generate voiceover-gag2 "Танцуют все!"

# Gag 3: a cabinet avalanche buries the bear in jars and cans.
generate voiceover-gag3 "Кто ж его посудит, он же кухонный"
