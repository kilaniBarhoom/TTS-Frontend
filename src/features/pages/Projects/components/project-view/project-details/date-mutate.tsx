import Typography from "@/components/ui/typography";
import { useProject } from "../provider";
import { Badge } from "@/components/ui/badge";
import { Calendar, MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const DateMutate = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Typography element="p" as="smallText" className="font-bold">
        {t("Dates")}:
      </Typography>
      <Badge
        variant={"outline"}
        className="cursor-pointer flex items-center gap-2 text-neutral-500"
      >
        <Calendar size={15} />
        {project.startDate}
      </Badge>
      <MoveRight className="text-neutral-500" size={15} />
      <Badge
        variant={"outline"}
        className="cursor-pointer flex items-center gap-2 text-neutral-500"
      >
        <Calendar size={15} />
        {project.endDate}
      </Badge>
    </div>
  );
};

export default DateMutate;
