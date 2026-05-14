"use client";
import useActivePath from "@/hooks/use-active-path";
import {
  RemixiconComponentType,
  RiGamepadFill,
  RiTerminalBoxFill,
  RiUser4Fill,
} from "@remixicon/react";
import { Route } from "next";
import Link from "next/link";
const sidebarItems: {
  name: string;
  href: Route;
  icon: RemixiconComponentType;
}[] = [
  {
    name: "Professional Experience",
    href: "/about-me/professional-info",
    icon: RiTerminalBoxFill,
  },
  {
    name: "Personal Info",
    href: "/about-me/personal-info",
    icon: RiUser4Fill,
  },
  {
    name:"Hobbies",
    href:"/about-me/hobbies",
    icon: RiGamepadFill,
  }
];
export const Sidebar = () => {
  return (
    <aside className="w-17.25 shrink-0 border-r border-theme-stroke py-3">
      <ul className="flex flex-col items-center gap-6 ">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </ul>
    </aside>
  );
};
const SidebarItem = ({
  name,
  href,
  icon: Icon,
}: {
  name: string;
  href: Route;
  icon: RemixiconComponentType;
}) => {
  const { isActive } = useActivePath(href, true);
  return (
    <li className="flex" key={href}>
      <Link
        className="size-6 grid place-content-center"
        key={href}
        href={href}
        title={name}
      >
        <Icon
          data-active={isActive}
          className={
            "transition-[color] size-5 data-[active=true]:text-slate-300 text-slate-500 hover:text-slate-300"
          }
        />
      </Link>
    </li>
  );
};
