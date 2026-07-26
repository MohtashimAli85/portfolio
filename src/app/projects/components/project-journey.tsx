import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleSub,
	CollapsibleSubContent,
	CollapsibleSubTrigger,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import {
	COPY,
	formatEarlierProjectsLabel,
	formatProjectName,
	formatStageTitle,
	STAGES,
} from "../constants";
import type { Project, ProjectStage } from "../types";
import { type IconKey, iconsMap } from "./sidebar";

type ProjectLanguageIconsProps = {
	languages?: string[];
	size?: "default" | "sm";
	reverse?: boolean;
};

const sizeClasses = {
	default: "bg-indigo-300 p-1 rounded-md",
	sm: "bg-indigo-300/80 p-0.5 rounded-sm [&>svg]:size-3.5",
} as const;

const ProjectLanguageIcons = ({
	languages,
	size = "default",
	reverse = false,
}: ProjectLanguageIconsProps) => {
	const items = reverse ? languages?.toReversed() : languages;

	return (
		<div className="flex items-center gap-2">
			{items?.map((language) => {
				const icon = iconsMap[language.toLowerCase() as IconKey];
				if (!icon) return null;
				return (
					<span
						key={language}
						className={`text-slate-900 ${sizeClasses[size]}`}
					>
						{icon}
					</span>
				);
			})}
		</div>
	);
};

type ProjectCardProps = {
	project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-baseline gap-2 text-sm">
				<span className="font-medium text-indigo-500 text-nowrap">
					{COPY.project} {project.id}
				</span>
				<span className="font-mono text-muted-foreground truncate">
					{formatProjectName(project.name, true)}
				</span>
			</div>
			<Card className="h-full">
				<CardContent>
					<ProjectLanguageIcons languages={project.language} reverse />
				</CardContent>
				<CardFooter>
					<Button variant="secondary" asChild>
						<a
							href={project.url}
							target="_blank"
							rel="noreferrer"
							className="text-sm"
						>
							{COPY.viewProject}
						</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

type ProjectJourneyItemProps = {
	project: Project;
};

const ProjectJourneyItem = ({ project }: ProjectJourneyItemProps) => {
	return (
		<div className="flex items-center justify-between gap-3 py-2 pl-2">
			<div className="flex min-w-0 items-center gap-3">
				<span className="font-mono text-sm text-muted-foreground truncate">
					{formatProjectName(project.name)}
				</span>
				<ProjectLanguageIcons languages={project.language} size="sm" />
			</div>
			<a
				href={project.url}
				target="_blank"
				rel="noreferrer"
				className="shrink-0 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
			>
				{COPY.view}
			</a>
		</div>
	);
};

type ProjectJourneyProps = {
	projects: Project[];
	grouped: Map<ProjectStage, Project[]>;
};

const ProjectJourney = ({ projects, grouped }: ProjectJourneyProps) => {
	if (projects.length === 0) return null;

	return (
		<Collapsible className="mt-10 border border-theme-stroke rounded-xl overflow-hidden">
			<CollapsibleTrigger className="w-full">
				{formatEarlierProjectsLabel(projects.length)}
			</CollapsibleTrigger>
			<CollapsibleContent className="p-6 pt-4">
				<Timeline className="space-y-8">
					{STAGES.map(({ stage, label }, index) => {
						const stageProjects = grouped.get(stage) ?? [];
						if (stageProjects.length === 0) return null;

						return (
							<TimelineItem key={stage}>
								<CollapsibleSub>
									<CollapsibleSubTrigger className="mb-2 font-mono text-indigo-400 pl-0 py-1">
										{formatStageTitle(index + 1, label, stageProjects.length)}
									</CollapsibleSubTrigger>
									<CollapsibleSubContent className="space-y-1 pb-2">
										{stageProjects.map((project) => (
											<ProjectJourneyItem
												key={project.name}
												project={project}
											/>
										))}
									</CollapsibleSubContent>
								</CollapsibleSub>
							</TimelineItem>
						);
					})}
				</Timeline>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default ProjectJourney;
