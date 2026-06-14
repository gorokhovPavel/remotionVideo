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

const SHAKE_START = 35;
const SUDS = [0, 1, 2, 3];

export const Shot5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // A single sock gets dropped into the machine
  const sockDrop = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const sockY = interpolate(sockDrop, [0, 1], [-60, 40]);
  const sockOpacity = interpolate(frame, [20, 28], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bear presses the start button
  const buttonPress = spring({
    frame: frame - 28,
    fps,
    config: { damping: 6, stiffness: 300 },
  });
  const buttonScale = interpolate(buttonPress, [0, 1], [1, 0.8]);

  // The machine shakes more and more violently
  const shakeAmp = interpolate(frame, [SHAKE_START, 120], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeRotate = Math.sin(frame * 1.2) * shakeAmp;

  // ...then breaks free and hops across the kitchen
  const escapeProgress = interpolate(frame, [120, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const hopHeight = Math.abs(Math.sin(frame * 0.9)) * (40 + escapeProgress * 60);
  const slideX = escapeProgress * -420;

  // Bear gives chase, lagging behind
  const bearChase = interpolate(frame, [130, 210], [0, -260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera rattles once the chase begins
  const camShakeX = Math.sin(frame * 1.5) * escapeProgress * 4;
  const camShakeY = Math.cos(frame * 1.7) * escapeProgress * 4;

  const spinRotate = frame * 12;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        transform: `translate(${camShakeX}px, ${camShakeY}px)`,
        overflow: "hidden",
      }}
    >
      <Sequence from={SHAKE_START}>
        <Audio src={staticFile("audio/machine-rumble.wav")} volume={0.5} loop />
      </Sequence>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${COLORS.wall} 0%, ${COLORS.wall} 65%, ${COLORS.floor} 65%, ${COLORS.floor} 100%)`,
        }}
      />

      {/* Washing machine */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "38%",
          transform: `translate(${slideX}px, ${-hopHeight}px) rotate(${shakeRotate}deg)`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 200,
            height: 240,
            backgroundColor: COLORS.metal,
            borderRadius: 16,
            border: `4px solid ${COLORS.outline}`,
          }}
        >
          {/* Control panel */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 20,
              width: 160,
              height: 24,
              backgroundColor: COLORS.metalDark,
              borderRadius: 6,
            }}
          />
          {/* Start button */}
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 30,
              width: 16,
              height: 16,
              backgroundColor: COLORS.apron,
              borderRadius: "50%",
              transform: `scale(${buttonScale})`,
            }}
          />
          {/* Porthole */}
          <div
            style={{
              position: "absolute",
              top: 60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: COLORS.wallDark,
              border: `10px solid ${COLORS.metalDark}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: 40,
                opacity: frame > 30 ? 1 : 0,
                transform: `translate(-50%, -50%) rotate(${spinRotate}deg)`,
              }}
            >
              🧦
            </div>
          </div>
          {/* Legs */}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: 16,
              width: 24,
              height: 16,
              backgroundColor: COLORS.metalDark,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -10,
              right: 16,
              width: 24,
              height: 16,
              backgroundColor: COLORS.metalDark,
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      {/* The doomed sock, dropping in */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: "46%",
          fontSize: 36,
          opacity: sockOpacity,
          transform: `translateY(${sockY}px)`,
        }}
      >
        🧦
      </div>

      {/* Suds leaking from the seam during the great escape */}
      {SUDS.map((i) => {
        const cycle = (frame + i * 9) % 20;
        const op = interpolate(cycle, [0, 4, 16, 20], [0, 0.9, 0.9, 0]);
        const dx = interpolate(cycle, [0, 20], [0, (i % 2 === 0 ? 1 : -1) * 60]);
        const dy = interpolate(cycle, [0, 20], [0, -50]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 200,
              left: `calc(38% + ${slideX + 100}px)`,
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: COLORS.white,
              opacity: escapeProgress > 0 ? op : 0,
              transform: `translate(${dx}px, ${dy}px)`,
            }}
          />
        );
      })}

      {/* Bear, giving chase */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "60%",
          transform: `translateX(${bearChase}px)`,
        }}
      >
        <Bear
          rightArmStyle={{
            transform: `translate(${escapeProgress > 0 ? -20 : 0}px, ${
              escapeProgress > 0 ? -10 : 0
            }px) rotate(${escapeProgress * 30}deg)`,
          }}
          leftArmStyle={{
            transform: `translate(${escapeProgress > 0 ? 20 : 0}px, ${
              escapeProgress > 0 ? -10 : 0
            }px) rotate(${-escapeProgress * 30}deg)`,
          }}
        />
      </div>

      <AnimatedTitle
        text="ДЕЛИКАТНАЯ СТИРКА"
        delay={10}
        top={60}
        color={COLORS.accentRed}
        fontSize={76}
        font="bangers"
        variant="pop"
      />
      <AnimatedTitle
        text="РЕЖИМ: ПОБЕГ"
        delay={130}
        top={850}
        color={COLORS.accentStrongRed}
        fontSize={56}
        font="bangers"
        variant="slideIn"
      />
    </AbsoluteFill>
  );
};
