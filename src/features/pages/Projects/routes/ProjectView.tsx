import ProjectDetails from "../components/project-view/project-details";
import { ProjectProvider } from "../provider";

const ProjectView = () => {
  return (
    <ProjectProvider>
      <ProjectDetails />
    </ProjectProvider>
  );
};

export default ProjectView;
