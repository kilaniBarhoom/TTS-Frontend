import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectT } from "@/lib/types";
import { ProjectFormSchema, ProjectFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useProjectFormMutation } from "../../../api/projects";
import ProjectForm from "./form";

type AddProjectDialogDrawerProps = {
  children: React.ReactNode;
  project?: ProjectT;
};

export default function AddProjectDialogDrawer({
  children,
}: AddProjectDialogDrawerProps) {
  const projectForm = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(), // Change the type from string to Date
      projectStatus: "",
    },
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  const isLoading = projectForm.formState.isSubmitting;

  const { mutateAsync } = useProjectFormMutation();

  const onSubmit = async (data: ProjectFormSchemaType) => {
    try {
      await mutateAsync(data);
      projectForm.reset();
      setDrawerOpen(false);
      setDialogOpen(false);
    } catch (error: any) {
      // toast({
      //   variant: "destructive",
      //   title: t("Error"),
      //   description:
      //     t(error?.response?.data?.message) || t("Something went wrong"),
      // });
      console.log(error);
    }
  };

  const projectFormComponent = (
    <ProjectForm
      isLoading={isLoading}
      onSubmit={projectForm.handleSubmit(onSubmit)}
      projectForm={projectForm}
    />
  );

  return (
    <>
      <div className="flex md:hidden">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t("Create A New Project")}</DrawerTitle>
              <DrawerDescription>
                {t("Enter project details to create a new project")}
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-fit p-6">
              {projectFormComponent}
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:flex">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{t("Create A New Project")}</DialogTitle>
              <DialogDescription>
                {t("Enter project details to create a new project")}
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">{projectFormComponent}</div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
