import ArtGallery from '@/components/ArtGallery';
import SmoothScroll from '@/components/Parallax/SmoothScroll';

export default function ArtPage() {
  return (
    <main className="min-h-screen pt-16">
      <SmoothScroll>
        <ArtGallery />
      </SmoothScroll>
    </main>
  );
}
