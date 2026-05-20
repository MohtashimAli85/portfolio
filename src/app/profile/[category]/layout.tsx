import { ReactNode } from "react";
import DynamicSidebar from "@/components/ui/DynamicSidebar";
import { getCategoryFolders, isPortfolioCategory } from "@/lib/portfolio";
import { notFound } from "next/navigation";

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
    <div className="flex h-full">
      <DynamicSidebar category={category} folders={folders} />
      <main className="flex-1 px-10 py-3">{children}</main>
    </div>
  );
};

export default CategoryLayout;
