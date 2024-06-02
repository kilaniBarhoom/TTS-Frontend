import { Input } from "@/components/ui/input";
import MembersList from "./members-list";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const AddMembersForm = ({
  addMembersForm,
  onSubmit,
  isLoading,
  projectId,
}: {
  addMembersForm: any;
  onSubmit: any;
  isLoading: boolean;
  projectId: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-2 pb-0 flex flex-col gap-5">
      <Form {...addMembersForm}>
        <form onSubmit={addMembersForm.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <div className=" w-full">
              <FormField
                control={addMembersForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="email"
                        error={!!addMembersForm.formState.errors.email?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              {t("Add")}
            </Button>
          </div>
        </form>
      </Form>
      <MembersList projectId={projectId} />
    </div>
  );
};

export default AddMembersForm;
