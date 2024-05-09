import {
  Languages,
  LogOut,
  Moon,
  PersonStanding,
  Settings,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitialsOfFullName } from "@/lib/utils";
import { useAuth, useLogout } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../component/user-avatar";

export function HeaderProfileDrop() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { user } = useAuth();
  const initials = getInitialsOfFullName(user?.name);
  const logoutUser = async () => {
    await logout();
    navigate("/", { replace: true });
  };
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer size-5" asChild>
        <Avatar>
          <AvatarImage className="" src={undefined} alt={user?.name} />
          <AvatarFallback className="">{initials.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mr-5">
        <DropdownMenuLabel>{t("My account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserAvatar
              name={user?.name || ""}
              description={user?.email || ""}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PersonStanding className="mr-2 h-4 w-4" />
            <span>{t("Account")}</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("Settings")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>{t("Dark Mode")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("light");
                  }}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <span>{t("Light Mode")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                >
                  <Languages className="mr-2 h-4 w-4" />
                  <span>{t("AR")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  <Languages className="mr-2 h-4 w-4" />
                  <span>{t("EN")}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logoutUser();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("Log out")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
