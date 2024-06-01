import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SideNav from "./side-nav";
import { Button } from "../ui/button";
import { PanelRightClose } from "lucide-react";

export default function Layout() {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  return (
    <div className=" min-h-screen w-full flex flex-col bg-background">
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-10 border-r border-border hidden md:flex min-w-64 transition-all duration-300 ease-in-out overflow-y-auto",
          isSideNavVisible ? "w-72" : "w-0 min-w-0"
        )}
      >
        <SideNav setIsSideNavVisible={setIsSideNavVisible} />
      </aside>
      <div
        className={cn(
          " min-h-screen flex flex-col transition-all duration-300 ease-in-out",
          isSideNavVisible ? "md:pl-72" : "pl-0"
        )}
      >
        <header className="flex items-center gap-4 border-b border-border bg-muted">
          <Button
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
          </Button>
          <Header />
        </header>
        <main className="flex-1 p-4 h-screen w-full max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
