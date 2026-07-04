"use client";
import type { Route } from "next";
import Folder, {
	type FolderItem,
} from "@/app/profile/[category]/components/folder";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	type ProfileCategories,
	profileData,
	profileDataList,
} from "@/lib/portfolio";

interface Props {
	category: ProfileCategories;
}

export const Sidebar = ({ category: currentCategory }: Props) => {
	const folders = profileData[currentCategory];

	return (
		<>
			<div className="border-r w-63 h-full border-theme-stroke shrink-0 hidden md:block">
				<Collapsible defaultOpen>
					<CollapsibleTrigger>{currentCategory}-info</CollapsibleTrigger>
					<CollapsibleContent className="mt- space-y-1 ">
						{Object.values(folders).map((folder) => {
							const files: FolderItem[] = folder.items.map((it) => ({
								href: `/profile/${currentCategory}/${it.slug}` as Route,
								label: it.slug,
							}));

							return (
								<Folder
									key={folder.name}
									label={folder.name}
									color={folder.color}
									files={files}
									hrefs={files.map((f) => f.href)}
								/>
							);
						})}
					</CollapsibleContent>
				</Collapsible>
			</div>
			<div className="md:hidden">
				<h1>_about-me</h1>
				<div>
					{profileDataList.map(([category, folders]) => {
						return (
							<Collapsible
								key={category}
								defaultOpen={category === currentCategory}
							>
								<CollapsibleTrigger>{category}-info</CollapsibleTrigger>
								<CollapsibleContent className="mt- space-y-1 ">
									{Object.values(folders).map((folder) => {
										const files: FolderItem[] = folder.items.map((it) => ({
											href: `/profile/${category}/${it.slug}` as Route,
											label: it.slug,
										}));

										return (
											<Folder
												key={folder.name}
												label={folder.name}
												color={folder.color}
												files={files}
												hrefs={files.map((f) => f.href)}
											/>
										);
									})}
								</CollapsibleContent>
							</Collapsible>
						);
					})}
				</div>
			</div>
		</>
	);
};
