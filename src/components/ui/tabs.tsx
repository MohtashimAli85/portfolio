"use client";

import { RiCloseFill } from "@remixicon/react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
	createContext,
	type ReactNode,
	useContext,
	useState,
} from "react";
import { cn, getRouteSegments } from "@/lib/utils";

export interface TabItem {
	label: string;
	value: Route;
}
type TabListMap = Record<string, Record<string, TabItem[]>>;
interface TabContextType {
	activeTab: Route;
	tabList: TabItem[];
	addTab: (tab: TabItem) => void;
	removeTab: (tab: TabItem) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
	children: ReactNode;
}

export const TabProvider = ({ children }: TabProviderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [activeModule, activeCategory, activeSlug] = pathname
		.split("/")
		.filter(Boolean);
	const defaultTabs: TabListMap = {
		[activeModule]: {
			[activeCategory]: [
				{
					label: activeSlug,
					value: pathname as Route,
				},
			],
		},
	};
	const [tabListMap, setTabListMap] = useState<TabListMap>(defaultTabs ?? {});

	const addTab = (tab: TabItem) => {
		const [module, category] = getRouteSegments(tab.value);
		setTabListMap((prev) => {
			const exists = prev[module]?.[category]?.some(
				(t) => t.value === tab.value,
			);
			if (exists) {
				return prev;
			}
			const updatedTabs = [...(prev[module]?.[category] || []), tab];
			const updatedTabsMap = {
				...prev,
				[module]: { ...prev[module], [category]: updatedTabs },
			};

			return updatedTabsMap;
		});
	};

	const removeTab = (tab: TabItem) => {
		const [module, category] = getRouteSegments(tab.value);
		setTabListMap((prev) => {
			const filtered = prev[module]?.[category]?.filter(
				(t) => t.value !== tab.value,
			);
			if (pathname === tab.value && filtered?.length > 0) {
				const removedIndex = prev[module]?.[category]?.findIndex(
					(t) => t.value === tab.value,
				);
				const newIndex = Math.min(removedIndex, filtered.length - 1);
				router.push(filtered[newIndex].value);
			} else if (filtered.length === 0) {
				router.push(`${tab.value.split("/").slice(0, -1).join("/")}` as Route);
			}
			const updatedTabsMap = {
				...prev,
				[module]: { ...prev[module], [category]: filtered || [] },
			};

			return updatedTabsMap;
		});
	};

	const fallbackTabList = [
		{
			label: activeSlug,
			value: pathname as Route,
		},
	];

	const tabList = activeSlug
		? tabListMap[activeModule]?.[activeCategory]?.length
			? tabListMap[activeModule]?.[activeCategory]
			: fallbackTabList
		: [];
	return (
		<TabContext.Provider
			value={{
				activeTab: pathname as Route,
				tabList,
				addTab,
				removeTab,
			}}
		>
			{children}
		</TabContext.Provider>
	);
};

export const useTab = () => {
	const context = useContext(TabContext);
	if (context === undefined) {
		throw new Error("useTab must be used within a TabProvider");
	}
	return context;
};

export const TabList = () => {
	const { tabList } = useTab();
	return (
		<div
			className={cn(
				"hidden md:flex outline outline-theme-stroke overflow-x-auto  shrink-0 overscroll-none",
				"hover:[scrollbar_color]:bg-theme-foreground scrollbar-track-theme-foreground  scrollbar-thumb-theme-stroke",
			)}
			style={
				{
					// scrollbarColor: "transparent transparent",
				}
			}
		>
			{tabList.map((tab) => (
				<Tab key={tab.value} label={tab.label} value={tab.value} />
			))}
		</div>
	);
};

interface TabProps {
	label: string;
	value: Route;
}

export const Tab = ({ label, value }: TabProps) => {
	const { activeTab, removeTab } = useTab();
	const isActive = activeTab === value;

	const handleClick = () => {};

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		removeTab({ label, value });
	};

	return (
		<div
			data-active={isActive}
			className=" border-r last:border-r-0 border-theme-stroke text-theme-foreground  data-[active=true]:text-theme-heading-foreground  transition-colors flex items-center
    "
		>
			<Link
				href={value}
				className="p-3 whitespace-nowrap"
				onClick={handleClick}
			>
				{label}
			</Link>
			<button
				type="button"
				className="cursor-pointer pr-3"
				onClick={handleClose}
				aria-label={`Close ${label}`}
			>
				<RiCloseFill className="size-4" />
			</button>
		</div>
	);
};
