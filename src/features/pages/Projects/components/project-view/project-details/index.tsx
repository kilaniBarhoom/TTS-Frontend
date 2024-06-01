import { Separator } from "@/components/ui/separator";
import { useProject } from "../../../provider";

// import TiptapEditor from "../components/projects/mutation dialog/tiptqp-editor/tiptap-editor";
import BreadcrumbComponent from "@/components/component/bread-crumb";
import DateMutate from "./date-mutate";
import DescriptionMutate from "./description-mutate";
import MembersMutate from "./members-mutate";
import NameMutate from "./name-mutate";
import Owner from "./owner";
import StatusMutate from "./status-mutate";
import ProjectDetailsSkeleton from "./skeleton";
import Tools from "../tools";

const ProjectDetails = () => {
  const { project, isLoading } = useProject();

  return (
    <div className="w-full">
      {isLoading ? (
        <ProjectDetailsSkeleton />
      ) : (
        project && (
          <div>
            <BreadcrumbComponent
              tree={[{ title: "Projects", link: "/projects" }]}
              currentPage={project?.name}
            />
            <div className="grid gap-5">
              <div className="grid gap-5">
                <NameMutate />
                <StatusMutate />
                <DateMutate />
                <Owner />
                <MembersMutate />
                <DescriptionMutate />
              </div>
              <Separator className="w-full border-border" />
              <div>
                <Tools />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectDetails;
