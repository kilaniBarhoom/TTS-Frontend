import { Separator } from "@/components/ui/separator";
import ProjectDetails from "../components/project-view/project-details";
import Tools from "../components/project-view/tools";
import { ProjectProvider } from "../provider";

const ProjectView = () => {
  return (
    <ProjectProvider>
      <div className="h-full relative">
        <div className="grid gap-5">
          <ProjectDetails />
          <Separator className="w-full border-border" />
          <div className="flex flex-col gap-10 w-full">
            <Tools />
          </div>
        </div>
      </div>
    </ProjectProvider>
  );
};

export default ProjectView;
