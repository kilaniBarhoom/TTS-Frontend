import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectT } from "@/lib/types";
import ProjectsTableSkeleton from "./skeleton";
import TableRows from "./table-rows-format/normal";
import { useSearchParams } from "react-router-dom";
import TableGroupedRows from "./table-rows-format/grouped";

const ProjectsTable = ({
  projects,
  isLoading,
}: {
  projects: ProjectT[];
  isLoading: boolean;
}) => {
  const dummyArray = Array.from({ length: 5 });
  const [searchParams] = useSearchParams();
  const groupBy = searchParams.get("groupBy");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-52">Name</TableHead>
          <TableHead className="min-w-28">Start Date</TableHead>
          <TableHead className="min-w-28">End Date</TableHead>
          <TableHead className="min-w-28">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          dummyArray.map((_, index) => <ProjectsTableSkeleton key={index} />)
        ) : projects.length ? (
          groupBy ? (
            <TableGroupedRows projects={projects} />
          ) : (
            <TableRows projects={projects} />
          )
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
