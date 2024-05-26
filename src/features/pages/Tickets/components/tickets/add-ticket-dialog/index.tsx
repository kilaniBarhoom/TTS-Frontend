import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectT } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTicketFormMutation } from "../../../api";
import { TicketFormSchema, TicketFormSchemaType } from "@/schemas";
import TicketForm from "./form";
import { useSearchParams } from "react-router-dom";

type AddTicketDialogProps = {
  children: React.ReactNode;
  project?: ProjectT;
};

export default function AddTicketDialog({ children }: AddTicketDialogProps) {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const ticketForm = useForm<TicketFormSchemaType>({
    resolver: zodResolver(TicketFormSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      ticketStatus: "",
      ticketPriority: "",
      projectId: projectId || "",
      assigneeId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const isLoading = ticketForm.formState.isSubmitting;

  const { mutateAsync } = useTicketFormMutation();

  const onSubmit = async (data: TicketFormSchemaType) => {
    try {
      await mutateAsync(data);
      ticketForm.reset();
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
          <DialogTitle>{t("Create A New Ticket")}</DialogTitle>
          <DialogDescription>
            {t("Enter ticket details to create a new ticket")}
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <TicketForm
            isLoading={isLoading}
            onSubmit={ticketForm.handleSubmit(onSubmit)}
            ticketForm={ticketForm}
            projectId={projectId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
