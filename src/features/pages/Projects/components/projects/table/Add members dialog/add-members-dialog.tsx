import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MembersList from "./members-list";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AddMemberSchemaType, addMemberSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemberMutation } from "../../../../api";
// import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export default function AddMembersDialog({
  open,
  setOpen,
  projectId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
}) {
  const form = useForm<AddMemberSchemaType>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutateAsync } = useMemberMutation({ projectId });
  async function onSubmit(data: AddMemberSchemaType) {
    try {
      await mutateAsync({ data });
      form.reset();
    } catch (error: any) {
      console.log(error);

      //  toast({
      //    variant: "destructive",
      //    title: t("Error"),
      //    description:
      //      t(error?.response?.data?.message) || t("Something went wrong"),
      //  });
    }
  }

  const { t } = useTranslation();
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Add Member")}</DialogTitle>
          <DialogDescription>
            {t("Add new mwmbers to this project via email.")}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full p-6 pb-0 flex flex-col gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-2">
                <div className=" w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="email"
                            error={!!form.formState.errors.email?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">{t("Add")}</Button>
              </div>
            </form>
          </Form>
          <MembersList projectId={projectId} />
        </div>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="button"
              variant="secondary"
              className="w-full"
            >
              {t("Close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
