import { UserAvatar } from "@/components/component/user-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useTicket } from "./provider";

const OtherDetails = () => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  return (
    <div className="flex-[0.7] overflow-y-auto px-5 flex flex-col gap-2">
      <div className=" flex gap-2 items-center">
        <Typography as="smallText" element="p" className="flex-[0.7]">
          {t("Status")}:
        </Typography>
        <div className="flex-[1.3] w-fit">
          <Select
            onValueChange={(e) => {
              console.log(e);
            }}
            defaultValue={ticket?.ticketStatus}
          >
            <SelectTrigger size="md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">
                <Typography element="p" as="extraSmallText">
                  {t("Active")}
                </Typography>
              </SelectItem>
              <SelectItem value="Pending">
                <Typography element="p" as="extraSmallText">
                  {t("Pending")}
                </Typography>
              </SelectItem>
              <SelectItem value="Completed">
                <Typography element="p" as="extraSmallText">
                  {t("Completed")}
                </Typography>
              </SelectItem>
              <SelectItem value="Canceled">
                <Typography element="p" as="extraSmallText">
                  {t("Canceled")}
                </Typography>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Typography as="smallText" element="p" className="flex-[0.7]">
          {t("Priority")}:
        </Typography>
        <div className="flex-[1.3] w-fit">
          <Select
            onValueChange={(e) => {
              console.log(e);
            }}
            defaultValue={ticket?.ticketPriority}
          >
            <SelectTrigger size="md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">
                <Typography element="p" as="extraSmallText">
                  {t("Low")}
                </Typography>
              </SelectItem>
              <SelectItem value="Medium">
                <Typography element="p" as="extraSmallText">
                  {t("Medium")}
                </Typography>
              </SelectItem>
              <SelectItem value="High">
                <Typography element="p" as="extraSmallText">
                  {t("High")}
                </Typography>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border border-border rounded-md">
        <div className="border-b border-border p-2">
          <Typography as="p" element="p">
            {t("Details")}
          </Typography>
        </div>
        <div className="p-2 grid gap-3">
          <div className="flex items-center">
            <Typography as="smallText" element="p" className="flex-[0.7]">
              {t("Assigned to")}:
            </Typography>
            <UserAvatar
              className="flex-[1.3]"
              name={ticket?.assignee.name}
              avatarSize="size-6"
            />
          </div>
          <div className="flex items-center">
            <Typography as="smallText" element="p" className="flex-[0.7]">
              {t("Reporter")}:
            </Typography>
            <UserAvatar
              className="flex-[1.3]"
              name={ticket?.reporter.name}
              avatarSize="size-6"
            />
          </div>
        </div>
      </div>
      <div className="p-2 flex gap-1 items-center">
        <Typography as="smallText" element="p">
          {t("Created")}:
        </Typography>
        <Typography
          as="extraSmallText"
          className="text-muted-foreground"
          element="p"
        >
          {t("Dummy date")}:
        </Typography>
      </div>
    </div>
  );
};

export default OtherDetails;
