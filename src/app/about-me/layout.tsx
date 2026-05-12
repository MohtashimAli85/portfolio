import {
  RemixiconComponentType,
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
];
const AboutMeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 h-full">
      <ul className="py-3 px-6 border-r space-y-4 ">
        {sidebarItems.map((item) => (
          <li key={item.href}>
            <Link key={item.href} href={item.href} title={item.name}>
              <item.icon />
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default AboutMeLayout;
