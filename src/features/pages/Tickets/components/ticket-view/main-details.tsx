import Typography from "@/components/ui/typography";
import { useTicket } from "./provider";
import { useTranslation } from "react-i18next";

const MainDetails = () => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  return (
    <div className="grid gap-8">
      <Typography as="h3" element="h3">
        {ticket?.name}
      </Typography>
      <div className="grid gap-3">
        <Typography element="p" as="smallText">
          {t("Description")}:
        </Typography>
        <Typography
          element="p"
          as={"smallText"}
          className="text-muted-foreground w-3/4 leading-5 font-normal"
        >
          {ticket?.description}
        </Typography>
      </div>
    </div>
  );
};

export default MainDetails;
