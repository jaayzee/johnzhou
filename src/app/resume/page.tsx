'use client';

import { motion } from 'framer-motion';
import SmoothScroll from '@/components/Parallax/SmoothScroll';

export default function Resume() {
  return (
    <SmoothScroll>
      <main className="h-screen bg-background pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 h-full"
        >
          <h1 className="text-3xl font-theme mb-12 ml-8 text-foreground">
            Resume ✦
          </h1>
          <iframe
            className="shadow-[0_10px_15px_rgba(0,0,0,0.5)] w-full h-[calc(100%-5rem)] rounded-3xl"
            src="https://embed.figma.com/proto/NMTE3sGj88ML8MhYQKGwQi/Resume?node-id=1-190&node-type=canvas&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
            allowFullScreen
          />
        </motion.div>
      </main>
    </SmoothScroll>
  );
}
