"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ScreenSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl" | "";

const CLIP_MAP: Record<ScreenSize, string> = {
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
};

function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<ScreenSize>("");

  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      if (w < 320) setSize("xxs");
      else if (w < 640) setSize("xs");
      else if (w < 768) setSize("sm");
      else if (w < 1024) setSize("md");
      else if (w < 1280) setSize("lg");
      else if (w < 1536) setSize("xl");
      else if (w < 1920) setSize("xxl");
      else if (w < 2560) setSize("xxxl");
      else setSize("xxxxl");
    };
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return size;
}

export default function General() {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const screenSize = useScreenSize();
  const hasImages = images.length > 0;

  const clipPath = CLIP_MAP[screenSize];

  useEffect(() => {
    let active = true;
    fetch("/api/index-photos")
      .then((r) => r.json())
      .then((data: { images: string[] }) => {
        if (!active) return;
        setImages((data?.images ?? []).map((f) => `/index_photo/${f}`));
      })
      .catch(() => setImages([]));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images]);

  return (
    <section
      id="general"
      className="relative scroll-mt-24 h-[calc(100vh-6rem)] max-h-200 overflow-hidden w-full mt-4 rounded-xl shadow-lg"
    >
      {/* Slideshow background */}
      <div className="absolute inset-0">
        {hasImages ? (
          images.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === current ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[2px] scale-105"}`}
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

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-tr from-black/40 via-black/10 to-transparent pointer-events-none" />

      {/* Glass panel */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div
          className="absolute inset-0 drop-shadow-xl"
          style={{
            clipPath,
            background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0.9) 100%)",
            backdropFilter: "blur(3px) saturate(1.2)",
            WebkitBackdropFilter: "blur(3px) saturate(1.2)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-end pointer-events-none" style={{ clipPath }}>
        <div className="text-gray-900/90 text-center w-[30%] max-w-md min-w-60 pointer-events-auto">
          <Image
            src="/C3U_ico.png"
            alt="C³U logo"
            width={100}
            height={100}
            className="h-30 w-30 sm:h-40 sm:w-40 lg:h-50 lg:w-50 xl:h-60 xl:w-60 object-contain drop-shadow-md mb-8 mx-auto"
            priority
          />
          <h2 className="text-md xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold md:font-bold mb-2 tracking-wide text-center">
            <span className="inline-block">清洁燃烧与</span>
            <span className="inline-block">碳循环利用</span>
            <span className="inline-block">团队</span>
          </h2>
          <div className="text-xs xs:text-sm font-bold sm:text-base lg:text-md xl:text-lg leading-relaxed text-center flex flex-col justify-center items-center gap-0.5">
            <span className="inline-block p-2">C<sup>3</sup>U Research Group</span>
            <div className="text-xl text-left text-gray-800/80 dark:text-gray-200/80 leading-relaxed">
              <span style={{ fontFamily: "serif" }}>
                <span className="font-bold text-emerald-600/80" style={{ fontFamily: "sans-serif" }}>C</span>lean Combustion
              </span>
              <br />
              <span style={{ fontFamily: "serif" }}>
                <span className="font-bold text-emerald-600/80" style={{ fontFamily: "sans-serif" }}>C</span>arbon Cycle
              </span>
              <br />
              <span style={{ fontFamily: "serif" }}>
                <span className="font-bold text-emerald-600/80" style={{ fontFamily: "sans-serif" }}>C</span>arbon <span className="font-bold text-indigo-500" style={{ fontFamily: "sans-serif" }}>U</span>tilization
              </span>
              <br />
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
              className={`h-2.5 w-2.5 rounded-full ring-1 ring-black/20 transition-colors ${i === current ? "bg-white" : "bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
