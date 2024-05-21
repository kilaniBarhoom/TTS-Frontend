import { passwordValidChecker } from "@/lib/utils";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";
import Typography from "../ui/typography";

const PasswordChecker = ({ password }: { password: string }) => {
  const {
    isAtLeast8CharactersLong,
    hasNumber,
    hasUppercase,
    hasSpecialCharacter,
  } = passwordValidChecker(password);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <Typography
        as={"mutedText"}
        element={"span"}
        className="flex gap-1 items-center"
      >
        {isAtLeast8CharactersLong ? (
          <CircleCheckBig size={16} className="text-green-500" />
        ) : (
          <CircleX size={16} className="text-red-500" />
        )}
        {t("At least 8 characters long")}
      </Typography>
      <Typography
        as={"mutedText"}
        element={"span"}
        className="flex gap-1 items-center"
      >
        {hasUppercase ? (
          <CircleCheckBig size={16} className="text-green-500" />
        ) : (
          <CircleX size={16} className="text-red-500" />
        )}
        {t("At least 1 capital letter")}
      </Typography>
      <Typography
        as={"mutedText"}
        element={"span"}
        className="flex gap-1 items-center"
      >
        {hasSpecialCharacter ? (
          <CircleCheckBig size={16} className="text-green-500" />
        ) : (
          <CircleX size={16} className="text-red-500" />
        )}
        {t("At least 1 special character")}
      </Typography>
      <Typography
        as={"mutedText"}
        element={"span"}
        className="flex gap-1 items-center"
      >
        {hasNumber ? (
          <CircleCheckBig size={16} className="text-green-500" />
        ) : (
          <CircleX size={16} className="text-red-500" />
        )}
        {t("At least 1 number")}
      </Typography>
    </div>
  );
};

export default PasswordChecker;
