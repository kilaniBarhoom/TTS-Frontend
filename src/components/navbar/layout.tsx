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
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/providers/theme-provider";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Typography from "../ui/typography";
import { HeaderProfileDrop } from "./header-prof-drop";

export default function Layout() {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const pageDirection = i18n.dir();
  return (
    <div className="grid bg-background min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div
        className={`hidden ${
          pageDirection === "ltr" ? "border-r" : "border-l"
        } bg-muted/40 md:block`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Typography as={"h3"} element="h3" className="border-none">
                TTS
              </Typography>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className={`${pageDirection === "ltr" ? "ml-auto" : "mr-auto"}`}
            >
              <Bell size={20} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <Home size={20} />
                Projects
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart size={20} />
                Orders
                <Badge
                  className={`${
                    pageDirection === "ltr" ? "ml-auto" : "mr-auto"
                  } flex h-6 w-6 shrink-0 items-center justify-center rounded-full`}
                >
                  6
                </Badge>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-2 py-3 text-primary transition-all hover:text-primary"
              >
                <Package size={20} />
                Projects
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <Users size={20} />
                Customers
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart size={20} />
                Analytics
              </a>
              <div className="flex flex-col gap-2">
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
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-1 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge
                    className={`${
                      pageDirection === "ltr" ? "ml-auto" : "mr-auto"
                    } flex h-6 w-6 shrink-0 items-center justify-center rounded-full`}
                  >
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-1 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* <form> */}
            <Input
              type="text"
              placeholder={`${t("Search products")}`}
              icon={<Search size={20} />}
              iconPosition={`${pageDirection === "ltr" ? "left" : "right"}`}
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
            {/* </form> */}
          </div>
          <HeaderProfileDrop />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
