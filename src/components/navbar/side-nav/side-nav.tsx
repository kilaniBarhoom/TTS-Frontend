import { CommandBox } from "./command-box";
import SideNavRender from "./side-nav-items-render";
import { WorkSpaceDropDown } from "./workspace-dropdown";

export default function SideNav() {
  return (
    <div className="ltr:border-r rtl:border-l border-border bg-muted flex flex-col w-full h-full">
      <div className="w-full p-2">
        <WorkSpaceDropDown />
      </div>
      <nav className="flex flex-col justify-start items-start text-md w-full gap-1 font-medium py-2 flex-1 overflow-y-auto">
        <div className="lg:flex-1 w-full">
          <CommandBox />
          <SideNavRender />
        </div>
      </nav>
    </div>
  );
}
