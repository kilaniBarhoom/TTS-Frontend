import { Route, Routes } from "react-router-dom";

import Projects from "./Projects";
import ProjectView from "./ProjectView";

const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path=":projectId" element={<ProjectView />} />
    </Routes>
  );
};

export default ProjectsRoutes;
