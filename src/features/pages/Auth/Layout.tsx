// import Header from "@/components/navbar/header/header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
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
    <div className="w-screen h-screen bg-background grid place-items-center">
      <div className="flex flex-col items-center justify-center size-fit gap-0">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/assets/globals/TTSLogo.png" className="w-16" alt="TTS" />
          <Typography element="h3" as={"h1"}>
            TTS
          </Typography>
        </div>
        <Card className="w-full max-w-sm border border-border bg-background">
          <CardHeader className="bg-transparent">
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
