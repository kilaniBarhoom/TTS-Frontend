import SideNavRender from "./side-nav-items-render";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowRightFromLine } from "lucide-react";

const SideNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="xs" className="shrink-0 md:hidden">
          <ArrowRightFromLine size={16} />
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
