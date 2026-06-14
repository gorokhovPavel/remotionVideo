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
import { COLORS } from "../../shared/colors";
import { GAG2 } from "../../pages/bear-kitchen/constants";
import { Caption } from "./Caption";
import { VintageOverlay } from "./VintageOverlay";

/** The borsch pot, now upturned on the bear's head like a beret. */
const PotHat: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: -20,
        left: 35,
        width: 190,
        height: 34,
        backgroundColor: COLORS.potBodyDark,
        borderRadius: "50%",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: -52,
        left: 45,
        width: 170,
        height: 70,
        backgroundColor: COLORS.potBody,
        borderRadius: "50%",
        boxShadow: `inset -8px -8px 0 0 rgba(0,0,0,0.15)`,
      }}
    />
    {/* Borsch drips down the bear's face */}
    {[
      { left: 48, height: 30 },
      { left: 78, height: 20 },
      { left: 178, height: 26 },
      { left: 204, height: 16 },
    ].map((d, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: -2,
          left: d.left,
          width: 14,
          height: d.height,
          backgroundColor: COLORS.borsch,
          borderRadius: "0 0 50% 50%",
        }}
      />
    ))}
  </>
);

/**
 * Gag 2 — the bubbling borsch erupts, lands on the bear's head like a beret,
 * and he breaks into a delighted spin.
 */
export const Gag2Dance: React.FC = () => {
  const frame = useCurrentFrame();

  const eruptStart = GAG2.eruptStart;
  const eruptEnd = eruptStart + GAG2.eruptDuration;
  const danceActive = frame >= eruptEnd;

  // Bubbling builds before the eruption.
  const bubbleScale = interpolate(frame, [0, eruptStart], [0.6, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubbleOpacity =
    frame < eruptStart ? 0.4 + 0.3 * Math.sin(frame * 0.8) : 0;

  // The blob of borsch arcs from the pot to the bear's head.
  const t = interpolate(frame, [eruptStart, eruptEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blobX = interpolate(t, [0, 1], [1565, 370]);
  const blobBaseY = interpolate(t, [0, 1], [525, 410]);
  const blobArc = Math.sin(t * Math.PI) * 180;
  const blobY = blobBaseY - blobArc;
  const blobOpacity = interpolate(
    frame,
    [eruptStart, eruptStart + 1, eruptEnd, eruptEnd + 2],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // The dance: a happy, bouncy spin once the pot lands.
  const dancePhase = (frame - eruptEnd) / 6;
  const danceRotate = danceActive ? Math.sin(dancePhase) * 12 : 0;
  const danceBounce = danceActive ? Math.abs(Math.sin(dancePhase)) * -14 : 0;

  // A quick punch-in as the pot lands, easing out as the dance settles.
  const zoom = interpolate(
    frame,
    [0, eruptEnd, eruptEnd + 8, GAG2.durationInFrames],
    [1.1, 1.1, 1.0, 1.04],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const cameraSway = danceActive ? Math.sin(dancePhase) * 1.5 : 0;

  const mouthOpen =
    frame >= GAG2.voiceoverStart &&
    frame < GAG2.voiceoverStart + GAG2.voiceoverDuration
      ? 0.3 + 0.7 * Math.abs(Math.sin((frame - GAG2.voiceoverStart) * 0.9))
      : 0;

  const captionOpacity = interpolate(
    frame,
    [
      GAG2.voiceoverStart - 3,
      GAG2.voiceoverStart + 4,
      GAG2.voiceoverStart + GAG2.voiceoverDuration - 4,
      GAG2.voiceoverStart + GAG2.voiceoverDuration + 12,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Before the eruption: scrubbing a plate held up to the camera.
  // After: arms thrown out wide, alternating, mid-spin.
  const rightArmStyle: React.CSSProperties = danceActive
    ? {
        transform: `rotate(${-40 + Math.sin(dancePhase) * 20}deg)`,
        transformOrigin: "top right",
      }
    : {
        transform: `rotate(${Math.sin(frame / 5) * 20}deg)`,
        transformOrigin: "top right",
      };
  const leftArmStyle: React.CSSProperties = danceActive
    ? {
        transform: `rotate(${40 - Math.sin(dancePhase) * 20}deg)`,
        transformOrigin: "top left",
      }
    : {
        transform: "rotate(-10deg)",
        transformOrigin: "top left",
      };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={eruptStart} durationInFrames={GAG2.eruptDuration + 12}>
        <Audio src={staticFile("audio/pot-overflow.wav")} volume={0.9} />
      </Sequence>

      <Sequence
        from={GAG2.voiceoverStart}
        durationInFrames={GAG2.voiceoverDuration}
      >
        <Audio src={staticFile("audio/voiceover-gag2.wav")} volume={1} />
      </Sequence>

      <AbsoluteFill
        style={{
          transform: `rotateZ(${cameraSway}deg) scale(${zoom}) translate(-15px, 0px)`,
          transformOrigin: "38% 55%",
        }}
      >
        <Kitchen />

        {/* Bubbling builds before the pot erupts */}
        <div
          style={{
            position: "absolute",
            left: 1565,
            top: 525,
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: COLORS.borschLight,
            opacity: bubbleOpacity,
            filter: "blur(6px)",
            transform: `translate(-50%, -50%) scale(${bubbleScale})`,
          }}
        />

        {/* The flying blob of borsch */}
        <div
          style={{
            position: "absolute",
            left: blobX,
            top: blobY,
            width: 50,
            height: 40,
            borderRadius: "50%",
            backgroundColor: COLORS.borsch,
            opacity: blobOpacity,
            transform: `translate(-50%, -50%) rotate(${t * 360}deg)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 240,
            top: 430,
            width: 260,
            height: 330,
            transform: `rotate(${danceRotate}deg) translateY(${danceBounce}px)`,
            transformOrigin: "bottom center",
          }}
        >
          <Bear
            mouthOpen={mouthOpen}
            rightArmStyle={rightArmStyle}
            leftArmStyle={leftArmStyle}
          />
          {frame >= eruptEnd && <PotHat />}
        </div>
      </AbsoluteFill>

      <VintageOverlay />

      <Caption opacity={captionOpacity}>«Танцуют все!»</Caption>
    </AbsoluteFill>
  );
};
