import {
	RiCss3Fill,
	RiHtml5Fill,
	RiJavascriptFill,
	RiNextjsFill,
	RiReactjsFill,
} from "@remixicon/react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SidebarItem from "./sidebar-item";

export const iconsMap = {
	html: <RiHtml5Fill />,
	css: <RiCss3Fill />,
	javascript: <RiJavascriptFill />,
	typescript: <RiJavascriptFill />,
	react: <RiReactjsFill />,
	next: <RiNextjsFill />,
	// scss: <RiCss3Fill />,
};
export type IconKey = keyof typeof iconsMap;
export interface SkillItem {
	label: string;
	value: IconKey;
}
const skills: SkillItem[] = [
	{ label: "HTML", value: "html" },
	{ label: "CSS", value: "css" },
	{ label: "JavaScript", value: "javascript" },
	{ label: "TypeScript", value: "typescript" },
	{ label: "React", value: "react" },
	{ label: "Next.js", value: "next" },
];
export const Sidebar = () => {
	return (
		<>
			<h1 className="p-6 md:hidden">_projects</h1>
			<div className="border-r  md:w-80 md:h-full border-theme-stroke shrink-0 ">
				<Collapsible defaultOpen>
					<CollapsibleTrigger>projects</CollapsibleTrigger>
					<CollapsibleContent className="space-y-1 p-3">
						{skills.map((skill) => (
							<SidebarItem key={skill.value} skill={skill} />
						))}
					</CollapsibleContent>
				</Collapsible>
			</div>
		</>
	);
};
