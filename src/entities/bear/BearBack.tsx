import React from "react";
import { COLORS } from "../../shared/colors";
import { Ear, Foot } from "./Bear";

type BearBackProps = {
  style?: React.CSSProperties;
  /** Animates the right paw — the one scrubbing in the sink. */
  rightArmStyle?: React.CSSProperties;
  /** Animates the left paw, e.g. holding a plate. */
  leftArmStyle?: React.CSSProperties;
};

/**
 * The bear seen from behind: rounded fur back, ears, and a chef's apron
 * tied in a bow at the waist with crossing shoulder straps.
 */
export const BearBack: React.FC<BearBackProps> = ({
  style,
  rightArmStyle,
  leftArmStyle,
}) => {
  return (
    <div style={{ position: "relative", width: 260, height: 330, ...style }}>
      <Ear side="left" />
      <Ear side="right" />

      {/* Head + back */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 260,
          height: 300,
          backgroundColor: COLORS.bearFur,
          borderRadius: "50% 50% 45% 45%",
          boxShadow: `inset 18px -22px 0 0 rgba(0,0,0,0.08)`,
        }}
      />

      {/* Left (static) arm, reaching toward the sink */}
      <div
        style={{
          position: "absolute",
          top: 142,
          left: -32,
          width: 72,
          height: 72,
          backgroundColor: COLORS.bearFurDark,
          borderRadius: "50%",
          ...leftArmStyle,
        }}
      />

      {/* Right (animated) arm, scrubbing */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: -36,
          width: 76,
          height: 76,
          backgroundColor: COLORS.bearFurDark,
          borderRadius: "50%",
          ...rightArmStyle,
        }}
      />

      {/* Apron straps crossing over the shoulders */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 78,
          width: 16,
          height: 130,
          backgroundColor: COLORS.apron,
          transform: "rotate(22deg)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 78,
          width: 16,
          height: 130,
          backgroundColor: COLORS.apron,
          transform: "rotate(-22deg)",
          borderRadius: 4,
        }}
      />

      {/* Apron back panel */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 55,
          width: 150,
          height: 150,
          backgroundColor: COLORS.apron,
          borderRadius: 12,
          border: `4px solid ${COLORS.apronTrim}`,
        }}
      />

      {/* Waist tie, knotted in a bow */}
      <div
        style={{
          position: "absolute",
          top: 218,
          left: "50%",
          width: 170,
          height: 14,
          backgroundColor: COLORS.apronTrim,
          transform: "translateX(-50%)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          width: 46,
          height: 30,
          backgroundColor: COLORS.apronTrim,
          transform: "translateX(-50%) rotate(-20deg)",
          borderRadius: 6,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          width: 46,
          height: 30,
          backgroundColor: COLORS.apronTrim,
          transform: "translateX(-50%) rotate(20deg)",
          borderRadius: 6,
        }}
      />

      <Foot side="left" />
      <Foot side="right" />
    </div>
  );
};
