import Header from "@/components/navbar/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useError } from "@/providers/error-provider";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { error } = useError();
  const { t } = useTranslation();
  return (
    <div className="w-screen h-screen bg-background  flex flex-col justify-between">
      <header className="flex items-center gap-4 border-b border-border bg-muted/40">
        <Header />
      </header>
      <div className="flex items-center justify-center m-auto shadow-md">
        <Card className="w-full max-w-sm border-none bg-muted">
          {error && (
            <div className="p-5">
              <Alert variant="destructive" className="bg-red-300">
                {error?.description && (
                  <AlertDescription className="text-red-900 font-semibold text-base">
                    {t(error.description)}
                  </AlertDescription>
                )}
              </Alert>
            </div>
          )}
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default Layout;
