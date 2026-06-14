import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bear } from "../../entities/bear/Bear";
import { AnimatedTitle } from "../../shared/ui/AnimatedTitle";
import { COLORS } from "../../shared/colors";

const DUST_PUFFS = [0, 1, 2, 3, 4, 5];
const MOTION_LINES = [0, 1, 2];

export const Shot3: React.FC = () => {
  const frame = useCurrentFrame();

  // The vacuum drags the bear sideways across the room
  const slide = interpolate(frame, [0, 210], [0, -380], {
    easing: Easing.inOut(Easing.quad),
  });
  const wobble = Math.sin(frame / 6) * 6;

  // Camera shake while the vacuum struggles
  const shakeX = Math.sin(frame * 1.3) * 3;
  const shakeY = Math.cos(frame * 1.7) * 3;

  // A stray sock gets caught and flung past the vacuum's hose
  const sockFly = interpolate(frame, [90, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const sockX = interpolate(sockFly, [0, 1], [0, -260]);
  const sockY = -Math.sin(sockFly * Math.PI) * 220;
  const sockRotate = sockFly * 720;
  const sockOpacity = interpolate(frame, [90, 96, 134, 140], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("audio/vacuum.wav")} volume={0.55} loop />

      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${COLORS.wall} 0%, ${COLORS.wall} 65%, ${COLORS.floor} 65%, ${COLORS.floor} 100%)`,
        }}
      />

      {/* Speed lines streaking behind the bear */}
      {MOTION_LINES.map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 140 + i * 36,
            left: `calc(75% + ${slide * 0.6}px)`,
            width: 160 - i * 30,
            height: 8,
            backgroundColor: COLORS.wallDark,
            borderRadius: 4,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Bear being towed across the floor */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: "60%",
          transform: `translateX(${slide}px) rotate(${wobble}deg)`,
        }}
      >
        <Bear
          rightArmStyle={{
            transform: `translate(50px, -10px) rotate(${wobble * 2}deg)`,
          }}
          leftArmStyle={{
            transform: `translate(${-20 + wobble}px, ${-10 - wobble}px) rotate(${-wobble * 3}deg)`,
          }}
        />
      </div>

      {/* Hose stretching from the bear's apron to the vacuum */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: `calc(60% + ${slide + 180}px)`,
          width: 220,
          height: 14,
          backgroundColor: COLORS.bearFurDark,
          borderRadius: 8,
          transformOrigin: "left center",
          transform: `rotate(${wobble}deg)`,
        }}
      />

      {/* Tiny, mighty vacuum cleaner */}
      <div
        style={{
          position: "absolute",
          bottom: 86,
          left: `calc(60% + ${slide + 380}px)`,
          width: 110,
          height: 76,
          backgroundColor: COLORS.metal,
          borderRadius: 14,
          border: `4px solid ${COLORS.outline}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 40,
            height: 18,
            backgroundColor: COLORS.metalDark,
            borderRadius: 4,
          }}
        />
        {/* Wheels */}
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: 14,
            width: 22,
            height: 22,
            backgroundColor: COLORS.outline,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -10,
            right: 14,
            width: 22,
            height: 22,
            backgroundColor: COLORS.outline,
            borderRadius: "50%",
          }}
        />
      </div>

      {/* A stray sock gets caught in the vacuum's pull and flung into the air */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: `calc(60% + ${slide + 360 + sockX}px)`,
          fontSize: 36,
          opacity: sockOpacity,
          transform: `translateY(${sockY}px) rotate(${sockRotate}deg)`,
        }}
      >
        🧦
      </div>

      {/* Dust puffs kicked up around the vacuum */}
      {DUST_PUFFS.map((i) => {
        const cycle = (frame + i * 7) % 30;
        const opacity = interpolate(cycle, [0, 6, 24, 30], [0, 0.6, 0.6, 0]);
        const rise = interpolate(cycle, [0, 30], [0, -50]);
        const drift = (i % 2 === 0 ? 1 : -1) * interpolate(cycle, [0, 30], [0, 30]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 90 + (i % 3) * 14,
              left: `calc(60% + ${slide + 360 + drift}px)`,
              width: 18 + (i % 3) * 6,
              height: 18 + (i % 3) * 6,
              backgroundColor: COLORS.cabinet,
              borderRadius: "50%",
              opacity,
              transform: `translateY(${rise}px)`,
            }}
          />
        );
      })}

      <AnimatedTitle
        text="МОЩНОСТЬ: 1 МЕДВЕДЬ"
        delay={30}
        top={70}
        color={COLORS.accentStrongRed}
        fontSize={84}
        font="bangers"
        variant="slideIn"
      />
    </AbsoluteFill>
  );
};
