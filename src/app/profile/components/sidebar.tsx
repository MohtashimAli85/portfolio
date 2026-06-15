"use client";
import {
	type RemixiconComponentType,
	RiGamepadFill,
	RiTerminalBoxFill,
	RiUser4Fill,
} from "@remixicon/react";
import type { Route } from "next";
import Link from "next/link";
import { useTab } from "@/components/ui/tabs";
import useActivePath from "@/hooks/use-active-path";

const sidebarItems: {
	name: string;
	href: Route;
	icon: RemixiconComponentType;
}[] = [
	{
		name: "Professional Experience",
		href: "/profile/professional/spark-ai" as Route,
		icon: RiTerminalBoxFill,
	},
	{
		name: "Personal Info",
		href: "/profile/personal/overview" as Route,
		icon: RiUser4Fill,
	},
	{
		name: "Hobbies",
		href: "/profile/hobbies/overview" as Route,
		icon: RiGamepadFill,
	},
];
export const Sidebar = () => {
	return (
		<aside className="w-17.25 shrink-0 border-r border-theme-stroke py-3 hidden md:block">
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
	const { includes, segments } = useActivePath();
	const label = segments[2];
	const { addTab } = useTab();

	const isActive = includes(href.split("/")[2]);
	return (
		<li className="flex" key={href}>
			<Link
				className="size-6 grid place-content-center"
				key={href}
				href={href}
				title={name}
				onClick={() => {
					addTab({
						label,
						value: href,
					});
				}}
			>
				<Icon
					data-active={isActive}
					className={
						"transition-[color] size-5 data-[active=true]:text-theme-foreground text-slate-500 hover:text-theme-foreground"
					}
				/>
			</Link>
		</li>
	);
};
