"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function General() {
    const [images, setImages] = useState<string[]>([]);
    const [current, setCurrent] = useState(0);
    const [screenSize, setScreenSize] = useState<"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl" | "">("");
    const hasImages = images.length > 0;

    const clipPathMap = {
        xxs: "polygon(48% 0, 100% 0, 100% 100%, 39.666% 100%)",
        xs: "polygon(48% 0, 100% 0, 100% 100%, 39.666% 100%)",
        sm: "polygon(58% 0, 100% 0, 100% 100%, 49.666% 100%)",
        md: "polygon(66% 0, 100% 0, 100% 100%, 57.666% 100%)",
        lg: "polygon(70% 0, 100% 0, 100% 100%, 61.666% 100%)",
        xl: "polygon(70% 0, 100% 0, 100% 100%, 61.666% 100%)",
        xxl: "polygon(75% 0, 100% 0, 100% 100%, 66.666% 100%)",
        xxxl: "polygon(80% 0, 100% 0, 100% 100%, 71.666% 100%)",
        xxxxl: "polygon(80% 0, 100% 0, 100% 100%, 71.666% 100%)",
        "": "polygon(70% 0, 100% 0, 100% 100%, 61.666% 100%)",
    }

    const overlayPanelStyle = useMemo(
        () => ({
            // Trapezoid: top starts at 75% width, bottom at 66.666% width, fills the right edge
            clipPath: clipPathMap[screenSize],
            background: "linear-gradient(105deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.6) 60%, rgba(255, 255, 255, 1) 100%)",
            backdropFilter: "blur(0.5px)",
        }),
        [screenSize],
    );

    useEffect(() => {
        console.log("overlayContentStyle recomputed: " + screenSize);
    }, [screenSize]);

    // Update screen size on resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 320) setScreenSize("xxs");
            else if (width < 640) setScreenSize("xs");
            else if (width < 768) setScreenSize("sm");
            else if (width < 1024) setScreenSize("md");
            else if (width < 1280) setScreenSize("lg");
            else if (width < 1536) setScreenSize("xl");
            else if (width < 1920) setScreenSize("xxl");
            else if (width < 2560) setScreenSize("xxxl");
            else setScreenSize("xxxxl");
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const overlayContentStyle = useMemo(
        () => ({
            // Match the overlay panel shape so text is fully on top of it
            clipPath: clipPathMap[screenSize],
        }),
        [screenSize],
    );

    const overlayTextStyle = useMemo(() => ({}), []);

    useEffect(() => {
        let active = true;
        fetch("/api/index-photos")
            .then((r) => r.json())
            .then((data: { images: string[] }) => {
                if (!active) return;
                const list = (data?.images ?? []).map((f) => `/index_photo/${f}`);
                setImages(list);
            })
            .catch(() => setImages([]));
        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
        const id = setInterval(() => {
            setCurrent((i) => (i + 1) % images.length);
        }, 5000);
        return () => clearInterval(id);
    }, [images]);

    return (
        <section
            id="general"
            className="relative scroll-mt-24 h-[calc(100vh-6rem)] max-h-200 overflow-hidden w-full mt-4 rounded-xl shadow-lg "
        >
            {/* Slideshow background */}
            <div className="absolute inset-0">
                {hasImages ? (
                    images.map((src, idx) => (
                        <div
                            key={src}
                            className={
                                "absolute inset-0 transition-opacity duration-1000 ease-in-out " +
                                (idx === current ? "opacity-100" : "opacity-0")
                            }
                        >
                            <Image
                                src={src}
                                alt="index photo"
                                fill
                                sizes="100vw"
                                priority={idx === 0}
                                className="object-cover kenburns will-change-transform"
                            />
                        </div>
                    ))
                ) : (
                    <div className="absolute inset-0 bg-gray-100" />
                )}
            </div>
            {/* Vignette overlay for contrast */}
            <div className="absolute inset-0 z-10 bg-linear-to-tr from-black/40 via-black/10 to-transparent pointer-events-none" />

            {/* Right trapezoid glass panel */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 drop-shadow-xl" style={overlayPanelStyle} />
            </div>


            {/* Content */}
            <div
                className="absolute inset-0 z-20 flex items-center justify-end pointer-events-none"
                style={overlayContentStyle}
            >
                
                <div
                    className="text-gray-900/90 text-center w-[30%] max-w-md min-w-60 pointer-events-auto right-0"
                >
                    <Image
                        src="/C3U_ico.png"
                        alt="C³U logo"
                        width={100}
                        height={100}
                        className="h-30 w-30 sm:h-40 sm:w-40 lg:h-50 lg:w-50 xl:h-60 xl:w-60 object-contain drop-shadow-md mb-8 mx-auto"
                        priority
                    />
                    <h2 className="text-md xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold md:font-bold mb-2 tracking-wide text-center">
                        <span className="inline-block">清洁燃烧与碳捕集利用</span>
                        <span className="inline-block">团队</span>
                    </h2>
                    <div className="text-xs xs:text-sm font-bold sm:text-base lg:text-md xl:text-lg leading-relaxed text-center flex flex-col justify-center items-center gap-0.5">
                        <span className="inline-block p-2">C<sup>3+</sup>U Research Group</span>
                        <div className="text-xl text-left text-gray-800/80 dark:text-gray-200/80 leading-relaxed">
                            <span className="" style={{fontFamily: "serif"}}><span className="font-bold text-green-500/80" style={{fontFamily: "sans-serif"}}>C</span>lean Combustion</span><br/>
                            <span className="" style={{fontFamily: "serif"}}><span className="font-bold text-green-500/80" style={{fontFamily: "sans-serif"}}>C</span>O₂ Capture</span><br/>
                            <span className="" style={{fontFamily: "serif"}}><span className="font-bold text-green-500/80" style={{fontFamily: "sans-serif"}}>C</span>O₂ <span className="font-bold text-indigo-500" style={{fontFamily: "sans-serif"}}>U</span>tilization</span><br/>
                        </div>

                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            {images.length > 1 && (
                <div className="absolute z-40 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => setCurrent(i)}
                            className={
                                "h-2.5 w-2.5 rounded-full ring-1 ring-black/20 transition-colors " +
                                (i === current ? "bg-white" : "bg-white/60 hover:bg-white/80")
                            }
                        />
                    ))}
                </div>
            )}
        </section>
    );
}