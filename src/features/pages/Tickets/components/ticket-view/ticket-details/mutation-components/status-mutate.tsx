import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import { useTicketFormMutation } from "@/features/pages/Tickets/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import TicketStatusBadge from "../../../component/ticket-status-badge";
import { useTicket } from "../../provider";

const StatusMutate = () => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const StatusSchema = z.object({
    ticketStatus: z.string(),
  });
  type StatusSchemaType = z.infer<typeof StatusSchema>;

  const statusForm = useForm<StatusSchemaType>({
    resolver: zodResolver(StatusSchema),
    defaultValues: {
      ticketStatus: ticket?.ticketStatus,
    },
  });
  const { mutateAsync } = useTicketFormMutation();

  const onSubmit = async (data: StatusSchemaType) => {
    try {
      await mutateAsync({
        ...data,
        projectId: ticket?.project?.id,
        ticketId: ticket?.id,
      });
      setIsEditing(false);
    } catch (error) {
      // Handle submission error
    }
  };

  const handleBadgeClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (selectRef.current) {
        selectRef.current.click();
      }
    }, 0);
  };
  return (
    <div className=" flex gap-2 items-center">
      <Typography as="smallText" element="p" className="flex-[0.5]">
        {t("Status")}:
      </Typography>
      <Form {...statusForm}>
        <form onSubmit={statusForm.handleSubmit(onSubmit)} className="flex-1">
          <FormField
            control={statusForm.control}
            name="ticketStatus"
            render={({ field }) => (
              <FormItem>
                {isEditing ? (
                  <div className="inline-flex gap-2">
                    <Select
                      defaultOpen
                      onValueChange={async (value) => {
                        field.onChange(value);
                        await statusForm.handleSubmit(onSubmit)();
                        setIsEditing(false);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          ref={selectRef}
                          className="text-sm py-1 px-2 h-fit gap-2"
                        >
                          <SelectValue placeholder={t("Select a status")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="InProgress">
                          <Typography element="p" as="extraSmallText">
                            {t("InProgress")}
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
                    <Button
                      size={"xs"}
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        statusForm.setValue(
                          "ticketStatus",
                          ticket?.ticketStatus
                        );
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <TicketStatusBadge
                    status={field.value}
                    className="cursor-pointer"
                    onAction={() => handleBadgeClick()}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default StatusMutate;
