import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { initialPhotoIndex, photos } from "@/lib/photos";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <Gallery photos={photos} initialIndex={initialPhotoIndex} />
    </div>
  );
}
