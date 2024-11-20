import React from 'react';
import ProgressBar from '@/components/ProgressBar';
import { ExternalLink, Globe, Link as LinkIcon } from 'lucide-react';
import data from './projects.json';

interface Project {
  name: string;
  link?: string;
  desc: string;
  quote?: string;
  video?: string;
  stack?: string[];
}

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[7]?.length === 11) ? match[7] : null;
  return videoId 
    ? `https://www.youtube.com/embed/${videoId}`
    : "https://www.youtube.com/embed/dQw4w9WgXcQ?si=dWXVP64nIUMb21G0";
};

const Title = ({ name, link, isMobile = false }: { name: string, link?: string, isMobile?: boolean }) => {  
  const TitleContent = (
    <h2 className="text-4xl font-black tracking-wider text-background flex w-full min-w-0 group-hover:text-destructive transition-colors">
      <span className="flex-shrink-0 whitespace-nowrap">✦&nbsp;</span>
      <span className="break-words uppercase overflow-hidden overflow-ellipsis">{name}</span>
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
      ) : TitleContent}
    </div>
  );
};

const TechStack = ({ stack }: { stack: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {stack.map((tech, index) => (
      <span 
        key={index} 
        className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-bold"
      >
        {tech}
      </span>
    ))}
  </div>
);

const LinkPreview = ({ url }: { url: string }) => {
  const domain = new URL(url).hostname.replace('www.', '');
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-4 rounded-xl border-2 border-muted hover:border-destructive transition  group overflow-hidden"
    >
      <div className="p-4 flex items-start gap-4">
        <img 
          src={favicon}
          alt={`${domain} favicon`}
          className="w-12 h-12 rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-dim group-hover:text-destructive transition-colors duration-500">
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

const ContentBlock = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

const QuoteBlock = ({ quote }: { quote: string }) => (
  <div className='flex rounded-r-2xl bg-muted'>
    <div className="w-3 flex-shrink-0 bg-dim"></div>
    <p className="text-dim py-2 px-4 italic">{quote}</p>
  </div>
);

const VideoCard = ({ project }: { project: Project }) => (
  <>
    <div className="relative lg:w-2/3 aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        src={getYouTubeEmbedUrl(project.video!)}
        title={`${project.name} video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <div className="hidden lg:block lg:w-1/3 bg-foreground-transparent rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] h-fit">
      <div className="bg-foreground p-6 rounded-t-2xl">
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

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="mb-16 bg-foreground-transparent rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]">
    <div className={`${project.video ? 'lg:hidden' : ''} bg-foreground p-8 rounded-t-2xl`}>
      <Title name={project.name} link={project.link} isMobile={true} />
      <Title name={project.name} link={project.link} />
    </div>
    
    <div className="flex gap-4 px-6 pb-8">
      <div className={`${project.video ? 'lg:hidden' : ''} w-3 mx-2 rounded-b-2xl bg-foreground`} />
      <div className="flex-1">
        <div className="flex flex-col lg:flex-row lg:gap-6 pt-6">
          {project.video ? (
            <>
              <VideoCard project={project} />
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
  </div>
);

export default function Work() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-8">
          <h1 className="text-3xl font-theme text-foreground">Work ✦</h1>
        </div>
        
        <div className="flex relative">
          <div className="hidden lg:block w-[200px] flex-shrink-0">
            <div className="fixed w-[200px] h-[calc(100vh-200px)]">
              <h1 className="text-3xl font-theme mb-8 text-foreground">Work ✦</h1>
              <ProgressBar />
            </div>
          </div>
          
          <div className="w-full lg:w-[calc(100%-200px)]">
            <div className="lg:pl-8">
              {data.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};