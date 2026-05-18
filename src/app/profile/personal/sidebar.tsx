"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleItem,
  CollapsibleSub,
  CollapsibleSubContent,
  CollapsibleSubTrigger,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useActivePath from "@/hooks/use-active-path";
import {
  RiFolder2Fill,
  RiMailFill,
  RiMarkdownFill,
  RiPhoneFill,
} from "@remixicon/react";
import { Route } from "next";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="border-r w-58 h-full border-theme-stroke shrink-0">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>personal-info</CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1">
          {personalFolders.map((folder) => (
            <SidebarFolder
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

type SidebarFolderProps = {
  label: string;
  color: string;
  files: { href: Route; label: string }[];
  hrefs: Route[];
};

const SidebarFolder = ({ label, color, files, hrefs }: SidebarFolderProps) => {
  const { includes } = useActivePath();
  const isActive = includes(hrefs);
  return (
    <CollapsibleSub defaultOpen={isActive}>
      <CollapsibleSubTrigger>
        <div className="flex gap-2 items-center">
          <RiFolder2Fill
            className={`h-4 w-4 fill-current ${color}`}
            strokeWidth={0}
          />
          <span>{label}</span>
        </div>
      </CollapsibleSubTrigger>
      <CollapsibleSubContent>
        {files.map((file) => (
          <EditorFile key={file.href} href={file.href} label={file.label} />
        ))}
      </CollapsibleSubContent>
    </CollapsibleSub>
  );
};
const EditorFile = ({ href, label }: { href: Route; label: string }) => {
  const { exact } = useActivePath();
  const isActive = exact(href);
  return (
    <Link
      href={href}
      data-active={isActive}
      className="flex items-center gap-1 py-0.5 text-slate-400 hover:text-slate-300 transition-colors data-[active=true]:text-slate-300"
    >
      <RiMarkdownFill className="size-4" />
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
interface Folder {
  label: string;
  href: Route;
}
const bio: Folder[] = [
  { href: "/profile/personal/overview", label: "overview" },
];

const interests: Folder[] = [{ href: "/profile/personal/life", label: "life" }];

const education: Folder[] = [
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
