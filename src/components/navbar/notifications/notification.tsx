import Typography from "@/components/ui/typography";
import { NotificationT } from "@/lib/types";
import { formatDistance } from "date-fns";

const Notification = ({ notification }: { notification: NotificationT }) => {
  return (
    <div className="flex gap-2 border-b border-border last:border-0 items-start p-4 tracking-wider">
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <div className="space-y-1">
        <Typography
          element="p"
          as={"smallText"}
          className="text-sm font-medium leading-none"
        >
          {notification.message}
        </Typography>
        <Typography
          element="p"
          as={"extraSmallText"}
          className="text-muted-foreground"
        >
          {formatDistance(notification.timeStamp.toLocaleString(), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </div>
    </div>
  );
};

export default Notification;
