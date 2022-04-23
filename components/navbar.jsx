import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto my-3">
      <h1 className="dark:text-[#ffffff] text-4xl">MA</h1>
      <ul className="dark:text-aqua flex justify-between gap-10">
        <li>
          <a href="#">Work</a>
        </li>
        <li>
          <a href="#">Resume</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
