import TicketsTable from ".";
import { useGetTicketsQuery } from "../../../api/tickets";
import TicketsCards from "../cards";

export default function TableWrapper() {
  const { data: tickets, isLoading } = useGetTicketsQuery();
  return (
    <div className="w-full">
      <div className="hidden lg:flex bg-muted/20">
        <TicketsTable tickets={tickets || []} isLoading={isLoading} />
      </div>
      <div className="flex w-full lg:hidden">
        <TicketsCards tickets={tickets || []} isLoading={isLoading} />
      </div>
      {/* <div className="flex items-center lg:border border-border lg:py-2 py-4">
        <div className="space-x-2 mx-auto lg:ml-auto lg:mr-2">
          <TablePagiation totalPages={tableResponse?.totalPages} />
        </div>
      </div> */}
    </div>
  );
}
