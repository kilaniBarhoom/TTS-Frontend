import Typography from "@/components/ui/typography";
import { Ticket } from "lucide-react";
import { useTranslation } from "react-i18next";

const ToolCard = () => {
  const { t } = useTranslation();
  return (
    <div className="flex border border-border cursor-pointer hover:bg-muted transition-all duration-200 ease-in-out rounded-md items-center w-fit h-24">
      <div className="flex-[0.2] bg-primary h-full rounded-l-md flex items-center justify-center">
        {/* icon */}
        <Ticket size={30} className="-rotate-45" />
      </div>
      <div className="p-2 flex-1">
        <Typography as={"largeText"} element="h4">
          {t("Tickets")}
        </Typography>
        <Typography as={"smallText"} element="p" className="text-neutral-500">
          Here you can view all the tickets related to this project
        </Typography>
      </div>
    </div>
  );
};

export default ToolCard;