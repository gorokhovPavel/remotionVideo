import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bangers, fredoka } from "../fonts";
import { COLORS } from "../colors";

type AnimatedTitleProps = {
  text: string;
  delay?: number;
  top: number | string;
  color?: string;
  fontSize?: number;
  font?: "fredoka" | "bangers";
  variant?: "pop" | "typewriter" | "slideIn" | "pulse" | "fade";
};

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  delay = 0,
  top,
  color = COLORS.accentRed,
  fontSize = 70,
  font = "bangers",
  variant = "pop",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    top,
    left: 0,
    width: "100%",
    textAlign: "center",
    fontFamily: font === "bangers" ? bangers : fredoka,
    fontWeight: 800,
    fontSize,
    letterSpacing: font === "bangers" ? 4 : 1,
    color,
    WebkitTextStroke: `3px ${COLORS.outline}`,
    textShadow: `4px 4px 0px ${COLORS.outline}`,
  };

  if (variant === "typewriter") {
    const visibleChars = Math.floor(
      interpolate(localFrame, [0, text.length * 2], [0, text.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );

    return <div style={baseStyle}>{text.slice(0, visibleChars)}</div>;
  }

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  if (variant === "slideIn") {
    const x = interpolate(entrance, [0, 1], [120, 0]);

    return (
      <div style={{ ...baseStyle, transform: `translateX(${x}%)` }}>
        {text}
      </div>
    );
  }

  if (variant === "fade") {
    const opacity = interpolate(localFrame, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return <div style={{ ...baseStyle, opacity }}>{text}</div>;
  }

  if (variant === "pulse") {
    const pulse = localFrame > 0 ? 1 + Math.sin(localFrame / 15) * 0.04 : 1;
    const scale = entrance * pulse;

    return (
      <div style={{ ...baseStyle, transform: `scale(${scale})` }}>{text}</div>
    );
  }

  // "pop"
  return (
    <div style={{ ...baseStyle, transform: `scale(${entrance})` }}>{text}</div>
  );
};
