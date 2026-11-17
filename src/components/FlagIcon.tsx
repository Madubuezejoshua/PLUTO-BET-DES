import React from 'react';
import type { CountryCode } from '../data/worldCupData';

interface FlagIconProps {
  code: CountryCode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<FlagIconProps['size']>, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-11 h-11',
};

export const FlagIcon: React.FC<FlagIconProps> = ({ code, size = 'md', className = '' }) => {
  const sizeClass = SIZE_CLASSES[size];

  const renderSvg = () => {
    switch (code) {
      case 'ARG':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="10.67" y="0" fill="#74ACDF" />
            <rect width="32" height="10.67" y="10.67" fill="#FFFFFF" />
            <rect width="32" height="10.67" y="21.33" fill="#74ACDF" />
            <circle cx="16" cy="16" r="3.4" fill="#F6B40E" />
          </svg>
        );
      case 'BRA':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#009739" />
            <polygon points="16,4 28,16 16,28 4,16" fill="#FEDD00" />
            <circle cx="16" cy="16" r="5.5" fill="#012169" />
            <path d="M11 15.2 Q16 13 21 16.5" stroke="#FFFFFF" strokeWidth="1.3" fill="none" />
          </svg>
        );
      case 'FRA':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="10.67" height="32" x="0" fill="#002395" />
            <rect width="10.67" height="32" x="10.67" fill="#FFFFFF" />
            <rect width="10.67" height="32" x="21.33" fill="#ED2939" />
          </svg>
        );
      case 'GER':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="10.67" y="0" fill="#111111" />
            <rect width="32" height="10.67" y="10.67" fill="#DD0000" />
            <rect width="32" height="10.67" y="21.33" fill="#FFCE00" />
          </svg>
        );
      case 'USA':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#FFFFFF" />
            {[0, 4.6, 9.2, 13.8, 18.4, 23, 27.6].map((y, i) => (
              <rect key={i} width="32" height="2.4" y={y} fill="#B22234" />
            ))}
            <rect width="16" height="16.2" x="0" y="0" fill="#3C3B6E" />
            <circle cx="4" cy="4" r="1" fill="#FFF" />
            <circle cx="8" cy="4" r="1" fill="#FFF" />
            <circle cx="12" cy="4" r="1" fill="#FFF" />
            <circle cx="6" cy="8" r="1" fill="#FFF" />
            <circle cx="10" cy="8" r="1" fill="#FFF" />
            <circle cx="4" cy="12" r="1" fill="#FFF" />
            <circle cx="8" cy="12" r="1" fill="#FFF" />
            <circle cx="12" cy="12" r="1" fill="#FFF" />
          </svg>
        );
      case 'MEX':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="10.67" height="32" x="0" fill="#006847" />
            <rect width="10.67" height="32" x="10.67" fill="#FFFFFF" />
            <rect width="10.67" height="32" x="21.33" fill="#CE1126" />
            <circle cx="16" cy="16" r="2.8" fill="#8B5A2B" />
          </svg>
        );
      case 'ESP':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="8" y="0" fill="#AA151B" />
            <rect width="32" height="16" y="8" fill="#F1BF00" />
            <rect width="32" height="8" y="24" fill="#AA151B" />
            <rect width="4" height="6" x="8" y="13" rx="1" fill="#AA151B" />
          </svg>
        );
      case 'ITA':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="10.67" height="32" x="0" fill="#009246" />
            <rect width="10.67" height="32" x="10.67" fill="#FFFFFF" />
            <rect width="10.67" height="32" x="21.33" fill="#CE2B37" />
          </svg>
        );
      case 'JPN':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#FFFFFF" />
            <circle cx="16" cy="16" r="7.5" fill="#BC002D" />
          </svg>
        );
      case 'CRO':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="10.67" y="0" fill="#FF0000" />
            <rect width="32" height="10.67" y="10.67" fill="#FFFFFF" />
            <rect width="32" height="10.67" y="21.33" fill="#171796" />
            <rect x="11.5" y="10.5" width="9" height="10" fill="#FFFFFF" stroke="#FF0000" strokeWidth="1" />
            <rect x="12" y="11" width="4" height="4" fill="#FF0000" />
            <rect x="16" y="15" width="4" height="4" fill="#FF0000" />
          </svg>
        );
      case 'RSA':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="16" y="0" fill="#E03C31" />
            <rect width="32" height="16" y="16" fill="#001489" />
            <polygon points="0,0 16,16 0,32" fill="#000000" />
            <path d="M0,3 L14,16 L0,29 M14,16 L32,16" stroke="#007749" strokeWidth="5" fill="none" />
          </svg>
        );
      case 'KOR':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#FFFFFF" />
            <circle cx="16" cy="16" r="6.5" fill="#CD2E3A" />
            <path d="M9.5,16 A6.5,6.5 0 0,0 22.5,16 A3.25,3.25 0 0,1 16,16 A3.25,3.25 0 0,0 9.5,16 Z" fill="#0047A0" />
            <path d="M5,7 L8,10 M24,7 L27,10 M5,25 L8,22 M24,25 L27,22" stroke="#111111" strokeWidth="1.8" />
          </svg>
        );
      case 'CAN':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="8" height="32" x="0" fill="#FF0000" />
            <rect width="16" height="32" x="8" fill="#FFFFFF" />
            <rect width="8" height="32" x="24" fill="#FF0000" />
            <polygon points="16,9 18,14 22,13 19,17 21,21 16,19 11,21 13,17 10,13 14,14" fill="#FF0000" />
          </svg>
        );
      case 'MAR':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#C1272D" />
            <polygon points="16,9 18.2,15.5 25,15.5 19.5,19.5 21.5,26 16,22 10.5,26 12.5,19.5 7,15.5 13.8,15.5" fill="none" stroke="#006233" strokeWidth="1.8" />
          </svg>
        );
      case 'SCO':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#005EB8" />
            <path d="M0,0 L32,32 M32,0 L0,32" stroke="#FFFFFF" strokeWidth="5" />
          </svg>
        );
      case 'AUS':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#00008B" />
            <rect width="15" height="14" fill="#012169" />
            <path d="M0,0 L15,14 M15,0 L0,14" stroke="#FFF" strokeWidth="2.2" />
            <path d="M7.5,0 L7.5,14 M0,7 L15,7" stroke="#C8102E" strokeWidth="2.5" />
            <circle cx="24" cy="10" r="1.4" fill="#FFF" />
            <circle cx="21" cy="19" r="1.4" fill="#FFF" />
            <circle cx="26" cy="23" r="1.4" fill="#FFF" />
          </svg>
        );
      case 'TUN':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#E70013" />
            <circle cx="16" cy="16" r="7" fill="#FFFFFF" />
            <circle cx="16.8" cy="16" r="4.5" fill="#E70013" />
            <circle cx="18.2" cy="16" r="3.6" fill="#FFFFFF" />
            <polygon points="18,13.5 19,15.5 21,15.5 19.5,16.8 20,18.8 18,17.5 16,18.8 16.5,16.8 15,15.5 17,15.5" fill="#E70013" />
          </svg>
        );
      case 'POL':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="16" y="0" fill="#FFFFFF" />
            <rect width="32" height="16" y="16" fill="#DC143C" />
          </svg>
        );
      case 'ENG':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="32" fill="#FFFFFF" />
            <rect width="6" height="32" x="13" fill="#CE1124" />
            <rect width="32" height="6" y="13" fill="#CE1124" />
          </svg>
        );
      case 'POR':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="13" height="32" x="0" fill="#006600" />
            <rect width="19" height="32" x="13" fill="#FF0000" />
            <circle cx="13" cy="16" r="4.5" fill="#FFCC00" />
          </svg>
        );
      case 'NED':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="32" height="10.67" y="0" fill="#AE1C28" />
            <rect width="32" height="10.67" y="10.67" fill="#FFFFFF" />
            <rect width="32" height="10.67" y="21.33" fill="#21468B" />
          </svg>
        );
      case 'BEL':
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <rect width="10.67" height="32" x="0" fill="#000000" />
            <rect width="10.67" height="32" x="10.67" fill="#FAE042" />
            <rect width="10.67" height="32" x="21.33" fill="#ED2939" />
          </svg>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ring-1 ring-black/15 dark:ring-white/15 shadow-sm ${sizeClass} ${className}`}
      aria-label={code}
    >
      {renderSvg()}
    </span>
  );
};
