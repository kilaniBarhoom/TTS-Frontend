import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Comments from "../../comments";
import { useTicket } from "../../provider";
import MainDetails from "../main-details";
import OtherDetails from "../other-details";
import TicketSkeleton from "../skeleton";
import Header from "./header";

const TicketDialogDrawer = ({
  children,
  ticketId,
}: {
  children: React.ReactNode;
  ticketId: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTicket = searchParams.get("selectedTicket");
  const [isOpen, setIsOpen] = useState(ticketId === selectedTicket);

  const setSelectedTicket = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("selectedTicket");
        if (value) prev.set("selectedTicket", value);
        return prev;
      },
      { replace: true }
    );
  };

  const handleChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (isOpen) {
      setSelectedTicket(ticketId);
    } else {
      setSearchParams(
        (prev) => {
          prev.delete("selectedTicket");
          return prev;
        },
        { replace: true }
      );
    }
  };

  const { isLoading } = useTicket();

  const content = isLoading ? (
    <TicketSkeleton />
  ) : (
    <>
      <div className="md:flex grid max-h-screen p-6">
        <div className="md:flex-[1.3] md:pr-4 grid gap-8 overflow-y-auto">
          <MainDetails />
          <div className="overflow-y-auto flex md:hidden flex-col gap-2">
            <OtherDetails />
          </div>
          <Comments />
        </div>
        <div className="flex-[0.7] overflow-y-auto pl-4 md:flex hidden flex-col gap-2">
          <OtherDetails />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="">
        <Dialog open={isOpen} onOpenChange={handleChange}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-screen-xl">
            <Header setOpenDialog={setIsOpen} isLoading={isLoading} />
            {content}
          </DialogContent>
        </Dialog>
      </div>
      {/* <div className="flex md:hidden">
        <Drawer open={isOpen} onOpenChange={handleChange}>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
            <Header setOpenDialog={setIsOpen} isLoading={isLoading} />
            <ScrollArea className="h-fit">{content}</ScrollArea>
          </DrawerContent>
        </Drawer>
      </div> */}
    </>
  );
};

export default TicketDialogDrawer;
