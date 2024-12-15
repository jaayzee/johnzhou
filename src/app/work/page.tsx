'use client';

import { ProjectCard } from '@/components/ProjectCard';
import data from './projects.json';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/Parallax/SmoothScroll';
import ProgressBar from '@/components/ProgressBar';

export default function Work() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="lg:hidden mb-12">
          <h1 className="text-3xl font-theme text-foreground">Work ✦</h1>
        </div>

        <div className="flex relative">
          <div className="hidden lg:block w-[200px] flex-shrink-0">
            <div className="fixed w-[200px] h-[calc(100vh-200px)]">
              <h1 className="text-3xl font-theme mb-12 text-center text-foreground">
                Work ✦
              </h1>
              <ProgressBar />
            </div>
          </div>

          <div className="w-full lg:w-[calc(100%-200px)]">
            <SmoothScroll>
              <div className="lg:pl-8">
                {data.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </SmoothScroll>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
