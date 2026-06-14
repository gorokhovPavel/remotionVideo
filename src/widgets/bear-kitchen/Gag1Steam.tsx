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
import { Kitchen } from "../../entities/kitchen/Kitchen";
import { Bear } from "../../entities/bear/Bear";
import { BearBack } from "../../entities/bear/BearBack";
import { COLORS } from "../../shared/colors";
import { GAG1 } from "../../pages/bear-kitchen/constants";
import { Caption } from "./Caption";
import { VintageOverlay } from "./VintageOverlay";

const SOOT_SPOTS = [
  { top: 64, left: 70, size: 30 },
  { top: 96, left: 168, size: 24 },
  { top: 130, left: 110, size: 36 },
  { top: 50, left: 150, size: 18 },
];

const SootSmudges: React.FC = () => (
  <>
    {SOOT_SPOTS.map((s, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          backgroundColor: COLORS.soot,
        }}
      />
    ))}
  </>
);

/**
 * Gag 1 — the kettle finally boils over: a jet of steam blasts the bear in
 * the face. It clears to reveal him soot-faced and deadpan, delivering a
 * line straight to camera.
 */
export const Gag1Steam: React.FC = () => {
  const frame = useCurrentFrame();

  const blastStart = GAG1.blastStart;
  const blastEnd = blastStart + GAG1.blastDuration;

  // Idle washing motion, carried over from the end of the main scene.
  const armAngle = Math.sin(frame / 9) * 16;
  const bob = Math.sin(frame / 10) * 6;

  // The kettle rattles harder as it works up to the blast.
  const preShake = interpolate(frame, [0, blastStart], [0, 2.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blastShake = interpolate(
    frame,
    [blastStart, blastEnd, blastEnd + 10],
    [6, 6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shakeAngle =
    Math.sin(frame * 2.3) * (frame < blastStart ? preShake : blastShake);

  // A quick punch-in as the kettle erupts.
  const zoom = interpolate(
    frame,
    [0, blastStart, blastEnd, GAG1.durationInFrames],
    [1.05, 1.05, 1.18, 1.12],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  // A puff of steam near the kettle's spout grows ahead of the blast.
  const preBlastScale = interpolate(frame, [0, blastStart], [0.5, 2.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const preBlastOpacity =
    frame < blastStart ? 0.35 + 0.25 * Math.sin(frame * 0.9) : 0;

  // The cloud expands from the kettle to engulf the whole frame, hiding the
  // swap from the bear's back to its soot-faced front, then clears.
  const cloudProgress = interpolate(
    frame,
    [blastStart, blastEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const cloudOpacity = interpolate(
    frame,
    [blastStart, blastStart + 2, blastEnd, blastEnd + 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const showBear = frame >= blastEnd;

  const mouthOpen =
    frame >= GAG1.voiceoverStart &&
    frame < GAG1.voiceoverStart + GAG1.voiceoverDuration
      ? 0.3 + 0.7 * Math.abs(Math.sin((frame - GAG1.voiceoverStart) * 0.85))
      : 0;

  const captionOpacity = interpolate(
    frame,
    [
      GAG1.voiceoverStart - 3,
      GAG1.voiceoverStart + 5,
      GAG1.voiceoverStart + GAG1.voiceoverDuration - 5,
      GAG1.voiceoverStart + GAG1.voiceoverDuration + 12,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const backArmStyle: React.CSSProperties = {
    transform: `rotate(${armAngle}deg)`,
    transformOrigin: "top right",
  };
  const frontRightArmStyle: React.CSSProperties = {
    transform: "rotate(8deg)",
    transformOrigin: "top right",
  };
  const frontLeftArmStyle: React.CSSProperties = {
    transform: "rotate(-8deg)",
    transformOrigin: "top left",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={blastStart} durationInFrames={GAG1.blastDuration + 10}>
        <Audio src={staticFile("audio/steam-blast.wav")} volume={0.9} />
      </Sequence>

      <Sequence
        from={GAG1.voiceoverStart}
        durationInFrames={GAG1.voiceoverDuration}
      >
        <Audio src={staticFile("audio/voiceover-gag1.wav")} volume={1} />
      </Sequence>

      <AbsoluteFill
        style={{
          transform: `rotateZ(${shakeAngle}deg) scale(${zoom}) translate(-15px, 0px)`,
          transformOrigin: "38% 55%",
        }}
      >
        <Kitchen />

        {/* Building puff of steam near the kettle's spout */}
        <div
          style={{
            position: "absolute",
            left: 1380,
            top: 400,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: COLORS.steam,
            opacity: preBlastOpacity,
            filter: "blur(8px)",
            transform: `translate(-50%, -50%) scale(${preBlastScale})`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 240,
            top: 430,
            width: 260,
            height: 330,
            transform: `translateY(${bob}px)`,
          }}
        >
          {showBear ? (
            <>
              <Bear
                mouthOpen={mouthOpen}
                rightArmStyle={frontRightArmStyle}
                leftArmStyle={frontLeftArmStyle}
              />
              <SootSmudges />
            </>
          ) : (
            <BearBack rightArmStyle={backArmStyle} />
          )}
        </div>
      </AbsoluteFill>

      {/* Steam cloud, expanding from the kettle to cover the frame */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 72% 38%, ${COLORS.steamCloud} ${cloudProgress * 140}%, rgba(255,255,255,0) ${Math.min(100, cloudProgress * 140 + 12)}%)`,
          opacity: cloudOpacity,
          pointerEvents: "none",
        }}
      />

      <VintageOverlay />

      <Caption opacity={captionOpacity}>
        «Какая гадость, эта ваша геркулесовая каша!»
      </Caption>
    </AbsoluteFill>
  );
};
