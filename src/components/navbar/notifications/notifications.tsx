import { BellRing, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { useGetMemberNotifs } from "./api";
import { useTranslation } from "react-i18next";

type CardProps = React.ComponentProps<typeof Card>;

export default function NotificationsCard({ className, ...props }: CardProps) {
  const { data: notificationsResponse, isLoading } = useGetMemberNotifs();
  const { t } = useTranslation();
  return (
    <Card className={cn("w-[340px] border-none", className)} {...props}>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 mb-5">
            <BellRing />
            {t("Notifications")}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ScrollArea className="h-72">
          <div>
            {isLoading ? (
              <div className="animate-pulse gap-3 flex flex-col ">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : notificationsResponse && notificationsResponse.items.length ? (
              notificationsResponse.items.map((notification: NotificationT) => {
                return (
                  <div
                    key={notification.id}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
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
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Mark All As Read <Check size={20} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
