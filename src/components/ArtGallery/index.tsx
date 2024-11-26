'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';

interface Post {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  width?: number;
  height?: number;
}

export default function ArtGallery() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const removeHashtags = (caption: string) => {
    if (!caption) return '';
    return caption.split('\n')[0].substring(0, caption.split('\n')[0].length);
  };

  useEffect(() => {
    fetch('/api/instagram')
      .then((res) => res.json())
      .then(async (data) => {
        const postsWithDimensions = await Promise.all(
          data.data.map(async (post: Post) => {
            return new Promise<Post>((resolve) => {
              const imgLoader = document.createElement('img');
              imgLoader.src = post.media_url;
              imgLoader.onload = () => {
                resolve({
                  ...post,
                  caption: post.caption
                    ? removeHashtags(post.caption)
                    : undefined,
                  width: imgLoader.width,
                  height: imgLoader.height,
                });
              };
              imgLoader.onerror = () => {
                resolve(post);
              };
            });
          })
        );
        setPosts(postsWithDimensions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedPost && shimmerRef.current) {
      shimmerRef.current.style.background = `
            linear-gradient(
              125deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.1) 45%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.1) 55%,
              rgba(255, 255, 255, 0.05) 75%,
              rgba(255, 255, 255, 0) 100%
            )
          `;
    }
  }, [selectedPost]);

  const handlePrevious = () => {
    if (!selectedPost) return;
    const currentIndex = posts.findIndex((post) => post.id === selectedPost.id);
    const previousIndex = (currentIndex - 1 + posts.length) % posts.length;
    setSelectedPost(posts[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedPost) return;
    const currentIndex = posts.findIndex((post) => post.id === selectedPost.id);
    const nextIndex = (currentIndex + 1) % posts.length;
    setSelectedPost(posts[nextIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedPost(null);
  };

  useEffect(() => {
    if (selectedPost) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPost]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <LoadingSpinner />;
  }

  // tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !shimmerRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = ((x / rect.width) * 100 - 50) * 0.8;
    const yPercent = ((y / rect.height) * 100 - 50) * 0.8;

    // apply tilt
    imageRef.current.style.transform = `perspective(1000px) rotateY(${xPercent * 0.1}deg) rotateX(${-yPercent * 0.1}deg)`;

    // update shimmer
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
      'perspective(800px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <>
      {/* Mason Wall Gallery */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-theme mb-8 ml-8">Artwork ✦</h1>
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
                  alt={
                    post.caption
                      ? removeHashtags(post.caption)
                      : 'Instagram post'
                  }
                  width={500}
                  height={500}
                  draggable={false}
                  className="w-full h-auto transition-all duration-300 
                            filter grayscale-[30%] contrast-[95%] 
                            group-hover:grayscale-0 group-hover:contrast-100 
                            group-hover:scale-105"
                  priority={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setSelectedPost(null)}
        >
          {/* Image Controls */}
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

          {/* Content Container */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container with Tilt and Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                draggable={false}
                className="object-contain max-h-[70vh] w-auto mx-auto rounded-lg"
                priority
              />
              {/* Shimmer Overlay */}
              <div
                ref={shimmerRef}
                className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200"
                style={{
                  mixBlendMode: 'overlay',
                }}
              />
              {/* Additional Glossy Overlay */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  mixBlendMode: 'overlay',
                }}
              />
            </motion.div>

            {/* Caption */}
            {selectedPost.caption && (
              <div className="w-full p-2 font-bold text-white text-2xl rounded mt-4">
                <p className="text-center">
                  {removeHashtags(selectedPost.caption)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
