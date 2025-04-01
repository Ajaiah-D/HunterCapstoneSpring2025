import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

type Props = {
    backimage: string,
    foreimage?: string,
    height: string,
    children: React.ReactNode,
};

const ParallaxScroll = ({backimage, foreimage, children, height}:Props) => {
    const background: BannerLayer = {
        image: backimage,
        translateY: [0, 50],
        opacity: [1, 0.3],
        scale: [1.05, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true
    };

    const headline: BannerLayer = {
        translateY: [0, 30],
        scale: [1, 1.05, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
            {children}
        </div>
        )
    };

    const foreground: BannerLayer = {
        image: foreimage,
        translateY: [0, 15],
        scale: [1, 1.1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true
    };

    const gradientOverlay: BannerLayer = {
        opacity: [0, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: <div className="gradient absolute inset-0"/>
    };

    return (
        <ParallaxBanner
        layers={[background, headline, foreground, gradientOverlay]}
        className={`${height}`}
        />
    );
};

export default ParallaxScroll;