import React from 'react';
import Menu from './Menu';
import ContactMe from './ContactMe';

const Navbar = () => {
  return (
    <header className='h-[56px] bg-primary  border-b border-divider flex items-center justify-between md:justify-normal'>
      <h1 className='text-secondary-dark md:basis-[20%] pl-[22px]'>mohtashim-ali</h1>
      <Menu/>
      <ContactMe/>
    </header>
  );
};

export default Navbar;
