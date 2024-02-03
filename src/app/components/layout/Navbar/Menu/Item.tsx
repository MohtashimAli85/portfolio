import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

export const names = {
  '/': '_hello',
  '/about-me': '_about-me',
  '/projects': '_projects',
  '/contact-me': '_contact-me'
};
export const links = Object.keys(names).toSpliced(-1) as Props['href'][];
export const mobileLinks = Object.keys(names) as Props['href'][];
interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  href: keyof typeof names;
}
const Item: FC<Props> = ({ href, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      {...rest}
      className={`grid md:place-content-center border-b-[3px] last:border-r last:border-r-divider ${
        isActive
          ? 'border-pale-orange'
          : ' border-transparent text-secondary-dark hover:bg-primary-light'
      } transition-all`}
    >
      <Link href={href} className='px-[30px] py-[17px]'>
        {names[href]}
      </Link>
    </li>
  );
};

export default Item;
