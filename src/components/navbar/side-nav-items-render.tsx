import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNavItems } from "./nav-items";
import Typography from "../ui/typography";

const SideNavRender = () => {
  const location = useLocation();
  const { pathname } = location;

  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {SideNavItems.map((item) => (
        <Typography
          as="smallText"
          element="p"
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`flex w-full items-center gap-2 cursor-pointer border-l-4 border-transparent transition-all duration-300 ease-in-out py-2 px-2 text-muted-foreground hover:text-secondary-foreground hover:bg-muted ${
            pathname.includes(item.path)
              ? "bg-muted text-secondary-foreground border-l-primary"
              : ""
          }`}
        >
          {item.icon}
          {t(item.title)}
        </Typography>
      ))}
    </>
  );
};

export default SideNavRender;
