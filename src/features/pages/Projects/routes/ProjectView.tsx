import ProjectDetails from "../components/project-view/project-details";
import { ProjectProvider } from "../components/project-view/provider";

const ProjectView = () => {
  return (
    <ProjectProvider>
      <div className="h-full relative">
        <ProjectDetails />
      </div>
    </ProjectProvider>
  );
};

export default ProjectView;
