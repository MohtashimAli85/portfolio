import {
  getFirstPortfolioItem,
  getPortfolioCategories,
  isPortfolioCategory,
} from "@/lib/portfolio";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getPortfolioCategories().map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isPortfolioCategory(category)) {
    notFound();
  }

  const firstItem = getFirstPortfolioItem(category);
  if (!firstItem) {
    notFound();
  }

  redirect(`/profile/${category}/${firstItem.slug}`);
}
