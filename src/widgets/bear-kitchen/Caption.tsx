import React from "react";
import { COLORS } from "../../shared/colors";
import { fredoka } from "../../shared/fonts";

type CaptionProps = {
  opacity: number;
  fontSize?: number;
  children: React.ReactNode;
};

/** A subtitle bar pinned near the bottom of the frame for a spoken line. */
export const Caption: React.FC<CaptionProps> = ({
  opacity,
  fontSize = 48,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 90,
      left: 0,
      width: "100%",
      textAlign: "center",
      opacity,
    }}
  >
    <span
      style={{
        fontFamily: fredoka,
        fontWeight: 600,
        fontSize,
        color: COLORS.white,
        backgroundColor: "rgba(0,0,0,0.45)",
        padding: "10px 32px",
        borderRadius: 14,
      }}
    >
      {children}
    </span>
  </div>
);
