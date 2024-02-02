'use client';
import MenuIcon from '@/app/icons/social/MenuIcon';
import Item, { links, mobileLinks } from './Item';
import { Button } from '@/app/components/ui/Button';
const Menu = () => {
  return (
    <nav className=' md:basis-[65%] h-full md:border-l md:border-r border-divider'>
      <Button className='px-[18px] md:hidden h-full'>
        <MenuIcon className='' />
      </Button>
      <ul className='hidden md:flex h-full [&>li+li]:border-l [&>li+li]:border-l-divider'>
        {links.map((href) => (
          <Item href={href} key={href} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
