import {
  CollapsibleSub,
  CollapsibleSubContent,
  CollapsibleSubTrigger,
} from "@/components/ui/collapsible";
import useActivePath from "@/hooks/use-active-path";
import { RiFolder2Fill, RiMarkdownFill } from "@remixicon/react";
import { Route } from "next";
import Link from "next/link";

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
export default SidebarFolder;
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
