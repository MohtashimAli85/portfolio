export type ProjectStage = "html-css" | "javascript" | "react" | "next";

export type Project = {
	id: number;
	name: string;
	url: string;
	language?: string[];
	dependency?: string[];
	featured?: boolean;
	stage?: ProjectStage;
};
