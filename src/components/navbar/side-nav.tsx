import SideNavRender from "./side-nav-items-render";

export default function SideNav() {
  return (
    <div className="ltr:border-r rtl:border-l border-border bg-muted/40 h-full py-2">
      <nav className="grid items-start text-md w-full gap-2 font-medium lg:px-4">
        <SideNavRender />
      </nav>
    </div>
  );
}
