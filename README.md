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
- **BearCleaning** — a comedic short (~44s) about Boris the bear wreaking
  havoc on chores in a too-small apartment. Built from 6 shots
  (`src/widgets/bear-cleaning/`) — cabinet crash, dishwashing flood, vacuum
  chaos, washing machine rebellion, baking catastrophe, and the aftermath —
  with a shared `Bear` entity, animated titles, and background music/SFX.

## Project structure

This project follows a Feature-Sliced Design (FSD) layout:

- `src/app/` — entry point and root composition registration.
- `src/pages/` — top-level Remotion compositions (`BearCleaning`, `TitleCard`).
- `src/widgets/` — composite scene blocks (the `BearCleaning` shots).
- `src/entities/` — reusable domain pieces (`Bear`, `Logo`).
- `src/shared/` — cross-cutting design tokens and UI (`colors`, `fonts`, `AnimatedTitle`).

## Commands

**Install Dependencies**

```console
npm install
```

**Start Preview**

```console
npm run dev
```

Open the Studio and pick a composition (e.g. `BearCleaning`) from the
sidebar to preview it with audio.

**Render video**

```console
npx remotion render BearCleaning out/bear-cleaning.mp4
```

**Regenerate audio (music + SFX)**

```console
npm run generate-audio
```

This runs `scripts/generate-audio.mjs`, which synthesizes
`public/audio/*.wav` (background music, splash, vacuum, crash, ta-da) from
scratch. Rendering itself is fully deterministic — the video output won't
change between runs unless the audio is regenerated or the source code
changes.

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
