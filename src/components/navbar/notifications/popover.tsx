import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <PopoverContent className="w-fit">
        <NotificationsCard />
      </PopoverContent>
    </Popover>
  );
}
