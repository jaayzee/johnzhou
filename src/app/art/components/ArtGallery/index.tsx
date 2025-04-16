'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Post {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
}

export default function ArtGallery() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const removeHashtags = (caption: string) => {
    if (!caption) return '';
    return caption.split('\n')[0].trim();
  };

  useEffect(() => {
    fetch('/api/instagram')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const processedPosts = data.data.map((post: Post) => ({
          ...post,
          caption: post.caption ? removeHashtags(post.caption) : undefined,
        }));
        setPosts(processedPosts);
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
        setError('Unable to load artwork at this time');
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePrevious = useCallback(() => {
    if (!selectedPost) return;
    const currentIndex = posts.findIndex((post) => post.id === selectedPost.id);
    const previousIndex = (currentIndex - 1 + posts.length) % posts.length;
    setSelectedPost(posts[previousIndex]);
  }, [selectedPost, posts]);

  const handleNext = useCallback(() => {
    if (!selectedPost) return;
    const currentIndex = posts.findIndex((post) => post.id === selectedPost.id);
    const nextIndex = (currentIndex + 1) % posts.length;
    setSelectedPost(posts[nextIndex]);
  }, [selectedPost, posts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedPost(null);
    };

    if (selectedPost) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPost, handleNext, handlePrevious]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !shimmerRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = ((x / rect.width) * 100 - 50) * 0.5;
    const yPercent = ((y / rect.height) * 100 - 50) * 0.5;

    imageRef.current.style.transform = `perspective(1000px) rotateY(${xPercent * 0.1}deg) rotateX(${-yPercent * 0.1}deg)`;

    shimmerRef.current.style.background = `
      linear-gradient(
        ${125 + xPercent * 0.5}deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.05) 25%,
        rgba(255, 255, 255, ${0.1 + Math.abs(xPercent) * 0.002}) 45%,
        rgba(255, 255, 255, ${0.2 + Math.abs(yPercent) * 0.003}) 50%,
        rgba(255, 255, 255, ${0.1 + Math.abs(xPercent) * 0.002}) 55%,
        rgba(255, 255, 255, 0.05) 75%,
        rgba(255, 255, 255, 0) 100%
      )
    `;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-theme mb-8">Artwork ✦</h1>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-theme mb-12 ml-8">Artwork ✦</h1>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-foreground-transparent rounded-2xl shadow-[0_10px_15px_rgba(0,0,0,0.5)] break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  width={500}
                  height={500}
                  className="w-full h-auto transition-all duration-300 
                    filter grayscale-[50%] contrast-[90%] 
                    group-hover:grayscale-0 group-hover:contrast-100 
                    group-hover:scale-105"
                  priority
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setSelectedPost(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="z-10 fixed left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-gray-300 transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="z-10 fixed right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-gray-300 transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedPost(null)}
            className="z-10 fixed top-4 right-4 p-4 text-white hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <a
            href={selectedPost.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 fixed top-4 left-4 p-4 text-white hover:text-gray-300 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <Instagram className="w-6 h-6" />
          </a>

          <div
            className="max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-lg transition-all duration-200 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Image
                src={selectedPost.media_url}
                alt={selectedPost.caption || 'Instagram post'}
                width={1200}
                height={1200}
                className="object-contain max-h-[70vh] w-auto mx-auto rounded-lg"
                priority
              />
              <div
                ref={shimmerRef}
                className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200"
                style={{ mixBlendMode: 'overlay' }}
              />
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  mixBlendMode: 'overlay',
                }}
              />
            </div>

            {selectedPost.caption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-2 font-bold text-white text-2xl rounded mt-4"
              >
                <p className="text-center">{selectedPost.caption}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
