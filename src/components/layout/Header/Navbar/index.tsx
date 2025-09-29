"use client";
import Item, { links } from "./Item";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <nav className=" lg:grow h-full lg:border-l lg:border-r border-divider">
      <ul className="hidden lg:flex h-full [&>li+li]:border-l [&>li+li]:border-l-divider">
        {links.map((href) => (
          <Item href={href} key={href} />
        ))}
      </ul>
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
