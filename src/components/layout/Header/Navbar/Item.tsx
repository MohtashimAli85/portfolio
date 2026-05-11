import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { NavbarRoute } from "./routes";

// export const names: Record<Route, string> = {
//   "/": "_hello",
//   "/about-me/personal-info": "_about-me",

//   "/projects": "_projects",
//   "/contact-me": "_contact-me",
// };
// export const links = Object.keys(names).toSpliced(-1) as Route[];
// export const mobileLinks = Object.keys(names) as Route[];
interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  route: NavbarRoute;
  isMobile?: boolean;
  delay?: string;
  open?: boolean;
}
const Item: FC<Props> = ({ route, isMobile = false, delay, open, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === route.href;
  return (
    <li
      {...rest}
      style={{
        animationDelay: delay || "0",
        animationFillMode: "forwards",
      }}
      className={
        isMobile
          ? `text-2xl uppercase translate-y-4  ${
              open ? "opacity-0  animate-fade-in-up" : "animate-fade-out"
            } ${
              isActive ? "text-pale-orange" : ""
            } hover:text-pale-orange transition-colors ease-in-cubic`
          : `grid md:place-content-center border-b-[3px] last:border-r last:border-r-divider ${
              isActive
                ? "border-pale-orange"
                : " border-transparent text-secondary-dark hover:bg-primary-light"
            } transition-all`
      }
    >
      <Link href={route.href} className="px-[30px] py-[17px]">
        {route.name}
      </Link>
    </li>
  );
};

export default Item;
