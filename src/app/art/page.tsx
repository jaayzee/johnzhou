import dynamic from 'next/dynamic';
import ArtGallery from '@/components/ArtGallery';

const SmoothScroll = dynamic(
  () => import('@/components/Parallax/SmoothScroll'),
  {
    ssr: false,
  }
);

export default function ArtPage() {
  return (
    <main className="min-h-screen pt-16">
      <SmoothScroll>
        <ArtGallery />
      </SmoothScroll>
    </main>
  );
}
