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

const developerSkills = ['React | React Native', 'TypeScript | JavaScript', 'Three.js', 'Python', 'Java', 'C | C++ | C#'];
const artistSkills = ['Procreate | Clip Studio', 'UI | UX', 'Figma', 'Blender', 'CAD', 'Product Design'];

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
            <div className="container mx-auto px-4 py-16 h-screen text-primary">
              <h2 className="text-4xl font-bold mb-6">
                    Good 
                    {time >= 12 ? time >= 16 ? 
                      <span className="
                        bg-[linear-gradient(40deg,_#f8ceaf,_#cbbffd_70%)] 
                        bg-clip-text 
                        text-transparent
                        font-black
                      "> Evening
                      </span> : 
                      <span className="
                        bg-[linear-gradient(40deg,_#fca344,_#55acfa_70%)] 
                        bg-clip-text 
                        text-transparent
                        font-black
                      "> Afternoon
                      </span> : 
                      <span className="
                        bg-[linear-gradient(40deg,_#fca344,_#55acfa_70%)] 
                        bg-clip-text 
                        text-transparent
                      "> Morning
                      </span>}!
              </h2>
              <h3 className="text-lg font-semibold mb-8">I&apos;m John, and I&apos;m a(n) ...</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-theme mb-8">Developer</h3>
                  <p className="text-dim leading-relaxed mb-4">
                    As a developer, I do most of my web dev work in front-end and love fabricating creative, visually-appealing, and intuitive designs of all kinds.
                    I&apos;m excited about continuing to expanding into creative programming, whether it be in computer graphics / shaders, games, or further into software.
                    I thrive in environments that value collaboration and feel like a community inside and outside of work.
                  </p>
                  <p className='mb-2 font-bold text-center'>Languages</p>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dim to-transparent mb-4" />
                  <ul className="list-none space-y-2">
                    {developerSkills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="text-primary">✦</span>
                        <span className="text-dim">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-theme mb-8">Artist</h3>
                  <p className="text-dim leading-relaxed mb-4">
                    As an artist, I work in primarily digital, and while I specialize in 2D work, I also mess around in 3D and VFX. I like to hone my
                    artistic abilities parallel to my other interests, as I feel it brings a more interesting spin to my work. I&apos;m very into stylized rendering
                    and want to create immerisive environments and landscapes. I take heavy inspiration from artists like{' '}
                    <a 
                      href='https://felicia-chen.com/'
                      target='_blank'
                      className='font-bold text-foreground underline hover:text-destructive'
                    >
                      Felicia Chen
                    </a>,{' '}
                    <a 
                      href='https://aliyachen.com/'
                      target='_blank'
                      className='font-bold text-foreground underline hover:text-destructive'
                    >
                      Aliya Chen
                    </a>, and{' '}
                    <a
                      href='https://www.instagram.com/plunteere/?hl=en'
                      target='_blank'
                      className='font-bold text-foreground underline hover:text-destructive'
                    >
                      Plunteere
                    </a>.
                  </p>
                  <p className='mb-2 font-bold text-center'>Tool / Skill</p>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dim to-transparent mb-4" />
                  <ul className="list-none space-y-2">
                    {artistSkills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="text-primary">✦</span>
                        <span className="text-dim">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-dim leading-relaxed">
                I&apos;m currently pursuing my B.S in Mathematics - Computer Science at the University of California, San Diego, and will be graduating March of 2025 with a minor in Engineering Mechanics.
                  </p>
              </div>
            </div>
            <ParallaxSection scene={<SpaceScene />}>
              <p className='font-theme ml-auto text-[2vw]'>
                Interactive
              </p>
              <p className='font-theme text-[6vh]'>
                Star Field
              </p>
            </ParallaxSection>
            <div className='h-screen'>
              
            </div>
          </section>
        </main>
    </>
  )
}