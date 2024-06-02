import { BellRing, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { NotificationT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { useTranslation } from "react-i18next";
import { useGetMemberNotifs } from "./api";

type CardProps = React.ComponentProps<typeof Card>;

export default function NotificationsCard({ className, ...props }: CardProps) {
  const { data: notificationsResponse, isLoading } = useGetMemberNotifs();
  const { t } = useTranslation();

  const dummyArray = Array.from({ length: 5 });

  return (
    <Card className={cn("border-none w-full p-0", className)} {...props}>
      <CardHeader className="m-0 p-0">
        <div className="flex items-center justify-between p-4 ">
          <Typography
            as={"largeText"}
            element="h5"
            className="flex items-center gap-2"
          >
            <BellRing size={20} />
            {t("Notifications")}
          </Typography>
          <Button size="xs" variant="hover">
            <Settings size={20} />
          </Button>
        </div>
      </CardHeader>
      <Separator className="w-full border-border" />
      <CardContent className="grid gap-4 w-full py-4 px-0 bg-background overflow-auto">
        <ScrollArea className="md:h-52">
          <>
            {isLoading ? (
              <div className="animate-pulse gap-3 flex flex-col ">
                {dummyArray.map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : notificationsResponse && notificationsResponse.items.length ? (
              notificationsResponse.items.map((notification: NotificationT) => {
                return (
                  <div
                    key={notification.id}
                    className="mb-4 grid grid-cols-[25px_1fr] border-b border-border items-start p-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistance(
                          notification.timeStamp.toLocaleString(),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted-foreground">
                No new notifications
              </div>
            )}
          </>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
