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
      <PopoverContent
        align="start"
        className="w-[320px] mt-[0.2rem] border-border relative  p-0"
      >
        <div className="absolute -top-4 left-0 translate-x-1 transform  w-0 h-0 border-solid border-8 border-r-transparent border-l-transparent border-t-transparent border-b-border" />
        <NotificationsCard />
      </PopoverContent>
    </Popover>
  );
}
