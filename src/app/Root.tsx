import { Composition } from "remotion";
import { TitleCard, titleCardSchema } from "../pages/title-card/TitleCard";
import { Logo, logoSchema } from "../entities/logo/Logo";
import { BearKitchen } from "../pages/bear-kitchen/BearKitchen";
import { TIMING } from "../pages/bear-kitchen/constants";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render TitleCard
        id="TitleCard"
        component={TitleCard}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={titleCardSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={logoSchema}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      <Composition
        id="BearKitchen"
        component={BearKitchen}
        durationInFrames={TIMING.totalDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
