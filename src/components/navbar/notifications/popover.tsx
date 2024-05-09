import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsCard from "./notifications";

export function NotificationsPopover({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[320px] ml-40 border-border">
        <NotificationsCard />
      </PopoverContent>
    </Popover>
  );
}
