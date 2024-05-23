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

  const changeLanguage = (data: any) => {
    i18n.changeLanguage(data);
  };
  return (
    <Select
      onValueChange={(e) => {
        changeLanguage(e);
      }}
      defaultValue={"en"}
    >
      <SelectTrigger size="sm">
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
