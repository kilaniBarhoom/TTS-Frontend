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
      <PopoverContent className="w-[320px] mt-[0.2rem] border-border relative  p-0">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform  w-0 h-0 border-solid border-8 border-r-transparent border-l-transparent border-t-transparent border-b-border" />
        <NotificationsCard />
      </PopoverContent>
    </Popover>
  );
}
