import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNavItems } from "./nav-items";

const SideNavRender = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {SideNavItems.map((item) => (
        <a
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`flex items-center gap-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out px-4 py-3  text-muted-foreground hover:text-primary hover:bg-muted ${
            pathname.includes(item.path) ? "bg-muted text-primary" : ""
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
