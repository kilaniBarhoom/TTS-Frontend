import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { Bell, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
// import LanguageSelectForm from "../component/LanguageSelect";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
import { HeaderProfileDrop } from "./header-prof-drop";
import { NotificationsPopover } from "./notifications/popover";
import SideNavSheet from "./side-nav-sheet";

const Header = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between w-full py-2 ltr:pr-4 rtl:pl-4 max-w-screen-2xl mx-auto px-2">
      {user && <SideNavSheet />}
      {["/", "/register"].includes(pathname) && (
        <Typography as={"h5"} element="h5" className="border-none">
          TTS
        </Typography>
      )}
      <div className="flex items-center ltr:ml-auto rtl:mr-auto gap-2">
        {user && (
          <NotificationsPopover>
            <Button
              variant="ghostOnNav"
              size="xs"
              className="ltr:ml-auto rtl:mr-auto"
            >
              <Bell size={16} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </NotificationsPopover>
        )}
        <Button
          variant="ghostOnNav"
          size="xs"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
        {/* <LanguageSelectForm /> */}
        {user && <HeaderProfileDrop />}
      </div>
    </div>
  );
};

export default Header;
