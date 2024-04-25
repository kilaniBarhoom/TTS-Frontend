// import { Outlet } from "react-router-dom";
// import Header from "@/components/navbar/header";
// const Layout = () => {
//   return (
//     <div className="flex flex-col h-screen bg-background">
//       <Header />
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;

import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/providers/theme-provider";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import Typography from "../ui/typography";
import { HeaderProfileDrop } from "./header-prof-drop";
import { SideNavItems } from "./nav-items";

export default function Layout() {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  return (
    <div className="grid bg-background min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden ltr:border-r rtl:border-l border-border bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-border px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Typography as={"h3"} element="h3" className="border-none">
                TTS
              </Typography>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="ltr:ml-auto rtl:mr-auto"
            >
              <Bell size={20} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-md font-medium lg:px-4">
              {SideNavItems.map((item) => (
                <a
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out px-1 py-2 text-muted-foreground hover:text-foreground hover:bg-muted ${
                    currentPath === item.path ? "bg-muted text-foreground" : ""
                  }`}
                >
                  {item.icon}
                  {t(item.title)}
                </a>
              ))}
              {/* <div className="flex flex-col gap-2">
                <Button
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  Dark
                </Button>
                <Button
                  onClick={() => {
                    setTheme("light");
                  }}
                >
                  Light
                </Button>
                <Button
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                >
                  AR
                </Button>
                <Button
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  EN
                </Button>
              </div> */}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu size={20} />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Typography as={"h3"} element="h3" className="border-none">
                    TTS
                  </Typography>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-md bg-muted px-1 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ltr:ml-auto rtl:mr-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ltr:ml-auto rtl:mr-auto">
            <HeaderProfileDrop />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
