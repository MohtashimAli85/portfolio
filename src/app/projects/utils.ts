import { STAGE_ORDER } from "./constants";
import type { Project, ProjectStage } from "./types";

const HTML_CSS_LANGS = new Set(["html", "css", "scss"]);
const JS_LANGS = new Set(["javascript", "typescript"]);

function normalizeLanguage(language: string): string {
	return language.toLowerCase();
}

export function getProjectStage(project: Project): ProjectStage {
	if (project.stage) return project.stage;

	const langs = (project.language ?? []).map(normalizeLanguage);

	if (langs.some((l) => l === "next")) return "next";
	if (langs.some((l) => l === "react" || l === "react-dom")) return "react";
	if (langs.some((l) => JS_LANGS.has(l))) return "javascript";
	if (langs.every((l) => HTML_CSS_LANGS.has(l))) return "html-css";

	return "html-css";
}

export function splitFeatured(projects: Project[]) {
	const featured = projects.filter((p) => p.featured);
	const archive = projects.filter((p) => !p.featured);
	return { featured, archive };
}

export function filterBySkills(projects: Project[], skills?: string) {
	if (!skills) return projects;
	return projects.filter((item) =>
		item.language?.some((language) =>
			skills.includes(normalizeLanguage(language)),
		),
	);
}

export function groupByStage(
	projects: Project[],
): Map<ProjectStage, Project[]> {
	const grouped = new Map<ProjectStage, Project[]>();

	for (const stage of STAGE_ORDER) {
		grouped.set(stage, []);
	}

	for (const project of projects) {
		const stage = getProjectStage(project);
		grouped.get(stage)?.push(project);
	}

	return grouped;
}
