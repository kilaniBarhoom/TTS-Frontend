import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const TicketsSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
    </TableRow>
  );
};

export default TicketsSkeleton;
