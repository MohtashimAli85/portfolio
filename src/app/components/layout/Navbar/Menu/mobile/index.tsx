'use client';
import { Button } from '@/app/components/ui/Button';
import MenuIcon from '@/app/icons/social/MenuIcon';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Item, { mobileLinks } from '../Item';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const MobileMenu = ({ open, handleClose }: Props) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const menuElement = menuRef.current;
    if (open) {
      const showMenu = () => {
        if (menuElement) {
          menuElement.classList.add('z-20');
          menuElement.classList.remove('-z-10');
        }
      };
      const timeoutId = setTimeout(showMenu);

      return () => clearTimeout(timeoutId);
    } else {
      const hideMenu = () => {
        if (menuElement) {
          menuElement.classList.remove('z-20');
          menuElement.classList.add('-z-10');
        }
      };
      const timeoutId = setTimeout(hideMenu, 1200);

      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  return (
    <>
      <div
        style={{
          transform: `scaleY(${open ? 1 : 0})`,
          transformOrigin: 'left bottom',
          willChange: 'transform'
        }}
        className='left-0 top-0 transition-transform duration-[1200ms] ease-in-out-quart  fixed bottom-0 w-full bg-primary-dark h-full '
      ></div>
      <ul
        ref={menuRef}
        className={`   top-[57px]  absolute -z-10  h-[calc(100%-109px)] inset-0 md:hidden grid place-content-center gap-4`}
      >
        {mobileLinks.map((href, index) => (
          <Item
            href={href}
            key={href}
            onClick={handleClose}
            isMobile
            delay={(index+1) * (open?300:0) + 'ms'}
            open={open}
          />
        ))}
      </ul>
    </>
  );
};

export default MobileMenu;
