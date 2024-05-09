import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SideNav from "./side-nav";

export default function Layout() {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  return (
    <div className="flex-1 flex">
      {isSideNavVisible && (
        <div className="w-64 bg-sidebar border-r border-border hidden md:block">
          <SideNav />
        </div>
      )}
      <div className="bg-background min-h-screen w-full flex flex-col">
        <header className="flex items-center gap-4 border-b border-border bg-muted/40 ">
          <Header setIsSideNavVisible={setIsSideNavVisible} />
        </header>
        <main className="flex-1 p-4 w-full max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
