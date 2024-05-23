import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectT } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { ActionsColumn } from "./actons-dropdown";
import ProjectsSkeleton from "./skeleton";
import { cn } from "@/lib/utils";

const ProjectsTable = ({
  projects,
  isLoading,
}: {
  projects: ProjectT[];
  isLoading: boolean;
}) => {
  const dummyArray = Array.from({ length: 5 });
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Start Date</TableHead>
          <TableHead className="hidden md:table-cell">End Date</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          dummyArray.map((_, index) => <ProjectsSkeleton key={index} />)
        ) : projects.length ? (
          projects.map((project: ProjectT) => (
            <TableRow key={project.id}>
              <TableCell
                className="font-medium hover:underline cursor-pointer max-w-6"
                onClick={() =>
                  navigate(project.id.toString(), { replace: true })
                }
              >
                <div className="truncate">{project.name}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {project.startDate}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {project.endDate}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant="outline"
                  size="sm"
                  className={cn(
                    project.projectStatus === "Active"
                      ? "border-status-active bg-status-active/40 text-status-active-foreground hover:bg-status-active/30"
                      : project.projectStatus === "Completed"
                      ? "border-status-completed bg-status-completed/40 text-status-completed-foreground hover:bg-status-completed/30"
                      : project.projectStatus === "OnHold"
                      ? "border-status-onhold bg-status-onhold/40 text-status-onhold-foreground hover:bg-status-onhold/30"
                      : project.projectStatus === "Canceled"
                      ? "border-status-canceled bg-status-canceled/40 text-status-canceled-foreground hover:bg-status-canceled/30"
                      : project.projectStatus === "Pending"
                      ? "border-status-pending bg-status-pending/40 text-status-pending-foreground hover:bg-status-pending/30"
                      : project.projectStatus === "Delayed"
                      ? "border-status-delayed bg-status-delayed/40 text-status-delayed-foreground hover:bg-status-delayed/30"
                      : project.projectStatus === "UnderReview"
                      ? "border-status-underreview bg-status-underreview/40 text-status-underreview-foreground hover:bg-status-underreview/30"
                      : project.projectStatus === "Draft"
                      ? "border-status-draft bg-status-draft/40 text-status-draft-foreground hover:bg-status-draft/30"
                      : ""
                  )}
                >
                  {project.projectStatus}
                </Badge>
              </TableCell>
              <TableCell className="flex justify-end">
                <ActionsColumn projectId={project.id} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg fond-bold py-5"
            >
              No projects found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
