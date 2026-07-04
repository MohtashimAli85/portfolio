import { RiFolder2Fill, RiMarkdownFill } from "@remixicon/react";
import type { Route } from "next";
import Link from "next/link";
import {
	CollapsibleSub,
	CollapsibleSubContent,
	CollapsibleSubTrigger,
} from "@/components/ui/collapsible";
import { useTab } from "@/components/ui/tabs";
import useActivePath from "@/hooks/use-active-path";
export interface FolderItem {
	label: string;
	href: Route;
}

interface FolderProps {
	label: string;
	color: string;
	files: FolderItem[];
	hrefs: Route[];
}

const Folder = ({ label, color, files, hrefs }: FolderProps) => {
	const { includes, pathname } = useActivePath();
	const isActive = includes(hrefs);
	return (
		<CollapsibleSub defaultOpen={isActive}>
			<CollapsibleSubTrigger aria-activedescendant={pathname}>
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
export default Folder;
const EditorFile = ({ href, label }: { href: Route; label: string }) => {
	const { exact } = useActivePath();
	const isActive = exact(href);
	const { addTab } = useTab();
	const handleClick = () => {
		addTab({ label, value: href });
	};
	return (
		<Link
			onClick={handleClick}
			href={href}
			data-active={isActive}
			className="flex pl-7 items-center gap-1 py-0.5 text-slate-400 hover:text-slate-300 transition-colors data-[active=true]:text-slate-300 hover:bg-theme-foreground/20"
		>
			<RiMarkdownFill className="size-4" />
			<span>{label}</span>
		</Link>
	);
};
