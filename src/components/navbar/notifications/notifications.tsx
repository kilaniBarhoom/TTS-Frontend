import { Skeleton } from "@/components/ui/skeleton";
import { NotificationT } from "@/lib/types";
import { useGetMemberNotifs } from "./api";
import Notification from "./notification";

export default function NotificationsCard() {
  const { data: notificationsResponse, isLoading } = useGetMemberNotifs();

  const dummyArray = Array.from({ length: 5 });

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <div className="animate-pulse gap-3 flex flex-col ">
          {dummyArray.map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : notificationsResponse && notificationsResponse.items.length ? (
        notificationsResponse.items.map((notification: NotificationT) => {
          return (
            <Notification key={notification.id} notification={notification} />
          );
        })
      ) : (
        <div className="text-center text-muted-foreground">
          No new notifications
        </div>
      )}
    </div>
  );
}
