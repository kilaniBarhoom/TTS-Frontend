import { Outlet } from "react-router-dom";
// import { HeaderProfileDrop } from "./header-prof-drop";
import SideNavSheet from "./side-nav-sheet";
import SideNav from "./side-nav";
import Header from "./header";

export default function Layout() {
  return (
    <div className="grid bg-background min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNav />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SideNavSheet />
          <div className="ltr:ml-auto rtl:mr-auto">
            <Header />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
