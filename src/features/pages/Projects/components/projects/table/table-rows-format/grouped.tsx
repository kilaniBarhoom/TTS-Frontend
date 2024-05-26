import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ProjectStatusBadge from "../../../component/project-status-badge";
import { projectStatuses } from "../../actions/filters-popover";
import TableRows from "./normal";

const TableGroupedRows = ({ projects }: { projects: ProjectT[] }) => {
  return (
    <>
      {projectStatuses.map((element, index) => {
        const groupedProjects = projects.filter(
          (project) => project.projectStatus === element
        );
        return (
          <GroupedRow key={index} title={element} projects={groupedProjects} />
        );
      })}
    </>
  );
};

export default TableGroupedRows;

const GroupedRow = ({
  title,
  projects,
}: {
  title: string;
  projects: ProjectT[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <>
        <TableRow>
          <TableCell colSpan={5} className="py-5">
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant={"ghostOnNav"} size="xs">
                  <ChevronRight
                    className={cn(
                      "transition-all ease-in-out duration-200",
                      open ? "rotate-90" : "rotate-0"
                    )}
                    size={15}
                  />
                </Button>
              </CollapsibleTrigger>
              <ProjectStatusBadge status={title} />
            </div>
          </TableCell>
        </TableRow>
        <CollapsibleContent asChild>
          <>
            {projects && projects.length ? (
              <TableRows projects={projects} level={2} />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-lg font-bold py-5"
                >
                  No projects with status: {title} found
                </TableCell>
              </TableRow>
            )}
          </>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
};
