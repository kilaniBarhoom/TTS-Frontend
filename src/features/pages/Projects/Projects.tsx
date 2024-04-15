import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { i18n } = useTranslation();
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
    </div>
  );
};

export default Projects;
