import { Skeleton } from "@/components/ui/skeleton";

const ProjectsCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border border-border p-2">
          <div className="border-b border-border">
            <Skeleton className="h-12 rounded-md w-full" />
          </div>
          <div>
            <Skeleton className="h-16 rounded-md w-full" />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Skeleton className="h-10 rounded-md w-1/2" />
            <Skeleton className="h-10 rounded-md w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsCardsSkeleton;
