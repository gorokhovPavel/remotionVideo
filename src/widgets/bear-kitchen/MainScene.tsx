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
import { MAIN_SCENE } from "../../pages/bear-kitchen/constants";
import { Caption } from "./Caption";
import { VintageOverlay } from "./VintageOverlay";

/**
 * A nostalgic Soviet-era kitchen. Boris the bear washes dishes at the sink
 * with his back to camera, then turns to deliver a line straight to the
 * lens before going back to scrubbing — humming a tune to himself.
 */
export const MainScene: React.FC = () => {
  const frame = useCurrentFrame();

  const turnStart = MAIN_SCENE.turnToCameraStart;
  const turnEnd = turnStart + MAIN_SCENE.turnDuration;
  const turnBackStart = MAIN_SCENE.turnBackStart;
  const turnBackEnd = turnBackStart + MAIN_SCENE.turnDuration;

  // Slow push-in toward the sink, holding tight through the line, then
  // easing back out while the bear hums.
  const zoom = interpolate(
    frame,
    [0, 150, turnStart, turnBackEnd, MAIN_SCENE.durationInFrames],
    [1, 1.1, 1.2, 1.2, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // The diagonal framing on the sink eases to straight-on as the bear turns.
  const rotateZ = interpolate(
    frame,
    [0, turnStart, turnEnd],
    [-2.5, -2.5, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const panX = interpolate(frame, [0, turnStart], [-60, -15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const panY = interpolate(frame, [0, turnStart], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // The turn is a quick cartoon "squash" — the bear narrows to a sliver at
  // the midpoint of each turn, where it swaps from its back to its front
  // (and back again), then springs back out to full width.
  const turnMid1 = turnStart + MAIN_SCENE.turnDuration / 2;
  const turnMid2 = turnBackStart + MAIN_SCENE.turnDuration / 2;

  const squashX = interpolate(
    frame,
    [turnStart, turnMid1, turnEnd, turnBackStart, turnMid2, turnBackEnd],
    [1, 0.12, 1, 1, 0.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const showFront = frame >= turnMid1 && frame < turnMid2;

  // Scrubbing slows to a near-stop just before the bear turns around, then
  // resumes at a relaxed, hum-along pace once washing continues.
  const scrubAmplitude = interpolate(frame, [120, turnStart], [18, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const armAngle =
    frame >= MAIN_SCENE.humStart
      ? Math.sin((frame - MAIN_SCENE.humStart) / 9) * 16
      : Math.sin(frame / 6) * scrubAmplitude;

  // Gentle bob while humming.
  const bob =
    frame >= MAIN_SCENE.humStart
      ? Math.sin((frame - MAIN_SCENE.humStart) / 10) * 6
      : 0;

  // Mouth flaps roughly in sync with the spoken line.
  const mouthOpen =
    frame >= MAIN_SCENE.voiceoverStart &&
    frame < MAIN_SCENE.voiceoverStart + MAIN_SCENE.voiceoverDuration
      ? 0.35 +
        0.65 * Math.abs(Math.sin((frame - MAIN_SCENE.voiceoverStart) * 0.9))
      : 0;

  const lineCaptionOpacity = interpolate(
    frame,
    [
      MAIN_SCENE.voiceoverStart - 5,
      MAIN_SCENE.voiceoverStart + 5,
      MAIN_SCENE.voiceoverStart + MAIN_SCENE.voiceoverDuration - 5,
      MAIN_SCENE.voiceoverStart + MAIN_SCENE.voiceoverDuration + 10,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const hummingCaptionOpacity = interpolate(
    frame,
    [
      MAIN_SCENE.humStart + 15,
      MAIN_SCENE.humStart + 30,
      MAIN_SCENE.durationInFrames - 20,
      MAIN_SCENE.durationInFrames,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const armStyle: React.CSSProperties = {
    transform: `rotate(${armAngle}deg)`,
    transformOrigin: "top right",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence
        from={MAIN_SCENE.voiceoverStart}
        durationInFrames={MAIN_SCENE.voiceoverDuration}
      >
        <Audio src={staticFile("audio/voiceover.wav")} volume={1} />
      </Sequence>

      <Sequence from={MAIN_SCENE.humStart}>
        <Audio src={staticFile("audio/hum.wav")} loop volume={0.45} />
      </Sequence>

      {/* Camera: diagonal push-in on the sink, settling as the bear turns */}
      <AbsoluteFill
        style={{
          transform: `perspective(1600px) rotateZ(${rotateZ}deg) scale(${zoom}) translate(${panX}px, ${panY}px)`,
          transformOrigin: "38% 55%",
        }}
      >
        <Kitchen />

        {/* The bear, doing a quick cartoon turn between its back and front */}
        <div
          style={{
            position: "absolute",
            left: 240,
            top: 430,
            width: 260,
            height: 330,
            transform: `translateY(${bob}px) scaleX(${squashX})`,
          }}
        >
          {showFront ? (
            <Bear mouthOpen={mouthOpen} rightArmStyle={armStyle} />
          ) : (
            <BearBack rightArmStyle={armStyle} />
          )}
        </div>
      </AbsoluteFill>

      <VintageOverlay />

      <Caption opacity={lineCaptionOpacity}>«Отлично, тепленькая пошла»</Caption>
      <Caption opacity={hummingCaptionOpacity} fontSize={44}>
        ♪ мм-м, ля-ля-ля-ля... ♪
      </Caption>
    </AbsoluteFill>
  );
};
