import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketT } from "@/lib/types";
import { useSearchParams } from "react-router-dom";
import TicketsSkeleton from "./skeleton";
import TableRows from "./table-row-format/normal";
import TableGroupedRows from "./table-row-format/grouped";

const TicketsTable = ({
  tickets,
  isLoading,
}: {
  tickets: TicketT[];
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
          <TableHead className="min-w-52">Project</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Reporter</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          dummyArray.map((_, index) => <TicketsSkeleton key={index} />)
        ) : tickets && tickets.length ? (
          groupBy ? (
            <TableGroupedRows tickets={tickets} by={groupBy} />
          ) : (
            <TableRows tickets={tickets} />
          )
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg fond-bold py-5"
            >
              No tickets found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TicketsTable;
