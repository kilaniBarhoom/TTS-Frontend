import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { Bell, Moon, Sun } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
// import LanguageSelectForm from "../component/LanguageSelect";
import { Button } from "../ui/button";
import { HeaderProfileDrop } from "./header-prof-drop";
import { NotificationsPopoverDrawer } from "./notifications/popover-drawer";
import SideNavSheet from "./side-nav-sheet";
import Typography from "../ui/typography";

const Header = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full py-2 px-4 max-w-screen-2xl mx-auto">
      {user && <SideNavSheet />}
      {["/login", "/register"].includes(pathname) && (
        <Typography
          as={"h5"}
          element="h5"
          className="border-none cursor-pointer"
          onClick={() => navigate("/")}
        >
          TTS
        </Typography>
      )}
      <div className="flex items-center ltr:ml-auto rtl:mr-auto gap-2">
        {user && (
          <NotificationsPopoverDrawer>
            <Button
              variant="ghostOnNav"
              size="xs"
              className="ltr:ml-auto rtl:mr-auto"
            >
              <Bell size={16} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </NotificationsPopoverDrawer>
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
