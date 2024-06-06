import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Typography from "@/components/ui/typography";
import { ProjectT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ProjectStatusBadge from "../../../component/project-status-badge";
import { projectStatuses } from "../../actions/filters-popover";
import Cards from "./normal";

const GroupedCards = ({
  projects,
  by,
}: {
  projects: ProjectT[];
  by: string;
}) => {
  return (
    <div className="grid gap-8 my-4 flex-1 w-full ">
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
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      asChild
      className="border-2 border-blue-700"
    >
      <>
        <div className="flex items-center gap-2 w-full border-green-500">
          <CollapsibleTrigger asChild>
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
