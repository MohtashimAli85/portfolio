'use client';
import { Button } from '@/app/components/ui/Button';
import Item, { links } from './Item';
import { FC } from 'react';
import MenuIcon from '@/app/icons/social/MenuIcon';
interface Props {
  handleToggle: () => void;
}
const Menu:FC<Props> = ({handleToggle}) => {
  return (
    <nav className=' md:basis-[75%] h-full md:border-l md:border-r border-divider'>
      <ul className='hidden md:flex h-full [&>li+li]:border-l [&>li+li]:border-l-divider'>
        {links.map((href) => (
          <Item href={href} key={href} />
        ))}
      </ul>
      <Button className='px-[18px] md:hidden h-full' onClick={handleToggle}>
        <MenuIcon className='' />
      </Button>
    </nav>
  );
};

export default Menu;
