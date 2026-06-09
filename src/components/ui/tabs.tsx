"use client";

import { cn } from "@/lib/utils";
import { RiCloseFill } from "@remixicon/react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface TabItem {
  label: string;
  value: Route;
}
type TabListMap = Record<string, Record<string, TabItem[]>>;
interface TabContextType {
  activeTab: Route | null;
  tabList: TabItem[];
  setActiveTab: (value: Route) => void;
  addTab: (tab: TabItem) => void;
  removeTab: (tab: TabItem) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
  children: ReactNode;
  // pathname?: Route;
  defaultTabs?: TabListMap;
}
export const updateCookieValue = (name: string, value: TabItem) => {
  const existingValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  let updatedValue: TabItem[] = [];
  if (existingValue) {
    try {
      const parsedValue = JSON.parse(existingValue);
      if (Array.isArray(parsedValue)) {
        const exists = parsedValue.some(
          (item: TabItem) => item.value === value.value,
        );
        console.log({ exists });
        if (exists) {
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse cookie value:", e);
    }
  }
  console.log({ value, existingValue });
  updatedValue.unshift(value);
  document.cookie = `${name}=${JSON.stringify(updatedValue)}`;
};
export const TabProvider = ({ children, defaultTabs }: TabProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeModule, activeCategory, activeSlug] = pathname
    .split("/")
    .filter(Boolean);
  const [activeTab, setActiveTabState] = useState<Route | null>(
    pathname as Route,
  );
  const [tabListMap, setTabListMap] = useState<TabListMap>(defaultTabs ?? {});
  console.log({ tabListMap });
  const setActiveTab = useCallback((value: Route) => {
    setActiveTabState(value);
  }, []);

  const addTab = useCallback((tab: TabItem) => {
    const [module, category] = tab.value.split("/").filter(Boolean);
    console.log({ module, category, tab }, tab.value.split("/"));
    setTabListMap((prev) => {
      const exists = prev[module]?.[category]?.some(
        (t) => t.value === tab.value,
      );
      if (exists) {
        setActiveTabState(tab.value);
        return prev;
      }
      setActiveTabState(tab.value);
      const updatedTabs = [...(prev[module]?.[category] || []), tab];
      const updatedTabsMap = {
        ...prev,
        [module]: { ...prev[module], [category]: updatedTabs },
      };
      console.log({ updatedTabsMap });
      console.log({ module, category });
      document.cookie = `${module}_tabList=${JSON.stringify(updatedTabsMap)}`;
      return updatedTabsMap;
    });
  }, []);

  const removeTab = useCallback(
    (tab: TabItem) => {
      const [module, category] = tab.value.split("/").filter(Boolean);
      setTabListMap((prev) => {
        const filtered = prev[module]?.[category]?.filter(
          (t) => t.value !== tab.value,
        );
        if (activeTab === tab.value && filtered?.length > 0) {
          const removedIndex = prev[module]?.[category]?.findIndex(
            (t) => t.value === tab.value,
          );
          const newIndex = Math.min(removedIndex, filtered.length - 1);
          setActiveTabState(filtered[newIndex].value);
          router.push(filtered[newIndex].value);
        } else if (filtered.length === 0) {
          router.push(
            `${tab.value.split("/").slice(0, -1).join("/")}` as Route,
          );
          setActiveTabState(null);
        }
        const updatedTabsMap = {
          ...prev,
          [module]: { ...prev[module], [category]: filtered || [] },
        };

        document.cookie = `${module}_tabList=${JSON.stringify(updatedTabsMap)}`;
        return updatedTabsMap;
      });
    },
    [activeTab],
  );

  // useLayoutEffect(() => {
  //   if (!activeTab) {
  //     if (tabList.length > 0) {
  //       setActiveTabState(tabList[0].value);
  //     } else if (segments.length > 0) {
  //       setActiveTabState(pathname as Route);
  //       console.log(segments.at(-1));
  //       addTab({ label: segments.at(-1)!, value: pathname as Route });
  //     }
  //   }
  // }, [pathname]);
  console.log({ activeModule });
  const tabList = activeSlug
    ? tabListMap[activeModule]?.[activeCategory] || []
    : [];
  console.log({ tabListMap });
  return (
    <TabContext.Provider
      value={{
        activeTab,
        tabList,
        setActiveTab,
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
  console.log({ tabList });
  return (
    <div className="overflow-hidden">
      <div className="flex border-b border-theme-stroke overflow-x-auto overscroll-none">
        {tabList.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </div>
    </div>
  );
};

interface TabProps {
  label: string;
  value: Route;
}

export const Tab = ({ label, value }: TabProps) => {
  const { activeTab, setActiveTab, removeTab } = useTab();
  const isActive = activeTab === value;

  const handleClick = () => {
    setActiveTab(value);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeTab({ label, value });
  };

  return (
    <div
      data-active={isActive}
      className=" border-r last:border-r-0 border-theme-stroke text-theme-foreground -mb-px data-[active=true]:text-theme-heading-foreground text-sm  transition-colors flex items-center
    "
    >
      <Link
        href={value}
        className="px-3 py-2 whitespace-nowrap"
        onClick={handleClick}
      >
        {label}
      </Link>
      <button
        className="cursor-pointer pr-3"
        onClick={handleClose}
        aria-label={`Close ${label}`}
      >
        <RiCloseFill className="size-4" />
      </button>
    </div>
  );
};
