import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Linkedin, Gamepad, Home, Briefcase, Palette, FileText, Send } from 'lucide-react';

const Content = () => {
  const linkStyle = "justify-center text-foreground hover:text-destructive transition-colors flex items-center gap-2";
  
  const navLinks = [
    { text: 'Home', icon: Home, href: '/' },
    { text: 'Work', icon: Briefcase, href: '/work' },
    { text: 'Art', icon: Palette, href: '/art' },
    { text: 'Resume', icon: FileText, href: '/resume' },
    { text: 'Contact', icon: Send, href: '/contact' }
  ];
  
  const links = [
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/jjzee/' },
    { Icon: Github, href: 'https://github.com/jaayzee' },
    { Icon: Instagram, href: 'https://www.instagram.com/jozhoooo' },
    { Icon: Gamepad, href: 'https://steamcommunity.com/id/beloooga/' },
];
  
  return (
    <div className="w-full h-full bg-destructive p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className='self-center'>
            <h3 className='font-theme text-2xl text-background text-center [writing-mode:vertical-lr] sm:[writing-mode:horizontal-tb]'>JOZO</h3>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-center font-theme pt-2 pb-6 text-md text-background">Links</h4>
            <ul className="justify-center h-full rounded-t-xl py-4 sm:flex gap-4 space-y-4 sm:space-y-0 bg-background">
              {navLinks.map(({ text, icon: Icon, href }) => (
                <li key={text}>
                  <Link href={href} className={linkStyle}>
                    <Icon className="w-5 h-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-center font-theme pt-2 pb-6 text-md text-background">Connect</h4>
            <ul className="justify-center h-full rounded-t-xl py-4 sm:flex gap-4 space-y-4 sm:space-y-0 bg-background">
              {links.map(({ Icon, href }) => (
                <li key={href}>
                  <a className={linkStyle} href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div 
      className="relative h-[300px] sm:h-[150px]"
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className="relative h-[calc(100vh+300px)] sm:h-[calc(100vh+150px)] -top-[100vh]">
        <div className="h-[300px] sm:h-[150px] sticky top-[calc(100vh-300px)] sm:top-[calc(100vh-150px)]">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Footer;