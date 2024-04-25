import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SideNavItems } from "./nav-items";

const SideNavRender = () => {
  const currentPath = window.location.pathname;
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {SideNavItems.map((item) => (
        <a
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`flex items-center gap-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out px-1 py-2 text-muted-foreground hover:text-foreground hover:bg-muted ${
            currentPath === item.path ? "bg-muted text-primary" : ""
          }`}
        >
          {item.icon}
          {t(item.title)}
        </a>
      ))}
    </>
  );
};

export default SideNavRender;
