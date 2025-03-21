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
            className="shadow-[0_10px_15px_rgba(0,0,0,0.5)] w-full h-[calc(100%-5rem)] rounded-lg"
            src="https://docs.google.com/document/d/1_4Hof6g6otDW8i3-Jy8eOoEerbcUUeKsnj1SokXh7-M/preview?pli=1"
            allowFullScreen
          />
        </motion.div>
      </main>
    </SmoothScroll>
  );
}
