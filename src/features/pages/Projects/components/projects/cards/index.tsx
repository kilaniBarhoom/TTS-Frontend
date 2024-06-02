import { ProjectT } from "@/lib/types";
import ProjectCard from "./project-card";
import ProjectsCardsSkeleton from "./skeleton";

type ProjectsCardsProps = {
  projects: ProjectT[];
  isLoading: boolean;
};

const ProjectsCards = ({ projects, isLoading }: ProjectsCardsProps) => {
  return (
    <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <ProjectsCardsSkeleton />
      ) : (
        projects &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
};

export default ProjectsCards;
