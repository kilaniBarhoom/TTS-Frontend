import { UserAvatar } from "@/components/component/user-avatar";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useProject } from "../../../provider";

const Owner = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center">
      <Typography element="p" as={"smallText"} className="font-bold">
        {t("Owner")}:
      </Typography>
      <Badge variant={"outline"}>
        <UserAvatar
          image={undefined}
          name={project?.owner?.name}
          avatarSize="size-6 font-normal"
        />
      </Badge>
    </div>
  );
};

export default Owner;
