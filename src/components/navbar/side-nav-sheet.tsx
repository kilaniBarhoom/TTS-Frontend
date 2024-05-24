import SideNavRender from "./side-nav-items-render";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { PanelRightClose } from "lucide-react";

const SideNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghostOnNav" size="xs" className="shrink-0 md:hidden">
          <PanelRightClose size={16} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SideNavRender />
      </SheetContent>
    </Sheet>
  );
};

export default SideNavSheet;
