import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../../shared/colors";

const Wall: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 660,
      backgroundColor: COLORS.wallTeal,
      backgroundImage: `repeating-linear-gradient(0deg, ${COLORS.tileGrout} 0 3px, transparent 3px 90px), repeating-linear-gradient(90deg, ${COLORS.tileGrout} 0 3px, transparent 3px 90px)`,
    }}
  >
    {/* Skirting accent stripe just above the counter */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 28,
        backgroundColor: COLORS.wallTealDark,
        opacity: 0.7,
      }}
    />
  </div>
);

const Floor: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 660,
      left: 0,
      width: "100%",
      height: 420,
      backgroundColor: COLORS.floor,
      backgroundImage: `repeating-linear-gradient(90deg, ${COLORS.floorDark} 0 4px, transparent 4px 170px)`,
    }}
  />
);

const Clock: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 110,
      left: 130,
      width: 140,
      height: 140,
      borderRadius: "50%",
      backgroundColor: COLORS.clockFace,
      border: `8px solid ${COLORS.cabinetWoodDark}`,
      boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
    }}
  >
    {/* Hour hand */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 4,
        height: 32,
        backgroundColor: COLORS.outline,
        transform: "translate(-50%, -100%) rotate(35deg)",
        transformOrigin: "bottom center",
        borderRadius: 2,
      }}
    />
    {/* Minute hand */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 3,
        height: 46,
        backgroundColor: COLORS.outline,
        transform: "translate(-50%, -100%) rotate(120deg)",
        transformOrigin: "bottom center",
        borderRadius: 2,
      }}
    />
    {/* Center pin */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: COLORS.outline,
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

const Window: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 70,
      left: 1280,
      width: 380,
      height: 330,
    }}
  >
    {/* Warm evening glow spilling into the room */}
    <div
      style={{
        position: "absolute",
        inset: -120,
        background: `radial-gradient(ellipse at center, rgba(255, 217, 160, 0.45) 0%, rgba(255, 217, 160, 0) 70%)`,
      }}
    />
    {/* Frame */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: COLORS.windowFrame,
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Sky */}
      <div
        style={{
          position: "absolute",
          inset: 14,
          background: `linear-gradient(180deg, ${COLORS.windowSky} 0%, #FFC172 100%)`,
          borderRadius: 4,
        }}
      />
      {/* Mullions */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 14,
          bottom: 14,
          width: 10,
          backgroundColor: COLORS.windowFrame,
          transform: "translateX(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 14,
          right: 14,
          height: 10,
          backgroundColor: COLORS.windowFrame,
          transform: "translateY(-50%)",
        }}
      />
    </div>
    {/* Curtains */}
    {[0, 1].map((side) => (
      <div
        key={side}
        style={{
          position: "absolute",
          top: -20,
          [side === 0 ? "left" : "right"]: -36,
          width: 70,
          height: 380,
          backgroundColor: COLORS.curtain,
          borderRadius: side === 0 ? "0 18px 40px 18px" : "18px 0 18px 40px",
          backgroundImage: `repeating-linear-gradient(${side === 0 ? 6 : -6}deg, ${COLORS.curtainDark} 0 8px, transparent 8px 28px)`,
          boxShadow: "4px 0 14px rgba(0,0,0,0.2)",
        }}
      />
    ))}
  </div>
);

const Shelf: React.FC = () => (
  <div style={{ position: "absolute", top: 430, left: 760, width: 430 }}>
    {/* Jars */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          bottom: 18,
          left: 30 + i * 140,
          width: 80,
          height: 96,
          backgroundColor: COLORS.jarGlass,
          border: `3px solid ${COLORS.kettleMetalDark}`,
          borderRadius: "8px 8px 16px 16px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            width: 60,
            height: 18,
            backgroundColor: COLORS.jarLid,
            borderRadius: 4,
            transform: "translateX(-50%)",
          }}
        />
      </div>
    ))}
    {/* Shelf board */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 18,
        backgroundColor: COLORS.cabinetWood,
        borderRadius: 3,
        boxShadow: "0 6px 10px rgba(0,0,0,0.25)",
      }}
    />
  </div>
);

const Counter: React.FC = () => (
  <>
    {/* Counter top surface */}
    <div
      style={{
        position: "absolute",
        top: 620,
        left: 0,
        width: "100%",
        height: 32,
        backgroundColor: COLORS.counterTop,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    />
    {/* Cabinet body */}
    <div
      style={{
        position: "absolute",
        top: 652,
        left: 0,
        width: "100%",
        height: 360,
        backgroundColor: COLORS.cabinetWood,
      }}
    >
      {/* Door panels */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 24,
            bottom: 24,
            left: 16 + i * 272,
            width: 248,
            border: `6px solid ${COLORS.cabinetWoodDark}`,
            borderRadius: 8,
            opacity: 0.6,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 14,
              width: 10,
              height: 46,
              backgroundColor: COLORS.kettleMetalDark,
              borderRadius: 4,
              transform: "translateY(-50%)",
            }}
          />
        </div>
      ))}
    </div>
  </>
);

const Sink: React.FC = () => (
  <div style={{ position: "absolute", top: 470, left: 130, width: 480 }}>
    {/* Faucet */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 210,
        width: 14,
        height: 80,
        backgroundColor: COLORS.sinkMetalDark,
        borderRadius: 6,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 210,
        width: 90,
        height: 60,
        border: `14px solid ${COLORS.sinkMetalDark}`,
        borderBottom: "none",
        borderRight: "none",
        borderRadius: "60px 0 0 0",
      }}
    />
    {/* Basin */}
    <div
      style={{
        position: "absolute",
        top: 110,
        left: 0,
        width: 480,
        height: 150,
        backgroundColor: COLORS.sinkMetal,
        borderRadius: 16,
        boxShadow: `inset 0 14px 24px rgba(0,0,0,0.25)`,
      }}
    >
      {/* Water + suds */}
      <div
        style={{
          position: "absolute",
          inset: 16,
          backgroundColor: COLORS.suds,
          borderRadius: 12,
          opacity: 0.85,
        }}
      />
      {/* Suds bubbles */}
      {[
        { left: 40, top: 20, size: 26 },
        { left: 90, top: 40, size: 18 },
        { left: 150, top: 16, size: 22 },
        { left: 320, top: 30, size: 28 },
        { left: 380, top: 10, size: 16 },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            backgroundColor: COLORS.white,
            opacity: 0.9,
          }}
        />
      ))}
      {/* Stack of plates leaning in the rack */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: 24 + i * 22,
            bottom: 6,
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: COLORS.white,
            border: `4px solid ${COLORS.sinkMetalDark}`,
            transform: `rotate(${-18 + i * 4}deg)`,
          }}
        />
      ))}
    </div>
  </div>
);

const STEAM_PARTICLES = [0, 1, 2, 3, 4];

const Steam: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {STEAM_PARTICLES.map((i) => {
        const cycle = 95;
        const t = (frame + i * 19) % cycle;
        const progress = t / cycle;
        const riseY = -progress * 160;
        const sway = Math.sin(progress * Math.PI * 2 + i) * 14;
        const opacity = Math.sin(progress * Math.PI) * 0.55;
        const scale = 0.6 + progress * 0.9;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y + riseY,
              width: 28 * scale,
              height: 36 * scale,
              backgroundColor: COLORS.steam,
              borderRadius: "50%",
              opacity,
              filter: "blur(3px)",
            }}
          />
        );
      })}
    </>
  );
};

const BUBBLE_SPOTS = [
  { x: -40, y: -8, phase: 0 },
  { x: 10, y: 6, phase: 0.3 },
  { x: 45, y: -14, phase: 0.6 },
  { x: -12, y: 12, phase: 0.85 },
  { x: 28, y: 2, phase: 0.45 },
];

const Bubbles: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {BUBBLE_SPOTS.map((b, i) => {
        const cycle = 48;
        const t = ((frame + b.phase * cycle) % cycle) / cycle;
        const pulse = Math.sin(t * Math.PI);
        const size = 12 + i * 3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + b.x,
              top: y + b.y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: COLORS.borschLight,
              opacity: Math.max(0, pulse),
              transform: `scale(${0.4 + pulse * 0.9})`,
            }}
          />
        );
      })}
    </>
  );
};

const Burner: React.FC<{ left: number }> = ({ left }) => (
  <div
    style={{
      position: "absolute",
      top: 552,
      left,
      width: 96,
      height: 96,
      borderRadius: "50%",
      backgroundColor: COLORS.burner,
      boxShadow: `inset 0 0 0 6px ${COLORS.burnerGlow}`,
    }}
  />
);

const Kettle: React.FC = () => (
  <div style={{ position: "absolute", top: 410, left: 1230, width: 170, height: 170 }}>
    <Steam x={150} y={-10} />
    {/* Body */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 20,
        width: 130,
        height: 110,
        backgroundColor: COLORS.kettleMetal,
        borderRadius: "50% 50% 30% 30%",
        boxShadow: `inset -10px -12px 0 0 rgba(0,0,0,0.12)`,
      }}
    />
    {/* Lid */}
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 50,
        width: 70,
        height: 24,
        backgroundColor: COLORS.kettleMetalDark,
        borderRadius: "50% 50% 0 0",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 118,
        left: 78,
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: COLORS.kettleMetalDark,
      }}
    />
    {/* Spout */}
    <div
      style={{
        position: "absolute",
        bottom: 70,
        right: 0,
        width: 50,
        height: 22,
        backgroundColor: COLORS.kettleMetal,
        borderRadius: "0 16px 16px 0",
        transform: "rotate(-18deg)",
        transformOrigin: "left center",
      }}
    />
    {/* Handle */}
    <div
      style={{
        position: "absolute",
        bottom: 64,
        left: 0,
        width: 36,
        height: 60,
        border: `10px solid ${COLORS.kettleMetalDark}`,
        borderRight: "none",
        borderRadius: "20px 0 0 20px",
      }}
    />
  </div>
);

const Pot: React.FC = () => (
  <div style={{ position: "absolute", top: 430, left: 1450, width: 230, height: 150 }}>
    <Steam x={110} y={-6} />
    {/* Body */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 230,
        height: 100,
        backgroundColor: COLORS.potBody,
        borderRadius: "16px 16px 24px 24px",
        boxShadow: `inset -10px -10px 0 0 rgba(0,0,0,0.15)`,
      }}
    />
    {/* Borsch surface */}
    <div
      style={{
        position: "absolute",
        top: 92,
        left: 14,
        width: 202,
        height: 26,
        backgroundColor: COLORS.borsch,
        borderRadius: "50%",
      }}
    >
      <Bubbles x={100} y={4} />
    </div>
    {/* Handles */}
    {[0, 1].map((side) => (
      <div
        key={side}
        style={{
          position: "absolute",
          top: 40,
          [side === 0 ? "left" : "right"]: -14,
          width: 28,
          height: 20,
          border: `6px solid ${COLORS.potBodyDark}`,
          borderRadius: 6,
        }}
      />
    ))}
  </div>
);

const Stove: React.FC = () => (
  <div style={{ position: "absolute", top: 560, left: 1180, width: 560, height: 440 }}>
    {/* Body */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.stoveBody,
        borderRadius: 12,
        boxShadow: "0 10px 24px rgba(0,0,0,0.3)",
      }}
    />
    {/* Oven door */}
    <div
      style={{
        position: "absolute",
        top: 140,
        left: 30,
        width: 500,
        height: 250,
        backgroundColor: COLORS.stoveDark,
        borderRadius: 10,
      }}
    >
      {/* Oven window */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          width: 452,
          height: 150,
          backgroundColor: "#2A2620",
          borderRadius: 8,
          opacity: 0.85,
        }}
      />
      {/* Handle */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          width: 200,
          height: 14,
          backgroundColor: COLORS.kettleMetalDark,
          borderRadius: 6,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  </div>
);

/**
 * A nostalgic Soviet-era kitchen: tiled wall, wooden cabinets, a sink, and a
 * stove with a boiling kettle and a bubbling pot of borsch.
 */
export const Kitchen: React.FC = () => (
  <>
    <Wall />
    <Floor />
    <Window />
    <Clock />
    <Shelf />
    <Counter />
    <Sink />
    <Stove />
    {/* Burners sit at the seam between the stove body and its top edge */}
    <Burner left={1180 + 70} />
    <Burner left={1180 + 290} />
    <Kettle />
    <Pot />
  </>
);
