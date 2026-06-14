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
import { GAG3 } from "../../pages/bear-kitchen/constants";
import { Caption } from "./Caption";
import { VintageOverlay } from "./VintageOverlay";

type ItemType = "jar" | "can" | "plate";

const FALLING_ITEMS: {
  type: ItemType;
  left: number;
  targetTop: number;
  delay: number;
  rotFrom: number;
  rotTo: number;
  width: number;
  height: number;
}[] = [
  { type: "jar", left: 200, targetTop: 470, delay: 0, rotFrom: -10, rotTo: 8, width: 70, height: 84 },
  { type: "can", left: 300, targetTop: 560, delay: 3, rotFrom: 15, rotTo: -12, width: 56, height: 78 },
  { type: "plate", left: 420, targetTop: 500, delay: 5, rotFrom: 0, rotTo: 20, width: 84, height: 84 },
  { type: "jar", left: 480, targetTop: 600, delay: 8, rotFrom: 5, rotTo: -18, width: 60, height: 72 },
  { type: "can", left: 250, targetTop: 640, delay: 2, rotFrom: -20, rotTo: 10, width: 50, height: 70 },
  { type: "plate", left: 390, targetTop: 430, delay: 10, rotFrom: 0, rotTo: -25, width: 70, height: 70 },
];

const FALL_DURATION = 16;

const ItemShape: React.FC<{ type: ItemType; width: number; height: number }> = ({
  type,
  width,
  height,
}) => {
  if (type === "jar") {
    return (
      <div
        style={{
          position: "relative",
          width,
          height,
          backgroundColor: COLORS.jarGlass,
          border: `3px solid ${COLORS.kettleMetalDark}`,
          borderRadius: "8px 8px 14px 14px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.6,
            height: 14,
            backgroundColor: COLORS.jarLid,
            borderRadius: 4,
          }}
        />
      </div>
    );
  }

  if (type === "can") {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: COLORS.canMetal,
          borderRadius: 6,
          boxShadow:
            "inset 0 8px 0 0 rgba(0,0,0,0.15), inset 0 -8px 0 0 rgba(0,0,0,0.15)",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width,
        height,
        borderRadius: "50%",
        backgroundColor: COLORS.white,
        border: `4px solid ${COLORS.sinkMetalDark}`,
      }}
    />
  );
};

const FallingItem: React.FC<{
  item: (typeof FALLING_ITEMS)[number];
  frame: number;
}> = ({ item, frame }) => {
  const localFrame = frame - GAG3.fallStart - item.delay;
  const progress = interpolate(
    localFrame,
    [0, FALL_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bounce,
    },
  );
  const top = interpolate(progress, [0, 1], [-150, item.targetTop]);
  const rotate = interpolate(
    localFrame,
    [0, FALL_DURATION],
    [item.rotFrom, item.rotTo],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: item.left,
        top,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <ItemShape type={item.type} width={item.width} height={item.height} />
    </div>
  );
};

const DizzyStar: React.FC<{ phase: number; frame: number }> = ({
  phase,
  frame,
}) => {
  const angle = frame * 0.08 + phase;
  const cx = 370;
  const cy = 410;
  const x = cx + Math.cos(angle) * 100;
  const y = cy + Math.sin(angle) * 46;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 24,
        height: 24,
        transform: `translate(-50%, -50%) rotate(${frame * 6}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 9,
          left: 0,
          width: 24,
          height: 6,
          backgroundColor: COLORS.star,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 9,
          top: 0,
          width: 6,
          height: 24,
          backgroundColor: COLORS.star,
          borderRadius: 3,
        }}
      />
    </div>
  );
};

/**
 * Gag 3 — a shelf's worth of jars, cans, and plates avalanches onto the
 * bear. He emerges from the pile, dazed and deadpan, to deliver a line.
 */
export const Gag3Avalanche: React.FC = () => {
  const frame = useCurrentFrame();

  const fallEnd = GAG3.fallStart + GAG3.fallDuration;
  const settled = frame >= fallEnd + 4;

  // The frame rattles as the avalanche lands.
  const shakeAmp = interpolate(
    frame,
    [GAG3.fallStart, fallEnd, fallEnd + 8],
    [5, 5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shakeAngle =
    frame >= GAG3.fallStart && frame <= fallEnd + 8
      ? Math.sin(frame * 2.5) * shakeAmp
      : 0;

  const zoom = interpolate(
    frame,
    [0, fallEnd, GAG3.durationInFrames],
    [1.05, 1.05, 1.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const mouthOpen =
    frame >= GAG3.voiceoverStart &&
    frame < GAG3.voiceoverStart + GAG3.voiceoverDuration
      ? 0.3 + 0.7 * Math.abs(Math.sin((frame - GAG3.voiceoverStart) * 0.85))
      : 0;

  const captionOpacity = interpolate(
    frame,
    [
      GAG3.voiceoverStart - 3,
      GAG3.voiceoverStart + 5,
      GAG3.voiceoverStart + GAG3.voiceoverDuration - 5,
      GAG3.voiceoverStart + GAG3.voiceoverDuration + 12,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const rightArmStyle: React.CSSProperties = {
    transform: "rotate(10deg)",
    transformOrigin: "top right",
  };
  const leftArmStyle: React.CSSProperties = {
    transform: "rotate(-10deg)",
    transformOrigin: "top left",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={GAG3.fallStart} durationInFrames={FALL_DURATION + 14}>
        <Audio src={staticFile("audio/jar-crash.wav")} volume={0.9} />
      </Sequence>

      <Sequence
        from={GAG3.voiceoverStart}
        durationInFrames={GAG3.voiceoverDuration}
      >
        <Audio src={staticFile("audio/voiceover-gag3.wav")} volume={1} />
      </Sequence>

      <AbsoluteFill
        style={{
          transform: `rotateZ(${shakeAngle}deg) scale(${zoom}) translate(-15px, 0px)`,
          transformOrigin: "38% 55%",
        }}
      >
        <Kitchen />

        <div
          style={{
            position: "absolute",
            left: 240,
            top: 430,
            width: 260,
            height: 330,
          }}
        >
          <Bear
            mouthOpen={mouthOpen}
            rightArmStyle={rightArmStyle}
            leftArmStyle={leftArmStyle}
          />
        </div>

        {settled &&
          [0, 2.1, 4.2].map((phase, i) => (
            <DizzyStar key={i} phase={phase} frame={frame} />
          ))}

        {FALLING_ITEMS.map((item, i) => (
          <FallingItem key={i} item={item} frame={frame} />
        ))}
      </AbsoluteFill>

      <VintageOverlay />

      <Caption opacity={captionOpacity}>
        «Кто ж его посудит, он же кухонный!»
      </Caption>
    </AbsoluteFill>
  );
};
