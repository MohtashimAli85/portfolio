import useActivePath from "@/hooks/use-active-path";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
  className = "",
  ...rest
}) => {
  const { matches } = useActivePath();
  const isActive = matches(route.href.split("/")[1] || "/");
  return (
    <Link
      {...rest}
      style={{
        animationDelay: delay || "0",
        animationFillMode: "forwards",
      }}
      href={route.href}
      className={cn(
        "relative px-7.5 py-3 h-full",
        isMobile
          ? cn(
              "text-2xl uppercase translate-y-4",
              open ? "opacity-0 animate-fade-in-up" : "animate-fade-out",
              isActive && "text-primary-background",
              "hover:text-primary-hover transition-colors ease-in-cubic",
            )
          : cn(
              "grid md:place-content-center last:border-r last:border-r-theme-stroke",
              !isActive && "text-theme-foreground hover:bg-theme-backdrop/50",
              "transition-all",
            ),
        className,
      )}
    >
      {route.name}
      {!isMobile && (
        <hr
          data-show={isActive}
          className="hidden data-[show='true']:block w-full bottom-0 absolute text-primary-background bg-primary-background h-1"
        />
      )}
    </Link>
  );
};

export default NavItem;
