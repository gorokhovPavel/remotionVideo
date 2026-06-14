import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bear } from "../../entities/bear/Bear";
import { AnimatedTitle } from "../../shared/ui/AnimatedTitle";
import { COLORS } from "../../shared/colors";

const DUST_PARTICLES = [0, 1, 2, 3, 4];
const FALLING_ITEMS = [
  { emoji: "🥫", left: 170, delayFrames: 58 },
  { emoji: "🫙", left: 260, delayFrames: 64 },
];

export const Shot1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bear squeezes in from the cabinet, then a final shove pops it forward
  const enter = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1.2 },
  });
  const bearX = interpolate(enter, [0, 1], [-360, 0]);

  // Door frame cracks on impact around frame 60
  const impact = spring({
    frame: frame - 60,
    fps,
    config: { damping: 6, stiffness: 300 },
  });
  const doorRotate = interpolate(impact, [0, 1], [0, -8]);

  const dustOpacity = (i: number) =>
    interpolate(
      frame,
      [55 + i * 6, 65 + i * 6, 100 + i * 6],
      [0, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  const dustY = (i: number) =>
    interpolate(frame, [55 + i * 6, 110 + i * 6], [0, -90], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // A startled mouse darts out from the cabinet wreckage and across the floor
  const mouseX = interpolate(frame, [75, 145], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const mouseHop = Math.abs(Math.sin(frame / 3)) * 14;
  const mouseOpacity = interpolate(frame, [75, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={55}>
        <Audio src={staticFile("audio/crash.wav")} volume={0.7} />
      </Sequence>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${COLORS.wall} 0%, ${COLORS.wall} 65%, ${COLORS.floor} 65%, ${COLORS.floor} 100%)`,
        }}
      />

      {/* Wallpaper accent stripe */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          width: "100%",
          height: 24,
          backgroundColor: COLORS.wallDark,
          opacity: 0.6,
        }}
      />

      {/* Cabinet door frame, cracking on impact */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 120,
          width: 360,
          height: 600,
          border: `14px solid ${COLORS.cabinet}`,
          borderRadius: 16,
          transform: `rotate(${doorRotate}deg)`,
          transformOrigin: "top left",
        }}
      >
        {/* Raised door panel */}
        <div
          style={{
            position: "absolute",
            inset: 26,
            border: `8px solid ${COLORS.cabinet}`,
            borderRadius: 10,
            opacity: 0.7,
          }}
        />
        {/* Handle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 18,
            width: 14,
            height: 70,
            backgroundColor: COLORS.metalDark,
            borderRadius: 6,
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {/* Bear shoving its way out */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translate(calc(-50% + ${bearX}px), 0) rotate(${interpolate(
            enter,
            [0, 1],
            [-6, 0],
          )}deg)`,
        }}
      >
        <Bear />
      </div>

      {/* Tins tumbling out of the cabinet */}
      {FALLING_ITEMS.map(({ emoji, left, delayFrames }, i) => {
        const fall = spring({
          frame: frame - delayFrames,
          fps,
          config: { damping: 7, stiffness: 120 },
        });
        const y = interpolate(fall, [0, 1], [-40, 520]);
        const rotate = interpolate(fall, [0, 1], [0, i % 2 === 0 ? 240 : -240]);

        return (
          <div
            key={emoji}
            style={{
              position: "absolute",
              top: 160,
              left,
              fontSize: 48,
              transform: `translateY(${y}px) rotate(${rotate}deg)`,
            }}
          >
            {emoji}
          </div>
        );
      })}

      {/* A mouse, equally startled, makes a run for it */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          fontSize: 36,
          opacity: mouseOpacity,
          transform: `translate(${mouseX}px, ${-mouseHop}px) scaleX(-1)`,
        }}
      >
        🐭
      </div>

      {/* Dust / debris from the impact */}
      {DUST_PARTICLES.map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 200 + i * 14,
            left: 140 + i * 50,
            width: 14,
            height: 14,
            backgroundColor: COLORS.cabinet,
            borderRadius: "50%",
            opacity: dustOpacity(i),
            transform: `translateY(${dustY(i)}px)`,
          }}
        />
      ))}

      <AnimatedTitle
        text="БОРИС НА СМЕНЕ"
        delay={20}
        top={60}
        color={COLORS.accentRed}
        fontSize={84}
        font="bangers"
        variant="pop"
      />
    </AbsoluteFill>
  );
};
