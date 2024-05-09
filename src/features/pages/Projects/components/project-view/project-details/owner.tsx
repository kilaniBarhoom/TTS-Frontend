import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useProject } from "../provider";
import { useTranslation } from "react-i18next";

const Owner = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center">
      <Typography element="p" as={"smallText"} className="font-bold">
        {t("Owner")}:
      </Typography>
      <Badge
        className="pr-1.5 pl-1 py-1 flex items-center w-fit gap-2"
        variant={"outline"}
      >
        <Avatar className="size-5">
          <AvatarImage src={undefined} alt="owner" />
          <AvatarFallback>{project?.owner?.name[0]}</AvatarFallback>
        </Avatar>
        <Typography element="p" as={"smallText"}>
          {project?.owner?.name}
        </Typography>
      </Badge>
    </div>
  );
};

export default Owner;
