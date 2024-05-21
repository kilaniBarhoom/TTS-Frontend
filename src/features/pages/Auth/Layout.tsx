import Header from "@/components/navbar/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useError } from "@/providers/error-provider";
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
    <div className="w-screen h-screen bg-background  flex flex-col justify-between">
      <header className="flex items-center gap-4 border-b border-border bg-muted/40">
        <Header />
      </header>
      <div className="flex flex-col items-center justify-center m-auto relative">
        <img
          src="/assets/globals/TTSLogo.png"
          className="w-28 absolute -top-14 left-0 right-0 m-auto"
          alt="12345678"
        />
        <Card className="w-full max-w-sm border border-border bg-background">
          <CardHeader className="py-4 mt-5">
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
