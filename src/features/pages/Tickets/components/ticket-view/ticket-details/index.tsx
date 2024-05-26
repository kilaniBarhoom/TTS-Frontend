import Typography from "@/components/ui/typography";
import { useTicket } from "../provider";
import MainDetails from "./main-details";
import TicketsSkeleton from "./skeleton";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Comments from "../comments";
import OtherDetails from "./other-details";
import BreadcrumbComponent from "@/components/component/bread-crumb";
import WatchersMutate from "./mutation-components/watchers-mutate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

const TicketDetails = () => {
  const { ticket, isLoading } = useTicket();
  const { t } = useTranslation();
  return (
    <div>
      {isLoading ? (
        <TicketsSkeleton />
      ) : (
        <div>
          <div className="flex justify-between items-center pb-4">
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
          <div className="md:flex grid px-4 md:p-0 overflow-y-auto max-h-dvh">
            <div className="flex-[1.3] md:pr-4 grid gap-8 overflow-y-auto">
              <MainDetails />
              <div className="overflow-y-auto flex md:hidden flex-col gap-2">
                <OtherDetails />
              </div>
              <div className="grid gap-1">
                <Typography element="p" as="smallText">
                  {t("Activity")}:
                </Typography>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full justify-start rtl:flex-row-reverse mb-2">
                    <p>Show:</p>
                    <TabsTrigger
                      value="all"
                      className="gap-1 items-center flex text-sm"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="comments"
                      className="gap-1 items-center flex text-sm"
                    >
                      Comments
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <Comments />
                  </TabsContent>
                  <TabsContent value="comments">
                    <Typography as="p" element="p">
                      No comments yet
                    </Typography>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="flex-[0.7] overflow-y-auto pl-4 md:flex hidden flex-col gap-2">
              <OtherDetails />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
