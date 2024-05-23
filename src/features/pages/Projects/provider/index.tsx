import { ProjectT } from "@/lib/types";
import { createContext, useContext } from "react";
import { useGetProjectByIdQuery } from "../api";

const ProjectProviderContext = createContext<any>(null);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: project, isLoading } = useGetProjectByIdQuery();

  const value: {
    project: ProjectT;
    isLoading: boolean;
  } = {
    project,
    isLoading,
  };

  return (
    <ProjectProviderContext.Provider value={value}>
      {children}
    </ProjectProviderContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectProviderContext);
  if (!context) {
    throw new Error("useProject must be used within an ProjectProvider");
  }
  return context;
};
