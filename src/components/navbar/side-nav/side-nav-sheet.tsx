import { PanelRightClose } from "lucide-react";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import SideNavRender from "./side-nav-items-render";
import { WorkSpaceDropDown } from "./workspace-dropdown";
import { CommandBox } from "./command-box";

const SideNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghostOnNav" size="xs" className="shrink-0 lg:hidden">
          <PanelRightClose size={16} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="w-full p-2">
          <WorkSpaceDropDown />
        </div>
        <nav className="flex flex-col justify-start items-start text-md w-full gap-1 font-medium py-2 flex-1 overflow-y-auto">
          <div className="lg:flex-1 w-full">
            <CommandBox />
            <SideNavRender />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavSheet;
