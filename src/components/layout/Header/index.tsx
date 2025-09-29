import React from "react";
import Navbar from "./Navbar";
import ContactMe from "./Navbar/ContactMe";

const Header = () => {
  return (
    <header className=" h-[56px]   border-b border-divider flex items-center justify-between md:justify-normal">
      <h1 className="text-secondary-dark md:basis-[300px] pl-[22px] relative z-20">
        mohtashim-ali
      </h1>
      <Navbar />
      <ContactMe />
    </header>
  );
};

export default Header;
