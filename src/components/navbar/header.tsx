import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { ArrowRightFromLine, Menu, Moon, Sun } from "lucide-react";
import LanguageSelectForm from "../component/LanguageSelect";
import { Button } from "../ui/button";
import { HeaderProfileDrop } from "./header-prof-drop";
import SideNavSheet from "./side-nav-sheet";
import { useLocation } from "react-router-dom";
import Typography from "../ui/typography";
import { cn } from "@/lib/utils";

const Header = ({
  isSideNavVisible,
  setIsSideNavVisible,
}: {
  isSideNavVisible: boolean;
  setIsSideNavVisible?: (value: boolean) => void;
}) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between w-full py-1 ltr:pr-4 rtl:pl-4 max-w-screen-2xl mx-auto px-2">
      {user && (
        <>
          <SideNavSheet />
          <Button
            variant="secondary"
            size="xs"
            onClick={() => {
              setIsSideNavVisible &&
                setIsSideNavVisible((prev: boolean) => !prev);
            }}
            className={cn(
              "hidden md:block transition-all duration-300 ease-in-out transform",
              isSideNavVisible ? "rotate-180" : "rotate-0"
            )}
          >
            <ArrowRightFromLine size={16} />
          </Button>
        </>
      )}
      {["/", "/register"].includes(pathname) && (
        <Typography as={"h5"} element="h5" className="border-none">
          TTS
        </Typography>
      )}
      <div className="flex items-center ltr:ml-auto rtl:mr-auto gap-3">
        <Button
          variant="hover"
          size="xs"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
        <LanguageSelectForm />
        {user && <HeaderProfileDrop />}
      </div>
    </div>
  );
};

export default Header;
