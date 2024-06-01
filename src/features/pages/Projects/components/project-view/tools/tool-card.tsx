import Typography from "@/components/ui/typography";
import { Ticket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../../provider";

const ToolCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { project } = useProject();

  return (
    <div
      onClick={() => {
        navigate(`/tickets?projectId=${project?.id.toString()}`);
      }}
      className="flex border border-border cursor-pointer hover:bg-muted transition-all duration-200 ease-in-out rounded-md items-center w-full md:w-96 h-24"
    >
      <div className="flex-[0.2] bg-primary h-full rounded-l-md flex items-center justify-center">
        <Ticket size={30} className="-rotate-45" />
      </div>
      <div className="p-4 grid gap-2 flex-1">
        <Typography as="h3" element="h3">
          {t("Tickets")}
        </Typography>
        <Typography
          as={"smallText"}
          element="p"
          className="text-muted-foreground"
        >
          Here you can view all the tickets related to this project
        </Typography>
      </div>
    </div>
  );
};

export default ToolCard;
