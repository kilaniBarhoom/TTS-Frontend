import { UserAvatar } from "@/components/component/user-avatar";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useTicket } from "../provider";
import StatusMutate from "./mutation-components/status-mutate";
import PriorityMutate from "./mutation-components/priority-mutate";

const OtherDetails = () => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  return (
    <div className="border border-border rounded-md">
      <div className="border-b border-border p-2">
        <Typography as="p" element="p">
          {t("Details")}
        </Typography>
      </div>
      <div className="p-2 grid gap-5">
        <StatusMutate />
        <PriorityMutate />
        <div className="flex items-center">
          <Typography as="smallText" element="p" className="flex-[0.5]">
            {t("Assigned to")}:
          </Typography>
          <UserAvatar
            className="flex-[1]"
            name={ticket?.assignee.name}
            avatarSize="size-6"
          />
        </div>
        <div className="flex items-center">
          <Typography as="smallText" element="p" className="flex-[0.5]">
            {t("Reporter")}:
          </Typography>
          <UserAvatar
            className="flex-[1]"
            name={ticket?.reporter.name}
            avatarSize="size-6"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
