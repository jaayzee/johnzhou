'use client';

import dynamic from 'next/dynamic';
import ProgressBar from '@/components/ProgressBar';

const SmoothScroll = dynamic(
  () => import('@/components/Parallax/SmoothScroll'),
  {
    ssr: false,
  }
);

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-8">
          <h1 className="text-3xl font-theme text-foreground">Work ✦</h1>
        </div>

        <div className="flex relative">
          <div className="hidden lg:block w-[200px] flex-shrink-0">
            <div className="fixed w-[200px] h-[calc(100vh-200px)]">
              <h1 className="text-3xl font-theme mb-8 text-center text-foreground">
                Work ✦
              </h1>
              <ProgressBar />
            </div>
          </div>

          <div className="w-full lg:w-[calc(100%-200px)]">
            <SmoothScroll>
              <div className="lg:pl-8">{children}</div>
            </SmoothScroll>
          </div>
        </div>
      </div>
    </main>
  );
}
