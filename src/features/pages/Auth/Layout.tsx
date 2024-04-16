import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useError } from "@/providers/error-provider";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { error } = useError();
  const { t } = useTranslation();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        {error && (
          <div className="p-5">
            <Alert variant="destructive" className="bg-red-400">
              {error.title && error?.description && (
                <AlertDescription className="text-white">
                  {t(error.title)} {t(error.description)}
                </AlertDescription>
              )}
            </Alert>
          </div>
        )}
        <Outlet />
      </Card>
    </div>
  );
};

export default Layout;
