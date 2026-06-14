import React from "react";
import {
  AbsoluteFill,
  Audio,
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

export const Shot4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera settles from a dramatic zoom-out into the wreckage
  const zoom = interpolate(frame, [0, 30], [1.3, 1], {
    extrapolateRight: "clamp",
  });

  // Bear "breathes" proudly
  const breathe = Math.sin(frame / 20) * 5;

  // Cat jumps into frame in shock
  const catEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  // Lamp shade swings, still rattled from the chaos
  const lampSwing = Math.sin(frame / 10) * 6;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      <Sequence from={70}>
        <Audio src={staticFile("audio/tada.wav")} volume={0.6} />
      </Sequence>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${COLORS.wall} 0%, ${COLORS.wall} 65%, ${COLORS.floor} 65%, ${COLORS.floor} 100%)`,
        }}
      />

      {/* Foam splattered across the ceiling */}
      <div
        style={{
          position: "absolute",
          top: -40,
          left: 0,
          width: "100%",
          height: 120,
          background: COLORS.white,
          borderRadius: "0 0 50% 50% / 0 0 60px 60px",
          opacity: 0.9,
        }}
      />
      {/* Foam blob stuck to the wall */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 260,
          width: 90,
          height: 70,
          backgroundColor: COLORS.white,
          borderRadius: "50%",
          opacity: 0.85,
        }}
      />

      {/* Crooked picture frame */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 420,
          width: 130,
          height: 100,
          border: `10px solid ${COLORS.cabinet}`,
          borderRadius: 6,
          backgroundColor: COLORS.wallDark,
          transform: "rotate(-18deg)",
        }}
      />

      {/* Toppled lamp */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          right: 420,
          width: 12,
          height: 160,
          backgroundColor: COLORS.metal,
          borderRadius: 4,
          transformOrigin: "bottom center",
          transform: `rotate(${70 + lampSwing}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          right: 360,
          width: 100,
          height: 60,
          backgroundColor: COLORS.apron,
          borderRadius: "50% 50% 10px 10px / 60% 60% 10px 10px",
          transformOrigin: "bottom center",
          transform: `rotate(${70 + lampSwing}deg)`,
        }}
      />

      {/* Overturned chair */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 140,
          width: 140,
          height: 100,
          border: `10px solid ${COLORS.cabinet}`,
          borderRadius: 8,
          transform: "rotate(115deg)",
        }}
      />

      {/* Knocked-over potted plant */}
      <div
        style={{
          position: "absolute",
          bottom: 95,
          left: 340,
          width: 70,
          height: 50,
          backgroundColor: COLORS.cabinet,
          borderRadius: "0 0 16px 16px",
          transform: "rotate(60deg)",
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 80,
            left: 400 + i * 30,
            width: 50,
            height: 20,
            backgroundColor: COLORS.wallDark,
            borderRadius: "50%",
            transform: `rotate(${-10 + i * 12}deg)`,
          }}
        />
      ))}

      {/* Broken cabinet door from Shot 1, now on the floor */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 160,
          width: 220,
          height: 30,
          backgroundColor: COLORS.cabinet,
          borderRadius: 8,
          transform: "rotate(-12deg)",
        }}
      />

      {/* The washing machine, escaped and tipped over on its side */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 480,
          width: 240,
          height: 150,
          backgroundColor: COLORS.metal,
          borderRadius: 16,
          border: `4px solid ${COLORS.outline}`,
          transform: "rotate(-6deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 60,
            transform: "translateY(-50%)",
            width: 110,
            height: 110,
            borderRadius: "50%",
            backgroundColor: COLORS.wallDark,
            border: `10px solid ${COLORS.metalDark}`,
          }}
        />
        {/* Legs sticking out at odd angles */}
        <div
          style={{
            position: "absolute",
            bottom: -16,
            left: 20,
            width: 22,
            height: 28,
            backgroundColor: COLORS.metalDark,
            borderRadius: 4,
            transform: "rotate(30deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -10,
            right: 30,
            width: 22,
            height: 28,
            backgroundColor: COLORS.metalDark,
            borderRadius: 4,
            transform: "rotate(-15deg)",
          }}
        />
      </div>
      {/* Suds puddle leaking out from the fallen machine */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 450,
          width: 260,
          height: 24,
          backgroundColor: COLORS.white,
          borderRadius: "50%",
          opacity: 0.85,
        }}
      />
      {/* The rebellious sock, finally caught */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 545,
          fontSize: 32,
          transform: "rotate(-20deg)",
        }}
      >
        🧦
      </div>

      {/* Splattered remains of the cake of doom */}
      <div
        style={{
          position: "absolute",
          bottom: 78,
          left: 1160,
          width: 180,
          height: 60,
          backgroundColor: COLORS.bearBelly,
          borderRadius: "50%",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 92,
          left: 1230,
          width: 32,
          height: 32,
          backgroundColor: COLORS.accentStrongRed,
          borderRadius: "50%",
        }}
      />

      {/* Bear standing proud, paws on hips */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: `translate(-50%, ${breathe}px)`,
        }}
      >
        <Bear
          rightArmStyle={{ transform: "translate(36px, 50px) rotate(-30deg)" }}
          leftArmStyle={{ transform: "translate(-36px, 50px) rotate(30deg)" }}
        />
      </div>

      {/* Terrified cat */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: "78%",
          fontSize: 90,
          transform: `scale(${catEntrance})`,
        }}
      >
        🐱
      </div>

      <AnimatedTitle
        text="ЗАДАНИЕ ВЫПОЛНЕНО... НАВЕРНОЕ"
        delay={70}
        top={60}
        color={COLORS.white}
        fontSize={64}
        font="fredoka"
        variant="pulse"
      />

      <AnimatedTitle
        text="Борис старался ❤️"
        delay={220}
        top={950}
        color={COLORS.accentRed}
        fontSize={40}
        font="fredoka"
        variant="fade"
      />
    </AbsoluteFill>
  );
};
