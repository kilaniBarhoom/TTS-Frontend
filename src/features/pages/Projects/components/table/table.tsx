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
// import { useNavigate } from "react-router-dom";
import { ActionsColumn } from "./actons-dropdown";
import ProjectsSkeleton from "./skeleton";

const ProjectsTable = ({
  projects,
  isLoading,
}: {
  projects: ProjectT[];
  isLoading: boolean;
}) => {
  const dummyArray = Array.from({ length: 5 });
  // const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
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
                // onClick={() => navigate(project.id.toString())}
                onClick={() => console.log(project.id)}
              >
                <div className="truncate">{project.name}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-7">
                <div className="truncate">{project.description}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {project.startDate}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {project.endDate}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{project.projectStatus}</Badge>
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
