import Github from "@/app/icons/social/github";
import Linkedin from "@/app/icons/social/linkedin";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-[50px] relative z-20   border-t border-theme-stroke flex items-center justify-between">
      <div className="h-full items-center flex-1 md:flex-none flex justify-between pl-[22px] md:border-r border-theme-stroke text-theme-foreground">
        <h6 className="whitespace-nowrap pr-4">find me in:</h6>
        <div className="flex h-full">
          <a
            target="_blank"
            href="https://github.com/mohtashimali85"
            className="md:hidden border-l border-theme-stroke w-[20px] grid place-content-center px-[20px] [&>svg]:w-[20px] h-full text-theme-foreground transition-colors hover:bg-primary-light "
          >
            <Github />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/mohtashim-ali85/"
            className="border-l border-theme-stroke w-[20px] grid place-content-center px-[20px] [&>svg]:w-[20px] h-full text-theme-foreground transition-colors hover:bg-primary-light "
          >
            <Linkedin />
          </a>
        </div>
      </div>
      <div className="border-l hidden md:block border-theme-stroke basis-[8.58%]  h-full ">
        <a
          target="_blank"
          href="https://github.com/mohtashimali85"
          className="px-[22px] text-theme-foreground transition-colors hover:bg-primary-light h-full flex items-center gap-1"
        >
          @mohtashimali85 <Github />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
