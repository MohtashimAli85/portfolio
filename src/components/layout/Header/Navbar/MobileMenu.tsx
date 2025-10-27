"use client";
import MenuIcon from "@/app/icons/social/MenuIcon";
import { Button } from "@/components/ui/Button";
import { useCallback, useRef, useState } from "react";
import Item, { mobileLinks } from "./Item";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const newOpen = !open;
    setOpen(newOpen);

    timeoutRef.current = setTimeout(() => {
      setShowItems(newOpen);
      timeoutRef.current = null;
    }, 600);
  };

  const handleClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(false);
    timeoutRef.current = setTimeout(() => {
      setShowItems(false);
      timeoutRef.current = null;
    }, 600);
  }, []);

  const menuRef = useRef<HTMLUListElement>(null);

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
        className={`   top-[74px]  fixed  h-[calc(100vh-141px)] inset-0 md:hidden grid place-content-center gap-4 ${
          showItems ? "opacity-100 z-20" : "opacity-0 -z-10 "
        }        `}
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
