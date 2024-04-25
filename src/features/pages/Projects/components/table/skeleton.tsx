import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const ProjectsSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
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

export default ProjectsSkeleton;
