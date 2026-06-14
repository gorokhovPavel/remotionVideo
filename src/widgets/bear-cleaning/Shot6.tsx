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

const ALARM_START = 140;

export const Shot6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bear stirs the bowl in a circle, then freezes in surprise
  const stir = frame * 0.3;
  const surprise = interpolate(frame, [95, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const armX = (1 - surprise) * Math.cos(stir) * 14 + surprise * 10;
  const armY = (1 - surprise) * Math.sin(stir) * 14 + surprise * -60;
  const armRotate = (1 - surprise) * stir * 20 + surprise * -60;

  // Bear fans the smoke alarm with a towel
  const fanWave = frame > ALARM_START ? Math.sin((frame - ALARM_START) / 3) * 35 : 0;

  // Oven glow pulses faster as things heat up
  const pulseFreq = interpolate(frame, [0, 100], [0.05, 0.3], {
    extrapolateRight: "clamp",
  });
  const glowOpacity = 0.3 + 0.3 * Math.abs(Math.sin(frame * pulseFreq));

  // Batter swells in the bowl before the eruption
  const batterScale = interpolate(frame, [10, 95], [0.6, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // The oven door bursts open...
  const doorOpen = spring({
    frame: frame - 95,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  const doorRotate = interpolate(doorOpen, [0, 1], [0, -110]);

  // ...and a comically oversized cake erupts, swallowing the kitchen
  const cakeBurst = spring({
    frame: frame - 100,
    fps,
    config: { damping: 7, stiffness: 120 },
  });
  const cakeGrowth = interpolate(frame, [140, 210], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cakeScale = cakeBurst * (1 + cakeGrowth);

  // Smoke alarm fades in, then blinks red
  const alarmOpacity = interpolate(frame, [125, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const alarmBlink = frame > ALARM_START && Math.floor(frame / 5) % 2 === 0 ? 1 : 0.25;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: "hidden" }}>
      <Sequence from={ALARM_START}>
        <Audio src={staticFile("audio/alarm.wav")} volume={0.45} loop />
      </Sequence>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${COLORS.wall} 0%, ${COLORS.wall} 65%, ${COLORS.floor} 65%, ${COLORS.floor} 100%)`,
        }}
      />

      {/* Smoke alarm on the ceiling */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: 70,
          height: 24,
          backgroundColor: COLORS.white,
          borderRadius: "0 0 16px 16px",
          opacity: alarmOpacity,
          border: `2px solid ${COLORS.metalDark}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: COLORS.accentStrongRed,
            opacity: alarmBlink,
          }}
        />
      </div>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 120,
          backgroundColor: COLORS.cabinet,
        }}
      />

      {/* Oven */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "28%",
          width: 280,
          height: 300,
          backgroundColor: COLORS.metal,
          borderRadius: 16,
          border: `4px solid ${COLORS.outline}`,
          overflow: "hidden",
        }}
      >
        {/* Knobs */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 18,
            width: 26,
            height: 26,
            backgroundColor: COLORS.metalDark,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 56,
            width: 26,
            height: 26,
            backgroundColor: COLORS.metalDark,
            borderRadius: "50%",
          }}
        />

        {/* Oven door */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 16,
            width: 248,
            height: 224,
            backgroundColor: COLORS.metalDark,
            borderRadius: 10,
            transformOrigin: "left center",
            transform: `rotate(${doorRotate}deg)`,
          }}
        >
          {/* Window with glow */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: "50%",
              transform: "translateX(-50%)",
              width: 160,
              height: 130,
              borderRadius: 12,
              backgroundColor: COLORS.outline,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#FF8A3D",
                opacity: glowOpacity,
              }}
            />
          </div>
        </div>
      </div>

      {/* The cake of doom, erupting from the oven */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: "28%",
          transform: `scale(${cakeScale})`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 260,
            height: 110,
            backgroundColor: COLORS.bearBelly,
            borderRadius: "16px 16px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 95,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            height: 90,
            backgroundColor: COLORS.white,
            borderRadius: "24px 24px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 165,
            left: "50%",
            transform: "translateX(-50%)",
            width: 180,
            height: 160,
            backgroundColor: COLORS.bearBelly,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: "50%",
            transform: "translateX(-50%)",
            width: 40,
            height: 40,
            backgroundColor: COLORS.accentStrongRed,
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Bear: stirring, then frozen in surprise, then fanning the alarm */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "55%",
        }}
      >
        <Bear
          rightArmStyle={{
            transform: `translate(${armX}px, ${armY}px) rotate(${armRotate}deg)`,
          }}
          leftArmStyle={{
            transform: `translate(${-10}px, ${-30}px) rotate(${fanWave}deg)`,
          }}
        />
      </div>

      {/* Mixing bowl with swelling batter, held in the bear's paws */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: "68%",
          width: 130,
          height: 90,
          backgroundColor: COLORS.white,
          borderRadius: "0 0 65px 65px",
          border: `4px solid ${COLORS.metal}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: "50%",
            width: 110,
            height: 90,
            borderRadius: "50%",
            backgroundColor: COLORS.apron,
            transform: `translateX(-50%) scale(${batterScale})`,
            transformOrigin: "bottom center",
          }}
        />
      </div>

      <AnimatedTitle
        text="ВЫПЕЧКА ПО ИНТУИЦИИ"
        delay={10}
        top={60}
        color={COLORS.apron}
        fontSize={64}
        font="fredoka"
        variant="typewriter"
      />
      <AnimatedTitle
        text="ТРЕВОГА!"
        delay={ALARM_START}
        top={850}
        color={COLORS.accentStrongRed}
        fontSize={72}
        font="bangers"
        variant="pulse"
      />
    </AbsoluteFill>
  );
};
