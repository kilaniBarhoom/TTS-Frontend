import SideNavRender from "./side-nav-items-render";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const SideNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="hover" size="xs" className="shrink-0 md:hidden">
          <Menu size={20} />
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
