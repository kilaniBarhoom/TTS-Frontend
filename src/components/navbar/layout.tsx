import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SideNav from "./side-nav";
import { cn } from "@/lib/utils";

export default function Layout() {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  return (
    <div className="flex-1 flex">
      <div
        className={cn(
          "bg-sidebar border-r border-border hidden md:block transition-all duration-300 ease-in-out overflow-y-auto",
          isSideNavVisible ? "w-64" : "w-0"
        )}
      >
        <SideNav />
      </div>
      <div className="bg-background min-h-screen w-full flex flex-col">
        <header className="flex items-center gap-4 border-b border-border bg-muted/40 ">
          <Header
            isSideNavVisible={isSideNavVisible}
            setIsSideNavVisible={setIsSideNavVisible}
          />
        </header>
        <main className="flex-1 p-4 w-full max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
