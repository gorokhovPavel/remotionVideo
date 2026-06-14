import React from "react";
import { COLORS } from "../../shared/colors";

type BearProps = {
  style?: React.CSSProperties;
  /** Animates the right paw — the one doing the "work" in each shot. */
  rightArmStyle?: React.CSSProperties;
  /** Animates the left paw, e.g. for flailing or bracing. */
  leftArmStyle?: React.CSSProperties;
};

const Ear: React.FC<{ side: "left" | "right" }> = ({ side }) => (
  <div
    style={{
      position: "absolute",
      top: -26,
      [side]: 10,
      width: 68,
      height: 68,
      backgroundColor: COLORS.bearFur,
      borderRadius: "50%",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        width: 36,
        height: 36,
        backgroundColor: COLORS.bearBelly,
        borderRadius: "50%",
      }}
    />
  </div>
);

const Eyebrow: React.FC<{ side: "left" | "right" }> = ({ side }) => (
  <div
    style={{
      position: "absolute",
      top: 36,
      [side]: side === "left" ? 70 : 70,
      width: 26,
      height: 6,
      backgroundColor: COLORS.outline,
      borderRadius: 3,
      transform: `rotate(${side === "left" ? -14 : 14}deg)`,
    }}
  />
);

const Eye: React.FC<{ side: "left" | "right" }> = ({ side }) => (
  <div
    style={{
      position: "absolute",
      top: 50,
      [side]: 78,
      width: 18,
      height: 18,
      backgroundColor: COLORS.outline,
      borderRadius: "50%",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 2,
        left: 2,
        width: 6,
        height: 6,
        backgroundColor: COLORS.white,
        borderRadius: "50%",
      }}
    />
  </div>
);

const Foot: React.FC<{ side: "left" | "right" }> = ({ side }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      [side]: 18,
      width: 76,
      height: 50,
      backgroundColor: COLORS.bearFurDark,
      borderRadius: "50%",
      transform: `rotate(${side === "left" ? -8 : 8}deg)`,
    }}
  />
);

const Claws: React.FC = () => (
  <>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          bottom: 6 + i * 16,
          right: -6,
          width: 12,
          height: 8,
          backgroundColor: COLORS.outline,
          borderRadius: "50%",
        }}
      />
    ))}
  </>
);

export const Bear: React.FC<BearProps> = ({
  style,
  rightArmStyle,
  leftArmStyle,
}) => {
  return (
    <div style={{ position: "relative", width: 260, height: 330, ...style }}>
      <Ear side="left" />
      <Ear side="right" />

      {/* Head + body */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 260,
          height: 300,
          backgroundColor: COLORS.bearFur,
          borderRadius: "50% 50% 45% 45%",
          boxShadow: `inset -18px -22px 0 0 rgba(0,0,0,0.06)`,
        }}
      />

      {/* Belly patch */}
      <div
        style={{
          position: "absolute",
          top: 152,
          left: 55,
          width: 150,
          height: 138,
          backgroundColor: COLORS.bearBelly,
          borderRadius: "50%",
        }}
      />

      {/* Left (static) arm */}
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

      {/* Right (animated) arm + claws */}
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
      >
        <Claws />
      </div>

      <Eyebrow side="left" />
      <Eyebrow side="right" />
      <Eye side="left" />
      <Eye side="right" />

      {/* Snout */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 75,
          width: 110,
          height: 88,
          backgroundColor: COLORS.bearFurDark,
          borderRadius: "50%",
        }}
      >
        {/* Nostrils */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 30,
            width: 8,
            height: 10,
            backgroundColor: COLORS.outline,
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            width: 8,
            height: 10,
            backgroundColor: COLORS.outline,
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />
        {/* Nose */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: "50%",
            transform: "translateX(-50%)",
            width: 30,
            height: 22,
            backgroundColor: COLORS.outline,
            borderRadius: "50%",
          }}
        />
        {/* Smile */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: "50%",
            transform: "translateX(-50%)",
            width: 54,
            height: 26,
            borderBottom: `4px solid ${COLORS.outline}`,
            borderRadius: "0 0 50px 50px",
          }}
        />
      </div>

      {/* Apron straps */}
      <div
        style={{
          position: "absolute",
          top: 88,
          left: 72,
          width: 16,
          height: 70,
          backgroundColor: COLORS.apron,
          transform: "rotate(18deg)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 88,
          right: 72,
          width: 16,
          height: 70,
          backgroundColor: COLORS.apron,
          transform: "rotate(-18deg)",
          borderRadius: 4,
        }}
      />

      {/* Apron */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 45,
          width: 170,
          height: 170,
          backgroundColor: COLORS.apron,
          borderRadius: 12,
          border: `4px solid ${COLORS.white}`,
        }}
      >
        {/* Pocket */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 50,
            backgroundColor: COLORS.apronDark,
            borderRadius: 8,
            border: `3px solid ${COLORS.white}`,
          }}
        />
      </div>

      <Foot side="left" />
      <Foot side="right" />
    </div>
  );
};
