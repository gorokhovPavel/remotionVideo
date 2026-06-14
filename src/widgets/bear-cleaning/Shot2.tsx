import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Bear } from "../../entities/bear/Bear";
import { AnimatedTitle } from "../../shared/ui/AnimatedTitle";
import { COLORS } from "../../shared/colors";

const BUBBLES = [
  { left: "30%", size: 26, phase: 0 },
  { left: "38%", size: 18, phase: 1.2 },
  { left: "46%", size: 32, phase: 2.4 },
  { left: "58%", size: 22, phase: 0.6 },
  { left: "66%", size: 28, phase: 3.1 },
  { left: "72%", size: 16, phase: 1.8 },
  { left: "34%", size: 14, phase: 4.2 },
  { left: "62%", size: 14, phase: 2.9 },
];

const TILE_PATTERN = `repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 90px), repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 90px)`;

export const Shot2: React.FC = () => {
  const frame = useCurrentFrame();

  // Paw scrubbing furiously
  const scrub = Math.sin(frame / 3) * 12;
  const scrubRotate = Math.sin(frame / 3) * 24;

  // Foam slowly fills the kitchen
  const foamHeight = interpolate(frame, [0, 270], [40, 420], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const foamWobble = Math.sin(frame / 8) * 6;

  // Repeating water splash
  const splashCycle = frame % 25;
  const splashOpacity = interpolate(splashCycle, [0, 4, 14, 25], [0, 1, 1, 0]);
  const splashY = interpolate(splashCycle, [0, 25], [0, -60], {
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: "hidden" }}>
      <Audio src={staticFile("audio/splash.wav")} volume={0.5} />
      <Sequence from={130}>
        <Audio src={staticFile("audio/splash.wav")} volume={0.4} />
      </Sequence>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${COLORS.wall} 0%, ${COLORS.wall} 65%, ${COLORS.floor} 65%, ${COLORS.floor} 100%)`,
        }}
      />

      {/* Tiled splashback behind the sink */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 640,
          height: 460,
          backgroundImage: TILE_PATTERN,
          backgroundColor: COLORS.wallDark,
          opacity: 0.5,
        }}
      />

      {/* Faucet */}
      <div
        style={{
          position: "absolute",
          bottom: 300,
          left: "50%",
          transform: "translateX(-90px)",
          width: 18,
          height: 90,
          backgroundColor: COLORS.metal,
          borderRadius: 8,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 380,
          left: "50%",
          transform: "translateX(-90px)",
          width: 100,
          height: 18,
          backgroundColor: COLORS.metal,
          borderRadius: "8px 8px 0 0 / 8px 8px 0 0",
        }}
      />

      {/* Sink */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 520,
          height: 220,
          backgroundColor: "#D8D8D8",
          borderRadius: "24px 24px 0 0",
          border: `6px solid ${COLORS.metal}`,
        }}
      />

      {/* Floating bubbles */}
      {BUBBLES.map(({ left, size, phase }, i) => {
        const bob = Math.sin(frame / 12 + phase) * 10;
        const bubbleOpacity = interpolate(frame, [0, 60], [0, 0.9], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 380 - (foamHeight - 40) * 0.6,
              left,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.9)",
              opacity: bubbleOpacity,
              transform: `translateY(${bob}px)`,
            }}
          />
        );
      })}

      {/* Foam flooding the kitchen */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: `translate(-50%, ${foamWobble}px)`,
          width: "120%",
          height: foamHeight,
          backgroundColor: COLORS.white,
          borderRadius: "50% 50% 0 0 / 60px 60px 0 0",
          boxShadow: `0 0 60px rgba(255,255,255,0.9)`,
        }}
      />

      {/* Rubber duck, bobbing along on top of the rising foam */}
      <div
        style={{
          position: "absolute",
          bottom: foamHeight - 20,
          left: "30%",
          fontSize: 40,
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${Math.sin(frame / 14) * 12}px) rotate(${
            Math.sin(frame / 20) * 10
          }deg)`,
        }}
      >
        🦆
      </div>

      {/* Bear scrubbing a single plate */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Bear
          rightArmStyle={{
            transform: `translate(${scrub}px, ${-scrub}px) rotate(${scrubRotate}deg)`,
          }}
        />
      </div>

      {/* Water splash */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: "62%",
          fontSize: 56,
          opacity: splashOpacity,
          transform: `translateY(${splashY}px)`,
        }}
      >
        💦
      </div>

      <AnimatedTitle
        text="ЧИСТОТА — ЭТО КОЛИЧЕСТВО ПЕНЫ"
        delay={40}
        top={70}
        color={COLORS.apron}
        fontSize={56}
        font="fredoka"
        variant="typewriter"
      />
    </AbsoluteFill>
  );
};
