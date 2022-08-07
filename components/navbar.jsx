import React, { useEffect } from "react";
import TopRightPattern from "./blobs/rightpattern";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const links = [
    { title: "Work", href: "#projects" },
    { title: "Resume", href: "#" },
    { title: "Contact", href: "#" },
  ];
  const linkHandler = (e) => {};
  return (
    <>
      <nav className="flex justify-between items-center mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-2">
        <h1 className="dark:text-white text-4xl">MA</h1>
        <ul className="dark:text-primary flex justify-between gap-7 text-lg leading-6">
          {links.map((e, i) => {
            return (
              <li key={e.title + i} onClick={linkHandler}>
                <a
                  href={e.href}
                  className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                >
                  {e.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <TopRightPattern />
    </>
  );
};

export default Navbar;
