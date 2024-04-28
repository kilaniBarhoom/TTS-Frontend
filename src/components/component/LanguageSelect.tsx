import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

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
      <SelectTrigger className="w-[8rem]">
        <SelectValue placeholder={t("English")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("English")}</SelectItem>
        <SelectItem value="ar">{t("Arabic")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
