import React from 'react';

/**
 * SpotlightCard - Overhauled to be a clean, rigid editorial brutalist card.
 */
export const SpotlightCard = ({
  children,
  className = '',
  style = {},
  spotlightColor,
  borderColor,
  tiltAmount,
  ...props
}) => {
  return (
    <div
      style={style}
      className={`relative bg-white border-2 border-black rounded-none transition-all duration-150 overflow-hidden hover:shadow-[6px_6px_0px_#0a0a0a] hover:translate-x-[-3px] hover:translate-y-[-3px] ${className}`}
      {...props}
    >
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};
