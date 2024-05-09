import { Textarea } from "@/components/ui/textarea";
import { useProject } from "../provider";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useProjectFormMutation } from "../../../api";

const NameMutate = () => {
  const { project } = useProject();
  const NameSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
  });
  type NameSchemaType = z.infer<typeof NameSchema>;

  const titleForm = useForm<NameSchemaType>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: project?.name,
    },
  });

  // Use the modified useProjectFormMutation hook
  const { mutateAsync } = useProjectFormMutation();

  const onSubmit = async (data: NameSchemaType) => {
    // Pass the entire form data object to mutateAsync
    // await mutateAsync({ ...data, projectId: project?.id });
  };

  return (
    <Form {...titleForm}>
      <form onSubmit={titleForm.handleSubmit(onSubmit)}>
        <FormField
          control={titleForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="text-3xl font-extrabold border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full resize-none h-12 p-0 m-0"
                  onBlur={titleForm.handleSubmit(onSubmit)}
                  autoComplete="name"
                  error={!!titleForm.formState.errors.name?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default NameMutate;
