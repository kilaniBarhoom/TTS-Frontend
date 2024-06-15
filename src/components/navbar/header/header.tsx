import { useAuth } from "@/providers/auth-provider";
import { Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
// import LanguageSelectForm from "../component/LanguageSelect";
import { Button } from "../../ui/button";
import Typography from "../../ui/typography";
import { NotificationsPopoverDrawer } from "../notifications/popover-drawer";
import SideNavSheet from "../side-nav/side-nav-sheet";
import { HeaderProfileDrop } from "./header-prof-drop";

const Header = () => {
  const { user } = useAuth();
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
        {user && <HeaderProfileDrop />}
      </div>
    </div>
  );
};

export default Header;
