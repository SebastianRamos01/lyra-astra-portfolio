"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { Photo } from "@/lib/photos";

type HeroProps = {
  photo: Photo;
  isFirst: boolean;
};

export function Hero({ photo, isFirst }: HeroProps) {
  const reduceMotion = useReducedMotion();
  // The frame takes each photo's own ratio; CSS eases width/height between photos.
  const ratio = photo.image.width / photo.image.height;

  return (
    <div className="hero-cell">
      <figure className="hero relative m-0" style={{ "--ar": ratio } as React.CSSProperties}>
        <AnimatePresence initial={false}>
          <motion.div
            key={photo.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: reduceMotion ? 0 : 0.42, ease: "easeOut" },
              scale: { duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              sizes="(max-width: 720px) 100vw, 1112px"
              placeholder="blur"
              fetchPriority={isFirst ? "high" : "auto"}
              loading={isFirst ? "eager" : "lazy"}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </figure>
    </div>
  );
}
