import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { ProjectT } from "@/lib/types";
import { MoveRight } from "lucide-react";
import ProjectStatusBadge from "../../component/project-status-badge";
import ActionsDropDown from "../table/actions-dropdown";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }: { project: ProjectT }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="m-0 p-0 bg-muted">
        <div className="flex items-center justify-between p-4">
          <ProjectStatusBadge status={project.projectStatus} />
          <ActionsDropDown projectId={project.id} />
        </div>
      </CardHeader>
      <Separator className="w-full border-border" />
      <CardContent className="grid gap-4 w-full p-4 bg-background">
        <Typography
          element="h3"
          as={"h3"}
          className="hover:underline cursor-pointer"
          onClick={() => navigate(project.id)}
        >
          {project.name}
        </Typography>
        <div
          className="text-muted-foreground leading-5 list-disc"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <div className="flex gap-2 items-center">
            <Badge
              variant={"outline"}
              className="text-muted-foreground text-xs"
            >
              {project.startDate}
            </Badge>
            <MoveRight className="text-muted-foreground" size={15} />
            <Badge
              variant={"outline"}
              className="text-muted-foreground text-xs"
            >
              {project.endDate}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
