import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import LanguageSelectForm from "../component/LanguageSelect";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
import { HeaderProfileDrop } from "./header-prof-drop";
import { NotificationsPopover } from "./notifications/popover";
import SideNavSheet from "./side-nav-sheet";

const Header = ({
  setIsSideNavVisible,
}: {
  setIsSideNavVisible?: (value: boolean) => void;
}) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-3 items-center justify-between w-full">
      <div className="flex items-center py-2 w-1/6 px-4 gap-2">
        {user && (
          <>
            <SideNavSheet />
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setIsSideNavVisible && setIsSideNavVisible((prev) => !prev)
              }
            >
              <Menu size={20} />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </>
        )}
        <Typography as={"h3"} element="h3" className="border-none">
          TTS
        </Typography>
        {user && (
          <NotificationsPopover>
            <Button
              variant="ghost"
              size="icon"
              className="ltr:ml-auto rtl:mr-auto"
            >
              <Bell size={20} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </NotificationsPopover>
        )}
      </div>
      <div className="flex items-center gap-3 py-2 ltr:pr-4 rtl:pl-4">
        <Button
          variant="ghost"
          className="rounded-full p-2"
          size={"sm"}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
        <LanguageSelectForm />
        {user && <HeaderProfileDrop />}
      </div>
    </div>
  );
};

export default Header;
