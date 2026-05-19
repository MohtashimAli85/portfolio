"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleItem,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Folder, { FolderItem } from "@/components/ui/folder";
import { RiMailFill, RiPhoneFill } from "@remixicon/react";
import { Route } from "next";

const Sidebar = () => {
  return (
    <div className="border-r w-58 h-full border-theme-stroke shrink-0">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>personal-info</CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1">
          {personalFolders.map((folder) => (
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
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <span className="text-slate-200">contacts</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-">
          <CollapsibleItem icon={RiMailFill} label="user@gmail.com" />
          <CollapsibleItem icon={RiPhoneFill} label="+3598246359" />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Sidebar;

const bio: FolderItem[] = [
  { href: "/profile/personal/overview", label: "overview" },
];

const interests: FolderItem[] = [
  { href: "/profile/personal/life", label: "life" },
];

const education: FolderItem[] = [
  { href: "/profile/personal/high-school", label: "high-school" },
  { href: "/profile/personal/university", label: "university" },
];

export const personalFolders = [
  {
    label: "bio",
    color: "text-rose-400",
    files: bio,
    hrefs: bio.map((f) => f.href),
  },
  {
    label: "interests",
    color: "text-emerald-400",
    files: interests,
    hrefs: interests.map((f) => f.href),
  },
  {
    label: "education",
    color: "text-violet-400",
    files: education,
    hrefs: education.map((f) => f.href),
  },
];
