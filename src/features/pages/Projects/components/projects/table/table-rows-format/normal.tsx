import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectT } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import ProjectStatusBadge from "../../../component/project-status-badge";
import ActionsDropDown from "../actons-dropdown";
const TableRows = ({
  projects,
  level,
}: {
  projects: ProjectT[];
  level?: number;
}) => {
  const navigate = useNavigate();
  return (
    <>
      {projects.map((project) => (
        <TableRow key={project.id}>
          <TableCell
            style={{ paddingLeft: `${level && level * 40}px` }}
            className="font-medium hover:underline cursor-pointer max-w-6 overflow-x-hidden"
            onClick={() => navigate(project.id.toString(), { replace: true })}
          >
            <div className="truncate">{project.name}</div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {project.startDate}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {project.endDate}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <ProjectStatusBadge status={project.projectStatus} />
          </TableCell>
          <TableCell className="flex justify-end">
            <ActionsDropDown projectId={project.id} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableRows;
