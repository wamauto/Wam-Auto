import React from 'react';
import { COMPANY_INFO } from '../data/servicesData';
import { SiSnapchat, SiTiktok, SiInstagram } from 'react-icons/si';

interface SocialLinksProps {
  className?: string;
  variant?: 'badges' | 'minimal' | 'cards';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className = '', 
  variant = 'badges' 
}) => {
  const socials = [
    {
      name: 'TikTok',
      handle: COMPANY_INFO.socials.tiktok.handle,
      url: COMPANY_INFO.socials.tiktok.url,
      color: 'hover:text-[#00F2FE]',
      borderHover: 'hover:border-[#00F2FE]/40',
      bgHover: 'hover:bg-[#00F2FE]/5',
      icon: <SiTiktok className="w-4 h-4" />
    },
    {
      name: 'Instagram',
      handle: COMPANY_INFO.socials.instagram.handle,
      url: COMPANY_INFO.socials.instagram.url,
      color: 'hover:text-[#E1306C]',
      borderHover: 'hover:border-[#E1306C]/40',
      bgHover: 'hover:bg-[#E1306C]/5',
      icon: <SiInstagram className="w-4 h-4" />
    },
    {
      name: 'Snapchat',
      handle: COMPANY_INFO.socials.snapchat.handle,
      url: COMPANY_INFO.socials.snapchat.url,
      color: 'hover:text-[#FFFC00]',
      borderHover: 'hover:border-[#FFFC00]/40',
      bgHover: 'hover:bg-[#FFFC00]/5',
      icon: <SiSnapchat className="w-4 h-4" />
    }
  ];

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {socials.map((soc) => (
          <a
            key={soc.name}
            href={soc.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 transition-all duration-200 ${soc.borderHover} ${soc.bgHover} group`}
          >
            <div className={`w-9 h-9 rounded-lg bg-neutral-800/90 flex items-center justify-center text-neutral-300 transition-colors ${soc.color} group-hover:scale-105 shrink-0`}>
              {soc.icon}
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-neutral-200">{soc.name}</span>
              <span className="block text-xs text-neutral-400 truncate">@{soc.handle}</span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socials.map((soc) => (
        <a
          key={soc.name}
          href={soc.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800/80 text-xs font-medium text-neutral-300 transition-all duration-200 ${soc.color} ${soc.borderHover} hover:bg-neutral-800/80 whitespace-nowrap`}
        >
          {soc.icon}
          <span>@{soc.handle}</span>
        </a>
      ))}
    </div>
  );
};
