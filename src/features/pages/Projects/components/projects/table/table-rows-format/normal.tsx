import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectT } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import ProjectStatusBadge from "../../../component/project-status-badge";
import ActionsDropDown from "../actions-dropdown";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddProjectDialogDrawer from "../../add-project-dialog-drawer";
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
            className="font-medium hover:underline cursor-pointer  min-w-fit max-w-6 overflow-x-hidden"
            onClick={() => navigate(project.id.toString())}
          >
            <div className="truncate">{project.name}</div>
          </TableCell>
          <TableCell>{project.startDate}</TableCell>
          <TableCell>{project.endDate}</TableCell>
          <TableCell>
            <ProjectStatusBadge status={project.projectStatus} />
          </TableCell>
          <TableCell className="flex justify-end">
            <ActionsDropDown projectId={project.id} />
          </TableCell>
        </TableRow>
      ))}
      <TableRow className="border border-border">
        <TableCell colSpan={5} className="cursor-pointer">
          <AddProjectDialogDrawer>
            <Button
              className="gap-2 p-0 w-full justify-start"
              variant={"hover"}
            >
              <Plus size={20} />
              New
            </Button>
          </AddProjectDialogDrawer>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRows;
