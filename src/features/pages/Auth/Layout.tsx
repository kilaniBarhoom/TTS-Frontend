import Header from "@/components/navbar/header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const cardTitle = pathname === "/register" ? t("Register") : t("Login");
  const cardDescription =
    pathname === "/register"
      ? t("Enter your email below to register for an account")
      : t("Enter your email below to login to your account");
  return (
    <div className="w-screen h-screen bg-background  flex flex-col">
      <header className="flex items-center gap-4 border-b border-border bg-muted/40">
        <Header />
      </header>
      <div className="flex flex-col items-center justify-center m-auto">
        <Card className="w-full max-w-sm border border-border bg-background">
          <div className=" relative">
            {" "}
            <img
              src="/assets/globals/TTSLogo.png"
              className="w-24 absolute -top-10 left-1/2 -translate-x-1/2"
              alt="TTS"
            />
          </div>

          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              {cardTitle}
            </CardTitle>
            <CardDescription>{cardDescription}.</CardDescription>
          </CardHeader>
          <div>
            <Outlet />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Layout;
