import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import Typography from "../ui/typography";

export default function LanguageSelectForm() {
  const { t, i18n } = useTranslation();

  const logData = (data: any) => {
    i18n.changeLanguage(data);
  };
  return (
    <Select
      onValueChange={(e) => {
        logData(e);
      }}
      defaultValue={"en"}
    >
      <SelectTrigger className="w-[5rem] py-1 px-2 h-fit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <Typography element="p" as="extraSmallText">
            {t("English")}
          </Typography>
        </SelectItem>
        <SelectItem value="ar">
          <Typography element="p" as="extraSmallText">
            {t("Arabic")}
          </Typography>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
