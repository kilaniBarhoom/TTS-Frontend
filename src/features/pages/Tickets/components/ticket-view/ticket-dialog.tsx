import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Header from "./header";
import MainDetails from "./main-details";
import OtherDetails from "./other-details";
import { useTicket } from "./provider";
import TicketsSkeleton from "./skeleton";
import Comments from "./comments";

const TicketDialog = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // setSearchParams((prev) => {
    //   prev.delete("selectedTicket");
    // });
  };

  // useEffect(() => {
  //   if (searchParams.has("selectedTicket")) {
  //     setOpenDialog(true);
  //   }
  // }, []);
  const { isLoading } = useTicket();
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent withoutClose className="sm:max-w-screen-xl h-[600px]">
        {isLoading ? (
          <TicketsSkeleton />
        ) : (
          <>
            <Header handleCloseDialog={handleCloseDialog} />
            <div className="flex max-h-[450px]">
              <div className="flex-[1.3] grid gap-8 overflow-y-auto px-5">
                <MainDetails />
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
              <OtherDetails />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;
