import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectT } from "@/lib/types";
import { ProjectFormSchema, ProjectFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useProjectFormMutation } from "../../api";
import ProjectForm from "./form";

type MutationDialogProps = {
  children: React.ReactNode;
  project?: ProjectT;
};

export default function MutationDialog({ children }: MutationDialogProps) {
  const projectForm = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      projectStatus: "",
    },
  });
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const isLoading = projectForm.formState.isSubmitting;

  const { mutateAsync } = useProjectFormMutation();

  const onSubmit = async (data: ProjectFormSchemaType) => {
    try {
      await mutateAsync({ data });
      projectForm.reset();
      setOpen(false);
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create A New Project</DialogTitle>
          <DialogDescription>
            Enter project details to create a new project
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <ProjectForm
            isLoading={isLoading}
            onSubmit={projectForm.handleSubmit(onSubmit)}
            projectForm={projectForm}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
