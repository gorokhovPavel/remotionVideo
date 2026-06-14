# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Compositions

- **TitleCard** / **OnlyLogo** — default Remotion starter scenes.
- **BearKitchen** — a ~33s scene of Boris the bear in a nostalgic Soviet-era
  kitchen, beside a boiling kettle and a bubbling pot of borsch:
  1. He washes dishes with his back to camera, turns to say "Отлично,
     тепленькая пошла", then goes back to scrubbing — humming a tune.
  2. The kettle finally boils over and blasts him with steam; he turns to
     camera, soot-faced and deadpan: "Какая гадость, эта ваша геркулесовая
     каша!"
  3. The borsch erupts, lands on his head like a beret, and he breaks into a
     happy spin: "Танцуют все!"
  4. A shelf's worth of jars, cans, and plates avalanches onto him; he
     emerges dazed, surrounded by spinning stars: "Кто ж его посудит, он же
     кухонный!"

## Project structure

This project follows a Feature-Sliced Design (FSD) layout:

- `src/app/` — entry point and root composition registration.
- `src/pages/` — top-level Remotion compositions (`BearKitchen`, `TitleCard`).
- `src/widgets/` — the individual shots that make up `BearKitchen`
  (`MainScene`, `Gag1Steam`, `Gag2Dance`, `Gag3Avalanche`) plus shared pieces
  like `Caption` and `VintageOverlay`.
- `src/entities/` — reusable domain pieces (`Bear`/`BearBack`, `Kitchen`, `Logo`).
- `src/shared/` — cross-cutting design tokens (`colors`, `fonts`).

## Commands

**Install Dependencies**

```console
npm install
```

**Start Preview**

```console
npm run dev
```

Open the Studio and pick a composition (e.g. `BearKitchen`) from the
sidebar to preview it with audio.

**Render video**

```console
npx remotion render BearKitchen out/bear-kitchen.mp4
```

**Regenerate ambient audio and sound effects**

```console
npm run generate-audio
```

This runs `scripts/generate-audio.mjs`, which synthesizes the ambient loops
(`kettle-hiss.wav`, `borsch-bubble.wav`, `hum.wav`) and the gag sound effects
(`steam-blast.wav`, `pot-overflow.wav`, `jar-crash.wav`) from scratch.

**Regenerate the Russian voiceover lines (macOS only)**

```console
npm run generate-voiceover
```

This runs `scripts/generate-voiceover.sh`, which uses macOS's built-in `say`
(Milena voice) to synthesize the bear's spoken lines: `voiceover.wav`
("Отлично, тепленькая пошла"), and the punchlines for each gag
(`voiceover-gag1.wav`, `voiceover-gag2.wav`, `voiceover-gag3.wav`). Rendering
itself is fully deterministic — the video output won't change between runs
unless the audio is regenerated or the source code changes.

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
