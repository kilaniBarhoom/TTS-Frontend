import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useProject } from "../provider";
import { Button } from "@/components/ui/button";

const StatusMutate = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center relative">
      <Typography element="p" as={"smallText"} className="font-bold">
        {t("Status")}:
      </Typography>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <Button variant={"ghost"} className="w-fit h-fit p-0">
            <Badge className="px-1 py-0.5">{t(project.projectStatus)}</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuItem>
            <Badge className="px-1 py-0.5">{t("In Progress")}</Badge>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatusMutate;
