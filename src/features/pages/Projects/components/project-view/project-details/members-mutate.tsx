import { UserAvatar } from "@/components/component/user-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Typography from "@/components/ui/typography";
import { OwnerT } from "@/lib/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetMembersByProjectId } from "../../../api";
import { useProject } from "../../../provider";
import AddMembersDialogDrawer from "../../add-members-dialog-drawer";

const MembersMutate = () => {
  const { project } = useProject();
  const { data: members } = useGetMembersByProjectId(project?.id);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [openAddMemberDrawer, setOpenAddMemberDrawer] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex  items-center">
      <AddMembersDialogDrawer
        projectId={project.id}
        openDialog={openAddMemberDialog}
        openDrawer={openAddMemberDrawer}
        setOpenDialog={setOpenAddMemberDialog}
        setOpenDrawer={setOpenAddMemberDrawer}
      />
      <Typography element="p" as={"smallText"} className="font-bold">
        {t("Members")}:
      </Typography>
      <div className="flex ml-2">
        {members?.length >= 5 ? (
          <>
            {members?.slice(0, 4).map((member: OwnerT) => (
              <Avatar key={member.id} className="size-7 -mr-2 border ">
                <AvatarImage alt="Avatar" src="/avatars/01.png" />
                <AvatarFallback>{member.name.split("")[0]}</AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="size-7 -mr-2">
              <AvatarFallback>+{members?.length - 4}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <HoverCard openDelay={1} closeDelay={1}>
            <HoverCardTrigger asChild>
              <div className="flex ">
                {members?.map((member: { id: string; name: string }) => (
                  <Avatar key={member.id} className="size-6 -mr-2">
                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                    <AvatarFallback>
                      {member.name.split("")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="relative w-fit border border-border grid gap-4 h-fit p-2"
            >
              <Typography element="p" as={"smallText"}>
                Members:
              </Typography>
              <div className="flex flex-col gap-1">
                {members?.map((member: { id: string; name: string }) => (
                  <UserAvatar
                    key={member.id}
                    name={member.name}
                    avatarSize="size-5"
                    nameSize="text-xs"
                    className="hover:bg-muted/40 cursor-pointer py-1 px-2 rounded-md transition-all duration-200 ease-in-out"
                  />
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <Typography
        element="p"
        as={"extraSmallText"}
        className="ml-4 text-muted-foreground hidden md:inline-flex cursor-pointer hover:text-foreground transition-all duration-200 ease-in-out"
        onClick={() => setOpenAddMemberDialog(true)}
      >
        + Add/Remove Members
      </Typography>
      <Typography
        element="p"
        as={"extraSmallText"}
        className="ml-4 text-muted-foreground inline-flex md:hidden cursor-pointer hover:text-foreground transition-all duration-200 ease-in-out"
        onClick={() => setOpenAddMemberDrawer(true)}
      >
        + Add/Remove Members
      </Typography>
    </div>
  );
};

export default MembersMutate;
