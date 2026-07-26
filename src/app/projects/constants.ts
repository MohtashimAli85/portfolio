import type { ProjectStage } from "./types";

export const COPY = {
	featuredProjects: "_featured-projects",
	earlierProjects: "view earlier projects",
	viewProject: "view-project",
	view: "view",
	project: "Project",
} as const;

export const PROJECT_NAME_PREFIX = "_";

export const STAGES = [
	{ stage: "html-css", label: "html & css" },
	{ stage: "javascript", label: "javascript" },
	{ stage: "react", label: "react" },
	{ stage: "next", label: "next.js" },
] as const satisfies ReadonlyArray<{ stage: ProjectStage; label: string }>;

export const STAGE_ORDER = STAGES.map(({ stage }) => stage);

export const STAGE_LABELS = Object.fromEntries(
	STAGES.map(({ stage, label }) => [stage, label]),
) as Record<ProjectStage, string>;

export function formatProjectName(name: string, withComment = false) {
	const slug = `${PROJECT_NAME_PREFIX}${name}`;
	return withComment ? `// ${slug}` : slug;
}

export function formatStageTitle(
	stageIndex: number,
	label: string,
	count: number,
) {
	const order = String(stageIndex).padStart(2, "0");
	return `// stage_${order} — ${label} (${count})`;
}

export function formatEarlierProjectsLabel(count: number) {
	return `${COPY.earlierProjects} (${count})`;
}
