import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { NavbarRoute } from "./routes";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  route: NavbarRoute;
  isMobile?: boolean;
  delay?: string;
  open?: boolean;
}
const NavItem: FC<Props> = ({
  route,
  isMobile = false,
  delay,
  open,
  ...rest
}) => {
  const pathname = usePathname();
  const [first] = pathname.split("/").filter(Boolean);
  const isActive = first ? route.href.includes(first) : pathname === route.href;
  return (
    <Link
      {...rest}
      style={{
        animationDelay: delay || "0",
        animationFillMode: "forwards",
      }}
      href={route.href}
      className={` relative px-[30px] py-3 h-full
           ${
             isMobile
               ? `text-2xl uppercase translate-y-4  ${
                   open ? "opacity-0  animate-fade-in-up" : "animate-fade-out"
                 } ${
                   isActive ? "text-pale-orange" : ""
                 } hover:text-pale-orange transition-colors ease-in-cubic`
               : `grid md:place-content-center  last:border-r last:border-r-divider ${
                   isActive
                     ? ""
                     : "  text-secondary-dark hover:bg-primary-light"
                 } transition-all`
           }
        `}
    >
      {route.name}
      <hr
        data-show={isActive}
        className="hidden data-[show='true']:block w-full bottom-0 absolute text-pale-orange bg-pale-orange h-1"
      />
    </Link>
  );
};

export default NavItem;
