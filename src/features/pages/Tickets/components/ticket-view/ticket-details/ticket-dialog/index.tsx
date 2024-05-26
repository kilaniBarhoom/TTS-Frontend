import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Comments from "../../comments";
import { useTicket } from "../../provider";
import MainDetails from "../main-details";
import OtherDetails from "../other-details";
import TicketSkeleton from "../skeleton";
import Header from "./header";

const TicketDialog = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);

  const { isLoading } = useTicket();
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl">
        {isLoading ? (
          <TicketSkeleton />
        ) : (
          <>
            <Header setOpenDialog={setOpenDialog} />
            <div className="md:flex grid max-h-[450px] overflow-y-auto px-4 md:p-0">
              <div className="md:flex-[1.3] md:pr-4 grid gap-8 overflow-y-auto">
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;
