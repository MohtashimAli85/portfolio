import { Button } from '@/app/components/ui/Button';
import MenuIcon from '@/app/icons/social/MenuIcon';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Item, { mobileLinks } from '../Item';

type Props = {};

const MobileMenu = (props: Props) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const menuElement = menuRef.current;
    if (open) {
      const showMenu = () => {
        if (menuElement) {
          menuElement.classList.remove('-z-10');
        }
      };
      const timeoutId = setTimeout(showMenu);

      return () => clearTimeout(timeoutId);
    } else {
      const hideMenu = () => {
        if (menuElement) {
          menuElement.classList.add('-z-10');
        }
      };
      const timeoutId = setTimeout(hideMenu, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [open]);
  const handleClose = useCallback(() => {
    console.log('pewx')
    setOpen(false);
  }, []);
  return (
    <>
      <Button
        className='px-[18px] md:hidden h-full'
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <MenuIcon className='' />
      </Button>
      <ul
        ref={menuRef}
        style={{
          opacity: open ? 1 : 0
        }}
        className={`bg-primary  top-[57px] -z-10 absolute transition-opacity  h-[calc(100vh-109px)] inset-0 md:hidden [&>li]:border-b [&>li]:border-b-divider`}
      >
        {mobileLinks.map((href) => (
          <Item href={href} key={href} onClick={handleClose} />
        ))}
      </ul>
    </>
  );
};

export default MobileMenu;
