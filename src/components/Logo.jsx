import React from 'react';
import logoIcon from '../assets/logo.png';
import logoFull from '../assets/logo text.png';

const Logo = ({ className = '', style = {}, width = "auto", height = "45px", hideText = false }) => {
  const commonStyle = {
    ...style, 
    display: 'block', 
    width, 
    height, 
    objectFit: 'contain',
    mixBlendMode: 'multiply' // This magically removes the white background on light surfaces!
  };

  if (hideText) {
    // For the Navbar: Use just the icon
    return (
      <img 
        src={logoIcon.src} 
        alt="Sagasa Logo" 
        className={className}
        style={commonStyle}
      />
    );
  }

  // For the Footer: Show the full logo including text
  return (
    <img 
      src={logoFull.src} 
      alt="Sagasa Full Logo" 
      className={className}
      style={commonStyle}
    />
  );
};

export default Logo;
