import { ProjectT } from "@/lib/types";
import ProjectCard from "../project-card";

const Cards = ({ projects }: { projects: ProjectT[] }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Cards;
