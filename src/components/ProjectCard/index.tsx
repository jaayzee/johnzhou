'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Link as LinkIcon } from 'lucide-react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import ErrorBoundary from './ErrorBoundary';
import Image from 'next/image';

interface Project {
  name: string;
  link?: string;
  desc: string;
  quote?: string;
  video?: string;
  stack?: string[];
}

const getYouTubeVideoId = (url: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7]?.length === 11 ? match[7] : null;
  return videoId || 'dQw4w9WgXcQ';
};

export const Title = ({
  name,
  link,
  isMobile = false,
}: {
  name: string;
  link?: string;
  isMobile?: boolean;
}) => {
  const TitleContent = (
    <h2 className="text-4xl font-black tracking-wider text-foreground flex w-full min-w-0 group-hover:text-destructive transition-colors">
      <span className="flex-shrink-0 whitespace-nowrap">✦&nbsp;</span>
      <span className="break-words uppercase overflow-ellipsis">{name}</span>
    </h2>
  );

  return (
    <div className={isMobile ? 'lg:hidden' : 'hidden lg:block w-full'}>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex gap-2 transition-colors w-full"
        >
          {TitleContent}
          <ExternalLink
            className="w-5 h-5 mt-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            aria-hidden="true"
          />
        </a>
      ) : (
        TitleContent
      )}
    </div>
  );
};

export const TechStack = ({ stack }: { stack: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {stack.map((tech, index) => (
      <span
        key={index}
        className="px-4 py-2 rounded-full bg-background text-dim text-sm font-bold"
      >
        {tech}
      </span>
    ))}
  </div>
);

export const LinkPreview = ({ url }: { url: string }) => {
  const domain = new URL(url).hostname.replace('www.', '');
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-4 rounded-xl border-2 border-muted hover:border-destructive transition group overflow-hidden"
    >
      <div className="p-4 flex items-start gap-4">
        <Image
          src={favicon}
          alt={`${domain} favicon`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-xl group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-dim group-hover:text-destructive">
            <Globe className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{domain}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-dim">
            <LinkIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{url}</span>
          </div>
        </div>
        <ExternalLink
          className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-destructive flex-shrink-0"
          aria-hidden="true"
        />
      </div>
    </a>
  );
};

export const ContentBlock = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`space-y-4 ${className}`}>{children}</div>;

export const QuoteBlock = ({ quote }: { quote: string }) => (
  <div className="flex rounded-r-2xl bg-muted">
    <div className="w-3 flex-shrink-0 bg-dim"></div>
    <p className="text-dim py-2 px-4 italic">{quote}</p>
  </div>
);

export const VideoCard = ({ project }: { project: Project }) => {
  const videoId = project.video ? getYouTubeVideoId(project.video) : '';

  // set youtube configs
  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    loadYouTubeAPI();
  }, []);

  return (
    <>
      <div className="relative lg:w-2/3 aspect-video group overflow-hidden rounded-2xl lg:self-center shadow-[0_10px_15px_rgba(0,0,0,0.5)] border border-muted border-4">
        <Plyr
          source={{
            type: 'video' as const,
            sources: [
              {
                src: videoId,
                provider: 'youtube' as const,
              },
            ],
          }}
          options={{
            controls: [
              'play-large',
              'play',
              'progress',
              'current-time',
              'duration',
              'mute',
              'volume',
              'captions',
              'pip',
              'airplay',
              'fullscreen',
            ],
            youtube: {
              // youtube config
              noCookie: true,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              modestbranding: 1,
            },
          }}
        />
      </div>
      <div className="hidden lg:block lg:w-1/3 bg-foreground-transparent rounded-2xl shadow-[0_10px_15px_rgba(0,0,0,0.5)] h-fit">
        <div className="bg-background-transparent p-6 rounded-t-2xl">
          <Title name={project.name} link={project.link} />
        </div>
        <ContentBlock className="p-6">
          <p className="text-dim">{project.desc}</p>
          {project.quote && <QuoteBlock quote={project.quote} />}
          {project.stack && <TechStack stack={project.stack} />}
        </ContentBlock>
      </div>
    </>
  );
};

export const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    className="mb-16 bg-foreground-transparent rounded-2xl shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div
      className={`${project.video ? 'lg:hidden' : ''} bg-background-transparent p-8 rounded-t-2xl`}
    >
      <Title name={project.name} link={project.link} isMobile={true} />
      <Title name={project.name} link={project.link} />
    </div>

    <div className="flex gap-4 px-6 pb-10">
      <div
        className={`${project.video ? 'lg:hidden' : ''} w-3 mx-4 rounded-b-2xl bg-background-transparent`}
      />
      <div className="flex-1">
        <div className="flex flex-col lg:flex-row lg:gap-6 pt-6">
          {project.video ? (
            <>
              <ErrorBoundary>
                <VideoCard project={project} />
              </ErrorBoundary>
              <ContentBlock className="lg:hidden pt-4">
                <p className="text-dim">{project.desc}</p>
                {project.quote && <QuoteBlock quote={project.quote} />}
                {project.stack && <TechStack stack={project.stack} />}
              </ContentBlock>
            </>
          ) : (
            <ContentBlock className="w-full">
              <p className="text-dim">{project.desc}</p>
              {project.quote && <QuoteBlock quote={project.quote} />}
              {project.stack && <TechStack stack={project.stack} />}
              {project.link && <LinkPreview url={project.link} />}
            </ContentBlock>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);
