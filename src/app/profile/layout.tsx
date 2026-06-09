import { cookies } from "next/headers";
import { Sidebar } from "./components/sidebar";
import { TabProvider } from "@/components/ui/tabs";

const AboutMeLayout = async ({ children }: { children: React.ReactNode }) => {
  const defaultTabsString = (await cookies()).get("profile_tabList")?.value;
  const defaultTabs = defaultTabsString
    ? JSON.parse(defaultTabsString)
    : undefined;
  return (
    <TabProvider defaultTabs={defaultTabs}>
      <div className="flex h-full">
        <Sidebar />
        {children}
      </div>
    </TabProvider>
  );
};

export default AboutMeLayout;
