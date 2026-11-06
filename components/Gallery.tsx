"use client";

import { useCallback, useState } from "react";

import type { Photo } from "@/lib/photos";
import { Hero } from "@/components/Hero";
import { ThumbStrip } from "@/components/ThumbStrip";

type GalleryProps = {
  photos: Photo[];
  initialIndex: number;
};

export function Gallery({ photos, initialIndex }: GalleryProps) {
  const [selected, setSelected] = useState(initialIndex);
  const onCenterChange = useCallback((index: number) => setSelected(index), []);

  return (
    <>
      <main className="stage">
        <p className="sr-only" aria-live="polite">
          Foto {selected + 1} de {photos.length}
        </p>
        <Hero photo={photos[selected]} isFirst={selected === initialIndex} />
      </main>
      <ThumbStrip photos={photos} initialIndex={initialIndex} onCenterChange={onCenterChange} />
    </>
  );
}
