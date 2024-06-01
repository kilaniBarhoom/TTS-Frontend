import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsCard from "./notifications";
import { useEffect, useState } from "react";

export function NotificationsPopoverDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsLargeScreen = window.innerWidth >= 768;
      if (newIsLargeScreen !== isLargeScreen) {
        setIsLargeScreen(newIsLargeScreen);
        setIsOpen(false); // Close the current open component when switching
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLargeScreen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      {isLargeScreen ? (
        <div className="hidden md:flex">
          <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align="end" className="w-[320px] border-border p-0">
              <NotificationsCard />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex md:hidden">
          <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-4/5 border-border p-0">
              <NotificationsCard />
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
}
