"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Folder, { FolderItem } from "@/components/ui/folder";

const Sidebar = () => {
  return (
    <div className="border-r w-63 h-full border-theme-stroke shrink-0">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>professional-info</CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1">
          {professionalFolders.map((folder) => (
            <Folder
              key={folder.label}
              label={folder.label}
              color={folder.color}
              files={folder.files}
              hrefs={folder.hrefs}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Sidebar;

const experience: FolderItem[] = [
  { href: "/profile/professional/spark-ai", label: "spark-ai" },
  { href: "/profile/professional/globewyze", label: "globewyze" },
  {
    href: "/profile/professional/million-news-media",
    label: "million-news-media",
  },
  { href: "/profile/professional/alpha-squad", label: "alpha-squad" },
];

const skills: FolderItem[] = [
  { href: "/profile/professional/frontend", label: "frontend" },
  { href: "/profile/professional/ui-libraries", label: "ui-libraries" },
  { href: "/profile/professional/dev-tools", label: "dev-tools" },
];

export const professionalFolders = [
  {
    label: "experience",
    color: "text-sky-400",
    files: experience,
    hrefs: experience.map((f) => f.href),
  },
  {
    label: "skills",
    color: "text-amber-400",
    files: skills,
    hrefs: skills.map((f) => f.href),
  },
];
