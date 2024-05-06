import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SideNav from "./side-nav";

export default function Layout() {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  return (
    <div className="bg-background min-h-screen w-full flex flex-col">
      <header className="flex items-center gap-4 border-b border-border bg-muted/40">
        <Header setIsSideNavVisible={setIsSideNavVisible} />
      </header>
      <div className="flex-1 flex">
        {isSideNavVisible && (
          <div className="w-1/6 bg-sidebar border-r border-border hidden md:block">
            <SideNav />
          </div>
        )}
        <main className="flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
