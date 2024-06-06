import { useGetAllProjectsQuery } from "../../api/projects";
import TablePagiation from "../component/pagination";
import ProjectsCards from "./cards";
import ProjectsTable from "./table";

export default function ProjectsWrapper() {
  const { data: tableResponse, isLoading } = useGetAllProjectsQuery();
  return (
    <div className="w-full">
      <div className="hidden lg:flex bg-muted/20">
        <ProjectsTable projects={tableResponse?.items} isLoading={isLoading} />
      </div>
      <div className="flex w-full lg:hidden">
        <ProjectsCards projects={tableResponse?.items} isLoading={isLoading} />
      </div>
      <div className="flex items-center border-border py-4">
        <div className="space-x-2 mx-auto">
          <TablePagiation totalPages={tableResponse?.totalPages} />
        </div>
      </div>
    </div>
  );
}
