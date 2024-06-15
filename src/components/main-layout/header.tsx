import { useAuth } from "@/providers/auth-provider";
// import { useTheme } from "@/providers/theme-provider";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HeaderProfileDrop } from "../navbar/header/header-prof-drop";
import { Button } from "../ui/button";
import Typography from "../ui/typography";

const Header = () => {
  // const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between px-4 py-2 rounded-md">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/assets/globals/logov2.png" alt="no" className="size-11" />
        <Typography
          as={"h4"}
          element="h4"
          className="border-none cursor-pointer"
          onClick={() => navigate("/")}
        >
          TTS
        </Typography>
      </div>
      <div className="flex items-center gap-3">
        <Button
          size="xs"
          variant={"ghostOnNav"}
          // onClick={() => {
          //   navigate("https://github.com/kilanBarhoom/TTS-Frontend");
          // }}
        >
          <a
            target="_blank"
            href="https://github.com/kilaniBarhoom/TTS-Frontend"
          >
            <Github size={16} />
          </a>
        </Button>
        {/* <Button
          size="xs"
          variant={"ghostOnNav"}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </Button> */}
        {user ? (
          <HeaderProfileDrop />
        ) : (
          <>
            <Button
              size="sm"
              variant={"linkHover"}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button size="sm" onClick={() => navigate("/register")}>
              Register For Free
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
