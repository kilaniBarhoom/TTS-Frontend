import { Button } from "@/components/ui/button";
import { useLogout } from "@/providers/auth-provider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const logout = useLogout();
  const logoutUser = async () => {
    await logout();
    navigate("/", { replace: true });
  };
  return (
    <div className="flex gap-2 mx-auto">
      <Button
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >
        En
      </Button>
      <Button
        onClick={() => {
          i18n.changeLanguage("ar");
        }}
      >
        Ar
      </Button>
      <Button
        onClick={() => {
          logoutUser();
        }}
      >
        {t("Logout")}
      </Button>
    </div>
  );
};

export default Projects;
