import React from "react";
import { AbsoluteFill } from "remotion";

/** Warm haze + vignette applied uniformly across every BearKitchen shot. */
export const VintageOverlay: React.FC = () => (
  <>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(20,10,5,0.55) 100%)",
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    />
    <AbsoluteFill
      style={{
        background: "rgba(255, 180, 90, 0.08)",
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  </>
);
