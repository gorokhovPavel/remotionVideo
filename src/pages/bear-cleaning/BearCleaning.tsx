import React from "react";
import { Audio, Series, staticFile } from "remotion";
import { Shot1 } from "../../widgets/bear-cleaning/Shot1";
import { Shot2 } from "../../widgets/bear-cleaning/Shot2";
import { Shot3 } from "../../widgets/bear-cleaning/Shot3";
import { Shot4 } from "../../widgets/bear-cleaning/Shot4";
import { Shot5 } from "../../widgets/bear-cleaning/Shot5";
import { Shot6 } from "../../widgets/bear-cleaning/Shot6";
import { SHOT_DURATIONS } from "./constants";

export const BearCleaning: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("audio/bg-music.wav")} volume={0.25} loop />
      <Series>
        <Series.Sequence durationInFrames={SHOT_DURATIONS.shot1}>
          <Shot1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SHOT_DURATIONS.shot2}>
          <Shot2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SHOT_DURATIONS.shot3}>
          <Shot3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SHOT_DURATIONS.shot5}>
          <Shot5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SHOT_DURATIONS.shot6}>
          <Shot6 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SHOT_DURATIONS.shot4}>
          <Shot4 />
        </Series.Sequence>
      </Series>
    </>
  );
};
