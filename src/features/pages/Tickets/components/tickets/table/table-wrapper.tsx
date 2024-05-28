import { useGetTicketsQuery } from "../../../api";
import TicketsTable from "./table";

export default function TableWrapper() {
  const { data: tickets, isLoading } = useGetTicketsQuery();
  return (
    <div className="w-full border-border border bg-muted/20 rounded-md">
      <div className="dark:text-white">
        <TicketsTable tickets={tickets || []} isLoading={isLoading} />
      </div>
      {/* <div className="flex items-center border-t border-border py-2">
        <div className="space-x-2 ml-auto pr-2">
          <TablePagiation totalPages={tableResponse?.totalPages} />
        </div>
      </div> */}
    </div>
  );
}
