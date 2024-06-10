import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddMemberSchemaType, addMemberSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import AddMembersForm from "./form";
import { useMemberMutation } from "../../api/members";

type AddMembersDialogDrawerProps = {
  openDialog: boolean;
  openDrawer: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  setOpenDrawer: (openDrawer: boolean) => void;
  projectId: string;
};

export default function AddMembersDialogDrawer({
  openDialog,
  openDrawer,
  setOpenDialog,
  setOpenDrawer,
  projectId,
}: AddMembersDialogDrawerProps) {
  const addMembersForm = useForm<AddMemberSchemaType>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync } = useMemberMutation(projectId);

  async function onSubmit(data: AddMemberSchemaType) {
    try {
      await mutateAsync({ data });
      addMembersForm.reset();
      setOpenDialog(false);
      setOpenDrawer(false);
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
  const isLoading = addMembersForm.formState.isSubmitting;

  const addMembersFormComponent = (
    <AddMembersForm
      addMembersForm={addMembersForm}
      onSubmit={addMembersForm.handleSubmit(onSubmit)}
      isLoading={isLoading}
      projectId={projectId}
    />
  );

  return (
    <>
      <div className="flex md:hidden">
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t("Add Member")}</DrawerTitle>
              <DrawerDescription>
                {t("Add new members to this project via email.")}
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-fit p-6">
              {addMembersFormComponent}
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:flex">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("Add Member")}</DialogTitle>
              <DialogDescription>
                {t("Add new members to this project via email.")}
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">{addMembersFormComponent}</div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
