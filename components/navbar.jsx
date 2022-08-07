import React from "react";
import TopRightPattern from "./blobs/rightpattern";
const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-2">
        <h1 className="dark:text-white text-4xl">MA</h1>
        <ul className="dark:text-primary flex justify-between gap-7 text-lg leading-6">
          <li>
            <a
              href="#projects"
              className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              Work
            </a>
          </li>
          <li>
            <a href="#">Resume</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <TopRightPattern />
    </>
  );
};

export default Navbar;
