import { useGetAllProjectsQuery } from "../../api";
import TablePagiation from "../component/pagination";
import ProjectsCards from "./cards";
import ProjectsTable from "./table";

export default function ProjectsWrapper() {
  const { data: tableResponse, isLoading } = useGetAllProjectsQuery();
  return (
    <div className="w-full">
      <div className="hidden md:flex bg-muted/20 border-border">
        <ProjectsTable projects={tableResponse?.items} isLoading={isLoading} />
      </div>
      <div className="flex w-full md:hidden">
        <ProjectsCards projects={tableResponse?.items} isLoading={isLoading} />
      </div>
      <div className="flex items-center md:border border-border md:py-2 py-4">
        <div className="space-x-2 mx-auto md:ml-auto md:mr-2">
          <TablePagiation totalPages={tableResponse?.totalPages} />
        </div>
      </div>
    </div>
  );
}
