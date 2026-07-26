import { TabProvider } from "@/components/ui/tabs";
import repos from "@/data/github-repos.json";
import ProjectJourney, { ProjectCard } from "./components/project-journey";
import { Sidebar } from "./components/sidebar";
import { COPY } from "./constants";
import type { Project } from "./types";
import { filterBySkills, groupByStage, splitFeatured } from "./utils";

interface ProjectsProps {
	searchParams: Promise<{
		skills?: string;
	}>;
}

const Projects = async ({ searchParams }: ProjectsProps) => {
	const { skills } = await searchParams;
	const items: Project[] = Array.isArray(repos)
		? repos.map((repo, index) => ({ ...repo, id: index + 1 }))
		: [];

	const { featured, archive } = splitFeatured(items);
	const filteredArchive = filterBySkills(archive, skills);
	const groupedArchive = groupByStage(filteredArchive);

	return (
		<TabProvider>
			<div className="md:flex min-w-0 md:overflow-hidden h-full">
				<Sidebar />
				<div className="flex-1 min-w-0 overflow-auto p-6">
					<h2 className="mb-6 font-mono text-sm text-muted-foreground">
						{COPY.featuredProjects}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{featured.map((project) => (
							<ProjectCard key={project.name} project={project} />
						))}
					</div>
					<ProjectJourney projects={filteredArchive} grouped={groupedArchive} />
				</div>
			</div>
		</TabProvider>
	);
};

export default Projects;
