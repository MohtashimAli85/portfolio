import React from 'react';

const MenuIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='16'
      fill='none'
      viewBox='0 0 18 16'
    >
      <path
        fill='#607B96'
        d='M0 0h18v2H0V0zm0 7h18v2H0V7zm0 7h18v2H0v-2z'
      ></path>
    </svg>
  );
};

export default MenuIcon;
