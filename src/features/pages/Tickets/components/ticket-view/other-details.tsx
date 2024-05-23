import { useTranslation } from "react-i18next";
import { useTicket } from "./provider";
import Typography from "@/components/ui/typography";
import { UserAvatar } from "@/components/component/user-avatar";

const OtherDetails = () => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  return (
    <div className="flex-[0.7] overflow-y-auto px-5">
      <div className="border border-border rounded-md">
        <div className="border-b border-border p-2">
          <Typography as="p" element="p">
            {t("Details")}
          </Typography>
        </div>
        <div className="p-2 grid gap-3">
          <div className="flex items-center">
            <Typography as="smallText" element="p" className="flex-1">
              {t("Assigned to")}:
            </Typography>
            <UserAvatar
              className="flex-1"
              name={ticket?.assignee.name}
              avatarSize="size-6"
            />
          </div>
          <div className="flex items-center">
            <Typography as="smallText" element="p" className="flex-1">
              {t("Reporter")}:
            </Typography>
            <UserAvatar
              className="flex-1"
              name={ticket?.reporter.name}
              avatarSize="size-6"
            />
          </div>
        </div>
      </div>
      <Typography as="p" element="p">
        {t("Created at")}:
      </Typography>
    </div>
  );
};

export default OtherDetails;
