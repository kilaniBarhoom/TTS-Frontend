import { Ban, ExternalLink, MoreVertical, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddMembersDialogDrawer from "./add-members-dialog-drawer";

const ActionsDropDown = ({ projectId }: { projectId: string }) => {
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [openMembersDrawer, setOpenMembersDrawer] = useState(false);

  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <AddMembersDialogDrawer
        openDialog={openMembersDialog}
        openDrawer={openMembersDrawer}
        setOpenDrawer={setOpenMembersDrawer}
        setOpenDialog={setOpenMembersDialog}
        projectId={projectId}
      />
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
        <DropdownMenuItem
          className="gap-2 items-center flex md:hidden"
          onClick={() => {
            setOpenMembersDrawer(true);
          }}
        >
          <UserRoundPlus size={20} />
          {t("Add Members")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 items-center hidden md:flex"
          onClick={() => {
            setOpenMembersDialog(true);
          }}
        >
          <UserRoundPlus size={20} />
          {t("Add Members")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 items-center">
          <ExternalLink size={20} /> {t("Open")}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive gap-2 items-center">
          <Ban size={20} />
          {t("Set To Cancelled")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropDown;
