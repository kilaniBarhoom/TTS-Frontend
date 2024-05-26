import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { useTicketFormMutation } from "@/features/pages/Tickets/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TicketPriorityBadge from "../../../component/ticket-priority-badge";
import { useTicket } from "../../provider";
import { useTranslation } from "react-i18next";

const PriorityMutate = () => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectRef = useRef(null);

  const PrioritySchema = z.object({
    ticketPriority: z.string(),
  });
  type PrioritySchemaType = z.infer<typeof PrioritySchema>;

  const priorityForm = useForm<PrioritySchemaType>({
    resolver: zodResolver(PrioritySchema),
    defaultValues: {
      ticketPriority: ticket?.ticketPriority,
    },
  });
  const { mutateAsync } = useTicketFormMutation();

  const onSubmit = async (data: PrioritySchemaType) => {
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
    <div className="flex gap-2 items-center">
      <Typography as="smallText" element="p" className="flex-[0.5]">
        {t("Priority")}:
      </Typography>
      <Form {...priorityForm}>
        <form onSubmit={priorityForm.handleSubmit(onSubmit)} className="flex-1">
          <FormField
            control={priorityForm.control}
            name="ticketPriority"
            render={({ field }) => (
              <FormItem>
                {isEditing ? (
                  <div className="inline-flex gap-2">
                    <Select
                      defaultOpen
                      onValueChange={async (value) => {
                        field.onChange(value);
                        await priorityForm.handleSubmit(onSubmit)();
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
                    <Button
                      size={"xs"}
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        priorityForm.setValue(
                          "ticketPriority",
                          ticket?.ticketPriority
                        );
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <TicketPriorityBadge
                    priority={field.value}
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

export default PriorityMutate;
