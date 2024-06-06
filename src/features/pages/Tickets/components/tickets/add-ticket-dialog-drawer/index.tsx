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
import { TicketFormSchema, TicketFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useTicketFormMutation } from "../../../api/tickets";
import TicketForm from "./form";

type AddTicketDialogDrawerProps = {
  children: React.ReactNode;
  project?: ProjectT;
};

export default function AddTicketDialogDrawer({
  children,
}: AddTicketDialogDrawerProps) {
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
      parentTicketId: null,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const { t } = useTranslation();
  const isLoading = ticketForm.formState.isSubmitting;

  const { mutateAsync } = useTicketFormMutation();

  const onSubmit = async (data: TicketFormSchemaType) => {
    try {
      await mutateAsync(data);
      ticketForm.reset();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const ticketFormComponent = (
    <TicketForm
      isLoading={isLoading}
      onSubmit={ticketForm.handleSubmit(onSubmit)}
      ticketForm={ticketForm}
      projectId={projectId}
    />
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
      setIsOpen(false); // Close the current open component when switching
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <div className="hidden md:flex">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>{t("Create A New Ticket")}</DialogTitle>
                <DialogDescription>
                  {t("Enter ticket details to create a new ticket")}
                </DialogDescription>
              </DialogHeader>
              <div className="p-6">{ticketFormComponent}</div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="flex md:hidden over">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{t("Create A New Ticket")}</DrawerTitle>
                <DrawerDescription>
                  {t("Enter ticket details to create a new ticket")}
                </DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="h-fit p-6">
                {ticketFormComponent}
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
}
