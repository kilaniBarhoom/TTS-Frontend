import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { useTranslation } from "react-i18next";
import { UserAvatar } from "../../component/user-avatar";
import { Button } from "@/components/ui/button";

export function WorkSpaceDropDown() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer w-fit" asChild>
        <Button
          variant={"outline"}
          size="sm"
          className="w-full justify-between p-2"
        >
          <UserAvatar name={user?.name || ""} avatarSize="size-5" />
          <ChevronsUpDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52 border-border">
        <DropdownMenuLabel>{t("Choose Workspace")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Workspace 1</DropdownMenuItem>
          <DropdownMenuItem>Workspace 2</DropdownMenuItem>
          <DropdownMenuItem>Workspace 3</DropdownMenuItem>
          <DropdownMenuItem>Workspace 4</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
