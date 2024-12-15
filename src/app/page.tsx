'use client';

import dynamic from 'next/dynamic';
import Marquee from 'react-fast-marquee';
import {
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import PolaroidScene from '@/components/PolaroidScene/index';
import OverlayCards from '@/components/OverlayCards';

const Scene = dynamic(() => import('@/components/Scene/index'), {
  ssr: false,
});

const SpaceScene = dynamic(() => import('@/components/SpaceScene/index'), {
  ssr: false,
});

const ParallaxWrapper = dynamic(
  () => import('@/components/Parallax/ParallaxWrapper'),
  {
    ssr: false,
  }
);

const ParallaxSection = dynamic(
  () => import('@/components/Parallax/ParallaxSection'),
  {
    ssr: false,
  }
);

const date = new Date();
const time = date.getHours();

const developerSkills = [
  'React | React Native',
  'TypeScript | JavaScript',
  'Three.js',
  'Python',
  'Java',
  'C | C++ | C#',
];
const artistSkills = [
  'Procreate | Clip Studio',
  'UI | UX',
  'Figma',
  'Blender',
  'CAD',
  'Product Design',
];

const DevCard = () => (
  <>
    <h3 className="text-2xl font-theme bg-background-transparent p-8 rounded-t-2xl">
      Developer
    </h3>
    <p className="text-dim leading-relaxed p-8">
      As a developer, I do most of my web dev work in front-end and love
      fabricating creative, visually-appealing, and intuitive designs of all
      kinds.
    </p>
    <div className="bg-foreground-transparent rounded-b-2xl">
      <p className="font-bold text-center p-4">Languages</p>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dim to-transparent" />
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {developerSkills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-background text-dim text-sm font-bold"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </>
);

const ArtistCard = () => (
  <>
    <h3 className="text-2xl font-theme bg-background-transparent p-8 rounded-t-2xl">
      Artist
    </h3>
    <p className="text-dim leading-relaxed p-8">
      As an artist, I work primarily in digital, and while I specialize in 2D
      work, I also mess around in 3D and VFX.
    </p>
    <div className="bg-foreground-transparent rounded-b-2xl">
      <p className="font-bold text-center p-4">Tools / Skills</p>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dim to-transparent" />
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {artistSkills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-background text-dim text-sm font-bold"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </>
);

export default function Home() {
  return (
    <main>
      {/* Main Scene */}
      <div className="h-screen w-full relative">
        <ParallaxWrapper>
          <Scene />
          <ChevronDown className="text-foreground w-12 h-12 absolute bottom-8 left-1/2 -translate-x-1/2 -ml-6 animate-bounce" />
        </ParallaxWrapper>
      </div>

      {/* Content */}
      <div className="w-full bg-background">
        {/* Marquee and Cards */}
        <div className="h-screen flex flex-col">
          <Marquee
            autoFill={true}
            className="bg-foreground py-4 sm:py-2 select-none"
          >
            <span className="font-black text-xl text-background">
              ✦ 周 加 强&nbsp;
            </span>
          </Marquee>
          <div className="flex-1 px-8 py-8 flex flex-col justify-evenly">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-center text-2xl xs:text-4xl font-bold">
                Good
                {time >= 12 ? (
                  time >= 16 ? (
                    <span
                      style={{
                        WebkitTextStroke: '1px var(--foreground-transparent)',
                      }}
                      className="bg-gradient-to-r from-[#f8ceaf] to-[#cbbffd] bg-clip-text text-transparent font-black"
                    >
                      {' '}
                      Evening
                    </span>
                  ) : (
                    <span
                      style={{
                        WebkitTextStroke: '1px var(--foreground-transparent)',
                      }}
                      className="bg-gradient-to-r from-[#fca344] to-[#55acfa] bg-clip-text text-transparent font-black"
                    >
                      {' '}
                      Afternoon
                    </span>
                  )
                ) : (
                  <span
                    style={{
                      WebkitTextStroke: '1px var(--foreground-transparent)',
                    }}
                    className="bg-gradient-to-r from-[#fca344] to-[#55acfa] bg-clip-text text-transparent"
                  >
                    {' '}
                    Morning
                  </span>
                )}
                !
              </h2>
              <h3 className="flex justify-center text-dim text-sm xs:text-lg font-semibold">
                I&apos;m John, and I&apos;m a(n) ...
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex justify-center min-h-[30rem]"
            >
              <OverlayCards
                leftChild={<DevCard />}
                rightChild={<ArtistCard />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <p className="text-dim xs:text-lg text-sm leading-relaxed max-w-2xl text-center mt-24 mb-8 xs:mt-0">
                I&apos;m currently pursuing my BS in{' '}
                <strong>Mathematics|Computer Science</strong> at the{' '}
                <strong>University of California, San Diego</strong>, and will
                be graduating March of 2025 with a minor in{' '}
                <strong>Engineering Mechanics</strong>.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Star Field */}
        <div className="touch-auto">
          <ParallaxSection scene={<SpaceScene />}>
            <div className="select-none relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="ml-auto bg-background-transparent backdrop-blur-sm my-5 pl-5 pr-10 py-5 rounded-l-xl pointer-events"
              >
                <p className="flex space-x-4 text-foreground">
                  <ChevronLeft />
                  <MousePointerClick />
                  <ChevronRight />
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mr-auto bg-background-transparent backdrop-blur-sm my-5 px-20 py-10 rounded-r-xl"
              >
                <p className="font-theme text-foreground text-[4vh]">
                  Snapshots
                </p>
              </motion.div>
            </div>
          </ParallaxSection>
        </div>

        {/* Polaroids */}
        <div className="h-screen overflow-clip overflow-y-visible">
          <PolaroidScene />
        </div>
      </div>
    </main>
  );
}
