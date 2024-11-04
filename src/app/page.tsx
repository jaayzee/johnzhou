import dynamic from 'next/dynamic';
import Marquee from 'react-fast-marquee';

const Scene = dynamic(() => import('@/components/Scene/index'), {
    ssr: false,
})

const ParallaxWrapper = dynamic(() => import('@/components/Parallax/ParallaxWrapper'), {
  ssr: false,
});

const ParallaxSection = dynamic(() => import('@/components/Parallax/ParallaxSection'), {
  ssr: false
});

const SpaceScene = dynamic(() => import('@/components/SpaceScene/index'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
        <main className="relative">
          <ParallaxWrapper>
            <Scene />
          </ParallaxWrapper>
          <section className="absolute top-[100vh] w-full bg-background">
            <Marquee 
              autoFill={true}
              className='bg-foreground py-2'
            >
              <span className='font-black text-lg text-background'>
                ✦ SAMPLE&nbsp;
              </span>
            </Marquee>
            <div className="container mx-auto px-4 py-16 text-primary h-screen">
              <h2 className="text-4xl font-bold mb-6">
                ABOUT ME ABOUT ME ABOUT ME
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">THIS IS ABOUT ME</h3>
                  <p className="text-accent leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                    ea commodo consequat.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">WHAT I LIKE</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• ART</li>
                    <li>• GAMES</li>
                    <li>• STORIES</li>
                    <li>• DEEP SEA</li>
                  </ul>
                </div>
              </div>
            </div>
            <ParallaxSection scene={<SpaceScene />}>
              <p className='w-[50vw] text-[2vw] self-end uppercase mix-blend-difference'>Beauty and quality need the right time to be conceived and realised even in a world that is in too much of a hurry.</p>
              <p className='text-[5vw] uppercase mix-blend-difference'>Background Parallax</p>
            </ParallaxSection>
            <div className='h-screen'></div>
          </section>
        </main>
    </>
  )
}