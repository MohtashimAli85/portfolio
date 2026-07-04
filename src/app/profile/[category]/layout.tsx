import type { ReactNode } from "react";
import { TabList } from "@/components/ui/tabs";
import type { ProfileCategories } from "@/lib/portfolio";

import { Sidebar } from "./components/sidebar";

const CategoryLayout = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ category: string }>;
}) => {
	const { category } = await params;

	return (
		<div className="md:flex min-w-0">
			<Sidebar category={category as ProfileCategories} />
			<div className="flex-1 min-w-0">
				<TabList />
				<div className="px-4 md:px-10 py-3">{children}</div>
			</div>
		</div>
	);
};

export default CategoryLayout;
