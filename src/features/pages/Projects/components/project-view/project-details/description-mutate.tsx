import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { useProjectFormMutation } from "../../../api/projects";
import { useProject } from "../../../provider";
import RichEditor from "@/components/component/rich-editor";

const DescriptionMutate = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const DescriptionSchema = z.object({
    description: z.string().min(3, "Description must be at least 3 characters"),
  });

  type DescriptionSchemaType = z.infer<typeof DescriptionSchema>;

  const descriptionForm = useForm<DescriptionSchemaType>({
    resolver: zodResolver(DescriptionSchema),
    defaultValues: {
      description: project?.description || "",
    },
  });

  const { mutateAsync } = useProjectFormMutation();

  const onSubmit = async (data: DescriptionSchemaType) => {
    try {
      await mutateAsync({ ...data, projectId: project?.id });
      setIsEditing(false);
    } catch (error) {
      // Handle submission error
    }
  };

  const isLoading = descriptionForm.formState.isSubmitting;

  const handleCancel = () => {
    descriptionForm.reset();
    setIsEditing(false);
  };

  return (
    <div className="grid gap-2">
      <Typography element="p" as="smallText" className="font-bold">
        {t("Description")}:
      </Typography>
      <Form {...descriptionForm}>
        <form onSubmit={descriptionForm.handleSubmit(onSubmit)}>
          <FormField
            control={descriptionForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                {isEditing ? (
                  <>
                    <FormControl>
                      <RichEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        type="submit"
                        size={"xs"}
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        <Check size={16} />
                      </Button>
                      <Button
                        size={"xs"}
                        variant="secondary"
                        onClick={handleCancel}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div
                    className="text-muted-foreground w-[450px] py-2 leading-5 list-disc cursor-text hover:bg-muted/30"
                    onClick={() => setIsEditing(true)}
                    dangerouslySetInnerHTML={{ __html: field.value }}
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

export default DescriptionMutate;
