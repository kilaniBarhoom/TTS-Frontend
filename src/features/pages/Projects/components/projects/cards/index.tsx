import { ProjectT } from "@/lib/types";
import ProjectsCardsSkeleton from "./skeleton";
import { useSearchParams } from "react-router-dom";
import GroupedCards from "./card-format/grouped";
import Cards from "./card-format/normal";

type ProjectsCardsProps = {
  projects: ProjectT[];
  isLoading: boolean;
};

const ProjectsCards = ({ projects, isLoading }: ProjectsCardsProps) => {
  const [searchParams] = useSearchParams();
  const groupBy = searchParams.get("groupBy");
  return (
    <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <ProjectsCardsSkeleton />
      ) : projects && groupBy ? (
        <GroupedCards projects={projects} by={groupBy} />
      ) : (
        <Cards projects={projects} />
      )}
    </div>
  );
};

export default ProjectsCards;
