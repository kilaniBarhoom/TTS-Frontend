// import { cn } from "@/lib/utils";
// import { PanelRightClose } from "lucide-react";
import { Outlet } from "react-router-dom";
// import { Button } from "../ui/button";
import Header from "./header/header";
import SideNav from "./side-nav/side-nav";

export default function Layout() {
  return (
    <div className=" min-h-screen w-full flex flex-col bg-background">
      <aside className="bg-sidebar fixed inset-y-0 left-0 z-10 border-r border-border hidden lg:flex min-w-56 w-56 transition-all duration-300 ease-in-out overflow-y-auto">
        <SideNav />
      </aside>
      <div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out lg:pl-56">
        <header className="flex items-center gap-4 border-b border-border bg-muted">
          {/* <Button
            variant="ghostOnNav"
            size="xs"
            onClick={() => {
              setIsSideNavVisible && setIsSideNavVisible(true);
            }}
            className={cn(
              "absolute top-2 left-2",
              isSideNavVisible ? "hidden" : "md:block hidden"
            )}
          >
            <PanelRightClose size={16} />
          </Button> */}
          <Header />
        </header>
        <main className="flex-1 p-4 h-screen w-full max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
