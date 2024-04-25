import { useGetAllProjectsQuery } from "../../api";
import TablePagiation from "./pagination";
import ProjectsTable from "./table";

export default function TableWrapper() {
  const { data: tableResponse, isLoading } = useGetAllProjectsQuery();
  return (
    <div className="w-full border-border border-2 rounded-md">
      <div className="dark:text-white">
        <ProjectsTable projects={tableResponse?.items} isLoading={isLoading} />
      </div>
      <div className="flex items-center border-t border-border py-2">
        <div className="space-x-2 ml-auto pr-2">
          <TablePagiation totalPages={tableResponse?.totalPages} />
        </div>
      </div>
    </div>
  );
}
