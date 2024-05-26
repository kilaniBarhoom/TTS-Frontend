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
import ProjectStatusBadge from "../../component/project-status-badge";

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
          <TableHead className="min-w-52">Name</TableHead>
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
                <ProjectStatusBadge status={project.projectStatus} />
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
        {/* <TableGroutRow /> */}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
