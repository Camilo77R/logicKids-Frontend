// src/components/CookieBanner.tsx
import React, { useState } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="cookiebanner">
      <p>We use cookies to enhance your experience.</p>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
};

export default CookieBanner;