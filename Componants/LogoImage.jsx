import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const LogoImage = ({ size = 'w-6 h-6', className = '', showBackground = true }) => {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {showBackground && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-md opacity-50 transition-opacity" />
      )}
      <div className={`relative ${showBackground ? 'bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl' : ''} flex items-center justify-center`}>
        {logoError ? (
          <Shield className={`${size} text-white`} />
        ) : (
          <img 
            src="/logo.png" 
            alt="Phish Sense Logo" 
            className={`${size} object-contain`}
            onError={(e) => {
              // Try SVG fallback
              if (e.target.src !== '/logo.svg') {
                e.target.src = '/logo.svg';
              } else {
                setLogoError(true);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LogoImage;
