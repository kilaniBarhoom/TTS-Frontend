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
                  <Select
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
                    </SelectContent>
                  </Select>
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
