import { useTicket } from "../provider";
import MainDetails from "./main-details";
import TicketsSkeleton from "./skeleton";
import Comments from "../comments";
import OtherDetails from "./other-details";
import BreadcrumbComponent from "@/components/component/bread-crumb";
import WatchersMutate from "./mutation-components/watchers-mutate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

const TicketDetails = () => {
  const { ticket, isLoading } = useTicket();
  return (
    <div>
      {isLoading ? (
        <TicketsSkeleton />
      ) : (
        <>
          <div className="flex justify-between items-center pb-4 ">
            <BreadcrumbComponent
              tree={[{ title: "Tickets", link: "/tickets" }]}
              currentPage={ticket.name}
              className="m-0"
            />
            <WatchersMutate ticket={ticket}>
              <Button
                className={cn(
                  "gap-1 px-2",
                  ticket?.watchers?.length && "text-primary hover:text-primary"
                )}
                variant={"ghost"}
                size={"xs"}
              >
                <Eye size={20} /> {ticket?.watchers?.length || ""}
              </Button>
            </WatchersMutate>
          </div>
          <div className="md:flex grid md:px-4 md:p-0 overflow-y-auto h-full md:max-h-dvh">
            <div className="flex-[1.3] md:pr-4 grid gap-8 overflow-y-auto">
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
      )}
    </div>
  );
};

export default TicketDetails;
