'use client';
import MenuIcon from '@/app/icons/social/MenuIcon';
import Item, { links, mobileLinks } from './Item';
import { Button } from '@/app/components/ui/Button';
import { useState } from 'react';
import MobileMenu from './mobile';
const Menu = () => {
  return (
    <nav className=' md:basis-[65%] h-full md:border-l md:border-r border-divider'>
      <ul className='hidden md:flex h-full [&>li+li]:border-l [&>li+li]:border-l-divider'>
        {links.map((href) => (
          <Item href={href} key={href} />
        ))}
      </ul>
      <MobileMenu/>
    </nav>
  );
};

export default Menu;
