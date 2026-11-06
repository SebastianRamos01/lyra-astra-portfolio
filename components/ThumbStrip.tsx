"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import type { Photo } from "@/lib/photos";

// Loop needs more slides than fit in the viewport, so the list is repeated.
const COPIES = 3;

type ThumbStripProps = {
  photos: Photo[];
  initialIndex: number;
  onCenterChange: (index: number) => void;
};

export function ThumbStrip({ photos, initialIndex, onCenterChange }: ThumbStripProps) {
  const count = photos.length;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    startIndex: count + initialIndex,
    duration: 28,
    dragFree: true, // no snapping: the strip glides and stops wherever it lands
  });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const centerRef = useRef(initialIndex);

  const setViewport = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef],
  );

  // Dock-style scale: 1 at the center, falling off with distance measured in slots.
  const applyScale = useCallback(() => {
    const viewport = viewportRef.current;
    const first = slideRefs.current[0];
    if (!viewport || !first) return;

    const vr = viewport.getBoundingClientRect();
    const mid = vr.left + vr.width / 2;
    const slot = first.offsetWidth;
    let nearest = 0;
    let nearestDistance = Infinity;

    slideRefs.current.forEach((slide, i) => {
      const thumb = thumbRefs.current[i];
      if (!slide || !thumb) return;
      const r = slide.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid) / slot;
      const scale = 0.34 + 0.66 * Math.exp(-(d * d) / 1.6);
      thumb.style.setProperty("--s", scale.toFixed(4));
      thumb.style.zIndex = String(1000 - Math.round(d * 10));
      if (d < nearestDistance) {
        nearestDistance = d;
        nearest = i;
      }
    });

    // Without snapping, the selection is whichever thumbnail sits closest to the center.
    const center = nearest % count;
    if (center !== centerRef.current) {
      centerRef.current = center;
      onCenterChange(center);
    }
  }, [count, onCenterChange]);

  // Cascade out from the center: each thumbnail's delay step is its distance in slots.
  const revealThumbs = useCallback(() => {
    const viewport = viewportRef.current;
    const first = slideRefs.current[0];
    if (!viewport || !first) return;

    const vr = viewport.getBoundingClientRect();
    const mid = vr.left + vr.width / 2;
    const slot = first.offsetWidth;
    const lastStep = Math.ceil(vr.width / 2 / slot);

    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const r = slide.getBoundingClientRect();
      const step = Math.round(Math.abs(r.left + r.width / 2 - mid) / slot);
      thumbRefs.current[i]?.style.setProperty("--i", String(Math.min(step, lastStep)));
    });
    viewport.setAttribute("data-ready", "");
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    let frame = 0;
    const queue = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          applyScale();
        });
      }
    };
    applyScale();
    // Thumbnails stay hidden until positioned and scaled, so the flat server markup never shows.
    const reveal = requestAnimationFrame(revealThumbs);
    emblaApi.on("scroll", queue).on("reInit", queue).on("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(reveal);
      emblaApi.off("scroll", queue).off("reInit", queue).off("resize", queue);
    };
  }, [emblaApi, applyScale, revealThumbs]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  const slides = Array.from({ length: COPIES }, (_, copy) =>
    photos.map((photo, i) => ({ photo, i, index: copy * count + i, isCopy: copy !== 1 })),
  ).flat();

  return (
    <section
      className="mx-auto w-full max-w-[900px] pb-2.5"
      aria-roledescription="carousel"
      aria-label="Fotografías"
    >
      <div
        ref={setViewport}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="strip-viewport cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <div className="strip-track flex">
          {slides.map(({ photo, i, index, isCopy }) => {
            const landscape = photo.image.width > photo.image.height;
            return (
              <div
                key={`${photo.id}-${index}`}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                className="strip-slide relative min-w-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${count}`}
                aria-hidden={isCopy || undefined}
              >
                <button
                  ref={(node) => {
                    thumbRefs.current[index] = node;
                  }}
                  type="button"
                  tabIndex={-1}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Ver foto ${i + 1}: ${photo.alt}`}
                  className={`thumb${landscape ? " thumb--land" : ""}`}
                >
                  <Image
                    src={photo.image}
                    alt=""
                    sizes="320px"
                    draggable={false}
                    className="thumb-img"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
