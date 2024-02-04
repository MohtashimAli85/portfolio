'use client';
import React, { useCallback, useState } from 'react';
import Menu from './Menu';
import ContactMe from './ContactMe';
import MobileMenu from './Menu/mobile';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <header className='relative z-20 h-[56px]   border-b border-divider flex items-center justify-between md:justify-normal'>
        <h1 className='text-secondary-dark md:basis-[20%] pl-[22px]'>
          mohtashim-ali
        </h1>
        <Menu handleToggle={handleToggle} />
        <ContactMe />
      </header>
      <MobileMenu open={open} handleClose={handleClose} />
    </>
  );
};

export default Navbar;
