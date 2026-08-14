import React from 'react';
import logoIcon from '../assets/logo.png';
import logoFull from '../assets/logo text.png';

const Logo = ({ className = '', style = {}, width = "auto", height = "45px", hideText = false }) => {
  const commonStyle = {
    ...style, 
    display: 'block', 
    width, 
    height, 
    objectFit: 'contain'
  };
  
  const finalClass = `logo-img ${className}`.trim();

  if (hideText) {
    // For the Navbar: Use just the icon
    return (
      <img 
        src={logoIcon.src} 
        alt="Sagasa Logo" 
        className={finalClass}
        style={commonStyle}
      />
    );
  }

  // For the Footer: Show the full logo including text
  return (
    <img 
      src={logoFull.src} 
      alt="Sagasa Full Logo" 
      className={finalClass}
      style={commonStyle}
    />
  );
};

export default Logo;
