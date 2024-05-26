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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { useProjectFormMutation } from "../../../api";
import { useProject } from "../../../provider";
import ProjectStatusBadge from "../../component/project-status-badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const StatusMutate = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectRef = useRef(null);

  const StatusSchema = z.object({
    projectStatus: z.string(),
  });

  type StatusSchemaType = z.infer<typeof StatusSchema>;

  const statusForm = useForm<StatusSchemaType>({
    resolver: zodResolver(StatusSchema),
    defaultValues: {
      projectStatus: project?.projectStatus,
    },
  });

  const { mutateAsync } = useProjectFormMutation();

  const onSubmit = async (data: StatusSchemaType) => {
    try {
      await mutateAsync({ ...data, projectId: project?.id });
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
    <div className="flex gap-2 items-center relative">
      <Typography element="p" as={"smallText"} className="font-bold">
        {t("Status")}:
      </Typography>
      <Form {...statusForm}>
        <form onSubmit={statusForm.handleSubmit(onSubmit)}>
          <FormField
            control={statusForm.control}
            name="projectStatus"
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
                        <SelectItem value="Pending">{t("Pending")}</SelectItem>
                        <SelectItem value="Active">{t("Active")}</SelectItem>
                        <SelectItem value="Completed">
                          {t("Completed")}
                        </SelectItem>
                        <SelectItem value="Draft">{t("Draft")}</SelectItem>
                        <SelectItem value="OnHold">{t("OnHold")}</SelectItem>
                        <SelectItem value="Canceled">
                          {t("Canceled")}
                        </SelectItem>
                        <SelectItem value="Delayed">{t("Delayed")}</SelectItem>
                        <SelectItem value="UnderReview">
                          {t("UnderReview")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size={"xs"}
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        statusForm.setValue(
                          "projectStatus",
                          project?.projectStatus
                        );
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <ProjectStatusBadge
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
