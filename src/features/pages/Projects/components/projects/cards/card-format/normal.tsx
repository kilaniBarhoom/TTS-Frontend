import { ProjectT } from "@/lib/types";
import ProjectCard from "../project-card";

const Cards = ({ projects }: { projects: ProjectT[] }) => {
  return projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));
};

export default Cards;
