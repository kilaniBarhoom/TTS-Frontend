import { useAuth } from "@/providers/auth-provider";
import { Bell, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
import { CommandBox } from "./command-box";
import { NotificationsPopover } from "./notifications/popover";
import SideNavRender from "./side-nav-items-render";

export default function SideNav() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <div className="ltr:border-r rtl:border-l border-border dark:bg-black bg-neutral-100 flex flex-col w-full h-full">
      <div className="flex items-center px-2 py-2">
        {user && (
          <>
            <Typography as={"h5"} element="h5" className="border-none">
              TTS
            </Typography>
            <NotificationsPopover>
              <Button
                variant="ghost"
                size="xs"
                className="ltr:ml-auto rtl:mr-auto"
              >
                <Bell size={16} />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </NotificationsPopover>
          </>
        )}
      </div>
      <nav className="flex flex-col justify-start items-start text-md w-full gap-1 font-medium py-2 flex-1 overflow-y-auto">
        <div className="lg:flex-1 w-full">
          <CommandBox />
          <SideNavRender />
        </div>
        <div className="flex items-center border-t border-border py-2 w-full">
          <Typography
            as="smallText"
            element="p"
            onClick={() => navigate("/settings")}
            className={`flex w-full items-center gap-2 cursor-pointer border-l-4 border-transparent transition-all duration-300 ease-in-out py-2 px-2 text-muted-foreground hover:text-secondary-foreground hover:bg-background ${
              pathname.includes("/settings")
                ? "bg-background text-secondary-foreground border-l-primary"
                : ""
            }`}
          >
            <Settings className="size-5 mr-1" />
            {t("Settings")}
          </Typography>
        </div>
      </nav>
    </div>
  );
}
