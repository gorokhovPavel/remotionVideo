import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { MainScene } from "../../widgets/bear-kitchen/MainScene";
import { Gag1Steam } from "../../widgets/bear-kitchen/Gag1Steam";
import { Gag2Dance } from "../../widgets/bear-kitchen/Gag2Dance";
import { Gag3Avalanche } from "../../widgets/bear-kitchen/Gag3Avalanche";
import { COLORS } from "../../shared/colors";
import { MAIN_SCENE, GAG1, GAG2, GAG3 } from "./constants";

/**
 * A nostalgic Soviet-era kitchen. Boris the bear washes dishes, turns to
 * deliver a line to camera, then runs into a string of absurd mishaps —
 * each one punctuated by a line in the spirit of a classic Soviet comedy.
 */
export const BearKitchen: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Audio src={staticFile("audio/kettle-hiss.wav")} loop volume={0.3} />
      <Audio src={staticFile("audio/borsch-bubble.wav")} loop volume={0.35} />

      <Series>
        <Series.Sequence durationInFrames={MAIN_SCENE.durationInFrames}>
          <MainScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={GAG1.durationInFrames}>
          <Gag1Steam />
        </Series.Sequence>
        <Series.Sequence durationInFrames={GAG2.durationInFrames}>
          <Gag2Dance />
        </Series.Sequence>
        <Series.Sequence durationInFrames={GAG3.durationInFrames}>
          <Gag3Avalanche />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
