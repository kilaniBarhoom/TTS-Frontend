import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsCard from "./notifications";
import { useEffect, useState } from "react";
import Typography from "@/components/ui/typography";
import { BellRing, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
                <Typography
                  as={"largeText"}
                  element="h5"
                  className="flex items-center gap-2"
                >
                  <BellRing size={16} />
                  Notifications
                </Typography>
                <Button size="xs" variant="hover">
                  <Settings size={20} />
                </Button>
              </div>
              <div className="h-80 overflow-auto">
                <NotificationsCard />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex md:hidden">
          <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className=" border-border p-0">
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <Typography
                    as={"largeText"}
                    element="h5"
                    className="flex items-center gap-2"
                  >
                    <BellRing size={16} />
                    Notifications
                  </Typography>
                  <Button size="xs" variant="hover">
                    <Settings size={20} />
                  </Button>
                </div>
              </DrawerHeader>
              <div className="h-fit overflow-auto">
                <NotificationsCard />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
}
