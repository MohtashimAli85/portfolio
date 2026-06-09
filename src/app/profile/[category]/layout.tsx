import { ReactNode } from "react";
import { getCategoryFolders, isPortfolioCategory } from "@/lib/portfolio";
import { notFound } from "next/navigation";
import { Sidebar } from "./components/sidebar";
import { TabList, TabProvider } from "@/components/ui/tabs";

type Props = {
  children: ReactNode;
  params: Promise<{ category: string }>;
};

const CategoryLayout = async ({ children, params }: Props) => {
  const { category } = await params;

  if (!isPortfolioCategory(category)) {
    notFound();
  }

  const folders = getCategoryFolders(category);

  return (
    <div className="flex h-full min-w-0">
      <Sidebar category={category} folders={folders} />
      <div className="flex-1 min-w-0">
        <TabList />
        <div className="px-10 py-3">{children}</div>
      </div>
    </div>
  );
};

export default CategoryLayout;
