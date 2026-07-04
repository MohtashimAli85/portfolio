import type { Metadata } from "next";
import { FileContent } from "@/components/ui/file";
import {
	allProfileSlugs,
	type ProfileCategories,
	profileItemMap,
} from "@/lib/portfolio";

type Props = {
	params: Promise<{ category: ProfileCategories; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	return allProfileSlugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category, slug } = await params;

	const item = profileItemMap[category][slug];
	const description = item?.content.replace(/\s+/g, " ").slice(0, 160);

	return {
		title: item?.title || "Portfolio",
		description,
	};
}

export default async function Page({ params }: Props) {
	const { category, slug } = await params;

	const item = profileItemMap[category][slug];

	return <FileContent>{item?.content}</FileContent>;
}
