"use client";
import Item from "./Item";
import MobileMenu from "./MobileMenu";
import navbarRoutes from "./routes";

const Navbar = () => {
  return (
    <nav className=" lg:grow h-full lg:border-l lg:border-r border-divider">
      <ul className="hidden lg:flex h-full [&>li+li]:border-l [&>li+li]:border-l-divider">
        {navbarRoutes.map((route) => (
          <Item route={route} key={route.href} />
        ))}
      </ul>
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
