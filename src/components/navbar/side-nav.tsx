import Typography from "../ui/typography";
import SideNavRender from "./side-nav-items-render";

export default function SideNav() {
  return (
    <div className="hidden ltr:border-r rtl:border-l border-border bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-border px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Typography as={"h3"} element="h3" className="border-none">
              TTS
            </Typography>
          </a>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-md font-medium lg:px-4">
            <SideNavRender />
          </nav>
        </div>
      </div>
    </div>
  );
}
