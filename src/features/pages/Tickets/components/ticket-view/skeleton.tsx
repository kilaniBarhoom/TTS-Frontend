import { Skeleton } from "@/components/ui/skeleton";

const TicketsSkeleton = () => {
  return (
    <div className="grid gap-2">
      <div className="my-4">
        <Skeleton className="w-1/3 h-6" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-1/3 h-6" />
      </div>
    </div>
  );
};

export default TicketsSkeleton;
