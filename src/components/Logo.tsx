import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden rounded-lg shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        <img 
          src="/logo.png" 
          alt="CurrencyAtlas Logo" 
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          {/* Background with gradient similar to the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-700" />
          
          {/* Globe and stylized S with arrows - simplified SVG representation */}
          <svg 
            viewBox="0 0 100 100" 
            className="relative w-[85%] h-[85%] text-white"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Ring */}
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" opacity="0.8" />
            
            {/* Globe Lines */}
            <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="1" opacity="0.3" />
            <ellipse cx="50" cy="50" rx="15" ry="35" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="15" y1="50" x2="85" y2="50" stroke="white" strokeWidth="1" opacity="0.3" />
            
            {/* Stylized S with Arrows */}
            <path 
              d="M35 65 L45 55 M45 55 L38 55 M45 55 L45 62" 
              stroke="white" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M65 35 L55 45 M55 45 L62 45 M55 45 L55 38" 
              stroke="white" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M45 55 C45 45, 55 55, 55 45" 
              stroke="white" 
              strokeWidth="6" 
              strokeLinecap="round" 
            />
            
            {/* Text curve placeholder */}
            <path 
              id="textPath" 
              d="M20 50 A30 30 0 0 1 80 50" 
              fill="none" 
            />
            <text fill="white" fontSize="8" fontWeight="bold" letterSpacing="1">
              <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                CURRENCYATLAS
              </textPath>
            </text>
          </svg>
        </>
      )}
    </div>
  );
};
