import data from "@/data/portfolio-content.json";
import {
  CategoryType,
  PortfolioData,
  PortfolioFolder,
  PortfolioItem,
} from "@/types/portfolio";

const portfolioData: PortfolioData = data as PortfolioData;
const portfolioCategories = ["professional", "personal"] as const;

export function isPortfolioCategory(
  category: string,
): category is CategoryType {
  return portfolioCategories.includes(category as CategoryType);
}

export function getPortfolioCategories(): CategoryType[] {
  return [...portfolioCategories];
}

export function getCategoryFolders(category: CategoryType): PortfolioFolder[] {
  const categoryData = portfolioData[category];

  return Object.entries(categoryData).map(([folderName, folderData]) => {
    const items = [...folderData.items].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );

    return {
      folderName,
      name: folderData.name,
      color: folderData.color,
      items,
    };
  });
}

export function getPortfolioItem(
  category: CategoryType,
  slug: string,
): PortfolioItem | null {
  return (
    getCategoryFolders(category)
      .flatMap((folder) => folder.items)
      .find((item) => item.slug === slug) ?? null
  );
}

export function getFirstPortfolioItem(
  category: CategoryType,
): PortfolioItem | null {
  return getCategoryFolders(category)[0]?.items[0] ?? null;
}

export function getAllSlugs(category: CategoryType): Array<{ slug: string }> {
  return getCategoryFolders(category).flatMap((folder) =>
    folder.items.map((item) => ({ slug: item.slug })),
  );
}

export function getAllPortfolioParams(): Array<{
  category: CategoryType;
  slug: string;
}> {
  return portfolioCategories.flatMap((category) =>
    getAllSlugs(category).map(({ slug }) => ({ category, slug })),
  );
}

export { portfolioData };
