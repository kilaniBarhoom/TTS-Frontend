import { useGetTicketsQuery } from "../../../api";
import TicketsCards from "../cards";
import TicketsTable from "./table";

export default function TableWrapper() {
  const { data: tickets, isLoading } = useGetTicketsQuery();
  return (
    <div className="w-full">
      <div className="hidden md:flex bg-muted/20 border border-border">
        <TicketsTable tickets={tickets || []} isLoading={isLoading} />
      </div>
      <div className="flex w-full md:hidden">
        <TicketsCards tickets={tickets || []} isLoading={isLoading} />
      </div>
      {/* <div className="flex items-center md:border border-border md:py-2 py-4">
        <div className="space-x-2 mx-auto md:ml-auto md:mr-2">
          <TablePagiation totalPages={tableResponse?.totalPages} />
        </div>
      </div> */}
    </div>
  );
}
