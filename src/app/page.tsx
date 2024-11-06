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

const date = new Date()
const time = date.getHours()

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
              <span className='font-black text-xl text-background'>
                ✦ 周 加 强&nbsp;
              </span>
            </Marquee>
            <div className="container mx-auto px-4 py-16 text-primary">
              <h2 className="text-4xl font-bold mb-6">
                    Good 
                    {time >= 12 ? time >= 16 ? 
                      <span className="
                        bg-[linear-gradient(40deg,_#f8ceaf,_#cbbffd_70%)] 
                        bg-clip-text 
                        text-transparent
                      "> Evening
                      </span> : 
                      <span className="
                        bg-[linear-gradient(40deg,_#fca344,_#55acfa_70%)] 
                        bg-clip-text 
                        text-transparent
                      "> Afternoon
                      </span> : 
                      <span className="
                        bg-[linear-gradient(40deg,_#fca344,_#55acfa_70%)] 
                        bg-clip-text 
                        text-transparent
                      "> Morning
                      </span>}!
              </h2>
              <h3 className="text-lg font-semibold">I&apos;m John, and I&apos;m a ...</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Developer</h3>
                  <p className="text-dim leading-relaxed">
                    As a developer, I do most of my web dev work in front-end and love creating creative, visually-appealing, and intuitive designs.
                    I&apos;m excited about expanding into creative programming, whether it be in computer graphics or software.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Artist</h3>
                  <p className="text-dim leading-relaxed">
                    As an artist, I work in primarily digital, and while I specialize in 2D work, I also mess around in 3D and VFX. I like to hone my
                    artistic abilities parallel to my other interests, as I feel it brings a more interesting spin to my work.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-dim leading-relaxed">
                I&apos;m currently pursuing my B.S in Mathematics - Computer Science at the University of California, San Diego, and will be graduating March of 2025 with a minor in Engineering Mechanics.
                  </p>
              </div>
            </div>
            <ParallaxSection scene={<SpaceScene />}>
              <p className='w-[40vw] text-[2vw] self-end uppercase mix-blend-difference'>
                Not sure what to put here yet. Will probably figure smth out idk
              </p>
              <p className='text-[5vw] uppercase mix-blend-difference'>SOMETHING ABOUT ME</p>
            </ParallaxSection>
            <div className='h-screen'></div>
          </section>
        </main>
    </>
  )
}