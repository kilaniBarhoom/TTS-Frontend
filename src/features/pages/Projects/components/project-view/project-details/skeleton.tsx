import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-16" />
      <Separator className="w-full border-border" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-5">
        <div className="flex-1 flex flex-col gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-1/2" />
          ))}
          <Separator />
          <Skeleton className="h-10 w-1/3" />
          <div className="grid auto-rows-auto gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-3/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
