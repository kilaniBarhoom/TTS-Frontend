import Typography from "@/components/ui/typography";
import { useProject } from "../provider";
import { useTranslation } from "react-i18next";

const DescriptionMutate = () => {
  const { project } = useProject();
  const { t } = useTranslation();
  return (
    <div className="grid gap-2">
      <Typography element="p" as="smallText" className="font-bold">
        {t("Description")}:
      </Typography>
      {/* <TiptapEditor discription={project.discription} /> */}
      <Typography
        element="p"
        as={"smallText"}
        dangerouslySetInnerHTML={{ __html: project.description }}
        className="text-neutral-500 w-2/4 leading-5 list-disc"
      ></Typography>
    </div>
  );
};

export default DescriptionMutate;
