"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Item, { mobileLinks } from "./Item";
import { Button } from "@/components/ui/Button";
import MenuIcon from "@/app/icons/social/MenuIcon";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const menuElement = menuRef.current;
    if (open) {
      const showMenu = () => {
        if (menuElement) {
          menuElement.classList.add("z-20");
          menuElement.classList.remove("-z-10");
        }
      };
      const timeoutId = setTimeout(showMenu);

      return () => clearTimeout(timeoutId);
    } else {
      const hideMenu = () => {
        if (menuElement) {
          menuElement.classList.remove("z-20");
          menuElement.classList.add("-z-10");
        }
      };
      const timeoutId = setTimeout(hideMenu, 1200);

      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  return (
    <>
      <Button
        aria-expanded={open}
        className="px-[18px] relative z-20 lg:hidden h-full aria-expanded:[&>svg]:text-pale-orange"
        onClick={handleToggle}
      >
        <MenuIcon />
      </Button>
      <div
        style={{
          clipPath: `inset(0% 0% ${open ? "0%" : "100%"} 0%)`,
        }}
        className="left-[17px] top-[17px] h-[calc(100%-34px)] z-10 transition-[clip-path] duration-1200 ease-in-out-quart fixed bottom-0 w-[calc(100vw-34px)] mx-auto bg-primary-dark rounded-lg will-change-[clip-path]"
      ></div>
      <ul
        ref={menuRef}
        className={`   top-[74px]  fixed -z-10  h-[calc(100vh-141px)] inset-0 md:hidden grid place-content-center gap-4`}
      >
        {mobileLinks.map((href, index) => (
          <Item
            href={href}
            key={href}
            onClick={handleClose}
            isMobile
            delay={open ? 600 + index * 100 + "ms" : "0ms"}
            open={open}
          />
        ))}
      </ul>
    </>
  );
};

export default MobileMenu;
