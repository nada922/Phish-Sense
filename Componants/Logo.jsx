import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Shield } from 'lucide-react';

const Logo = ({ className = '', showText = true }) => {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <Link
      to={createPageUrl('Home')}
      className={`flex items-center gap-3 group ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl flex items-center justify-center">
          {logoError ? (
            <Shield className="w-6 h-6 text-white" />
          ) : (
            <img 
              src="/logo.png" 
              alt="Phish Sense Logo" 
              className="w-6 h-6 object-contain"
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
      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Phish Sense
        </span>
      )}
    </Link>
  );
};

export default Logo;
