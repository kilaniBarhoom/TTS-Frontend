import { ProjectT } from "@/lib/types";
import { useState } from "react";
import { projectStatuses } from "../../actions/filters-popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Cards from "./normal";
import ProjectStatusBadge from "../../../component/project-status-badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

const GroupedCards = ({
  projects,
  by,
}: {
  projects: ProjectT[];
  by: string;
}) => {
  return (
    <div className="grid gap-8">
      {projectStatuses.map((element, index) => {
        const groupedProjects = projects.filter(
          (project) => project.projectStatus === element
        );
        return (
          <GroupedCard
            key={index}
            title={element}
            projects={groupedProjects}
            by={by}
          />
        );
      })}
    </div>
  );
};

export default GroupedCards;

const GroupedCard = ({
  title,
  projects,
  by,
}: {
  title: string;
  projects: ProjectT[];
  by: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <>
        <div className="flex items-center gap-2">
          <CollapsibleTrigger className="" asChild>
            <Button variant={"ghostOnNav"} className="w-full" size="xs">
              <ProjectStatusBadge
                className="w-full py-4 flex justify-center items-center gap-2"
                status={title}
              >
                <ChevronDown
                  className={cn(
                    "transition-all ease-in-out duration-200",
                    open ? "-rotate-180" : "rotate-0"
                  )}
                  size={15}
                />
              </ProjectStatusBadge>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent asChild>
          <>
            {projects && projects.length ? (
              <Cards projects={projects} />
            ) : (
              <Typography element="p" as={"largeText"} className="mx-auto my-4">
                No projects with {by}: {title} found
              </Typography>
            )}
          </>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
};
