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
import AddMembersDialog from "./Add members dialog/add-members-dialog";

const ActionsDropDown = ({ projectId }: { projectId: string }) => {
  const [openMembersDialog, setOpenMembersDialog] = useState<boolean>(false);

  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <AddMembersDialog
        open={openMembersDialog}
        setOpen={setOpenMembersDialog}
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
          className="gap-2 items-center"
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
