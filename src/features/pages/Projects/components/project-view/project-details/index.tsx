import { Separator } from "@/components/ui/separator";
import { useProject } from "../provider";

// import TiptapEditor from "../components/projects/mutation dialog/tiptqp-editor/tiptap-editor";
import BreadcrumbComponent from "@/components/component/bread-crumb";
import { Skeleton } from "@/components/ui/skeleton";
import Tools from "../tools";
import DateMutate from "./date-mutate";
import DescriptionMutate from "./description-mutate";
import MembersMutate from "./members-mutate";
import Owner from "./owner";
import StatusMutate from "./status-mutate";
import NameMutate from "./name-mutate";

const ProjectDetails = () => {
  const { project, isLoading } = useProject();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-16" />
          <Separator className="w-full border-border" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-5">
            <div className="flex-1 flex flex-col gap-5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>
        </div>
      ) : (
        project && (
          <div>
            <BreadcrumbComponent
              tree={["Projects"]}
              currentPage={project?.name}
            />
            <NameMutate />
            <div className="grid gap-5 my-5">
              <div className="flex flex-col gap-5">
                <StatusMutate />
                <DateMutate />
                <Owner />
                <MembersMutate />
                <DescriptionMutate />
              </div>
              <Separator className="w-full border-border" />
              <div className="flex flex-col gap-10 w-full">
                <Tools />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProjectDetails;
