"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Folder, { FolderItem } from "@/app/profile/[category]/components/folder";
import { CategoryType, PortfolioFolder } from "@/types/portfolio";
import { Route } from "next";

interface Props {
  category: CategoryType;
  folders: PortfolioFolder[];
}

export const Sidebar = ({ category, folders }: Props) => {
  return (
    <div className="border-r w-63 h-full border-theme-stroke shrink-0">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>{category}-info</CollapsibleTrigger>
        <CollapsibleContent className="mt- space-y-1 ">
          {folders.map((folder) => {
            const files: FolderItem[] = folder.items.map((it) => ({
              href: `/profile/${category}/${it.slug}` as Route,
              label: it.slug,
            }));

            return (
              <Folder
                key={folder.folderName}
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
  );
};
