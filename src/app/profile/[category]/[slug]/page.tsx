import { FileContent } from "@/components/ui/file";
import {
  getAllPortfolioParams,
  getPortfolioItem,
  isPortfolioCategory,
} from "@/lib/portfolio";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPortfolioParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isPortfolioCategory(category)) {
    return {
      title: "Portfolio",
    };
  }

  const item = getPortfolioItem(category, slug);
  const description = item?.content.replace(/\s+/g, " ").slice(0, 160);

  return {
    title: item?.title || "Portfolio",
    description,
  };
}

export default async function Page({ params }: Props) {
  const { category, slug } = await params;
  if (!isPortfolioCategory(category)) {
    notFound();
  }

  const item = getPortfolioItem(category, slug);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <FileContent>{item.content}</FileContent>
    </div>
  );
}
