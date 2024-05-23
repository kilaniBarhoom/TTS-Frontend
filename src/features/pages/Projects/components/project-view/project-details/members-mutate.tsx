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
import AddMembersDialog from "../../projects/table/Add members dialog/add-members-dialog";

const MembersMutate = () => {
  const { project } = useProject();
  const { data: members } = useGetMembersByProjectId(project?.id);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center">
      <AddMembersDialog
        projectId={project.id}
        open={openAddMemberDialog}
        setOpen={setOpenAddMemberDialog}
      />
      <Typography element="p" as={"smallText"} className="font-bold">
        {t("Members")}:
      </Typography>
      <div className="flex cursor-pointer">
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
                  <Avatar key={member.id} className="size-7 -mr-2">
                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                    <AvatarFallback>
                      {member.name.split("")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="relative mt-3 w-fit border border-border grid gap-4 h-fit p-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform  w-0 h-0 border-solid border-8 border-r-transparent border-l-transparent border-t-transparent border-b-border" />

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
        className="ml-1 text-neutral-500 cursor-pointer hover:text-foreground transition-all duration-200 ease-in-out"
        onClick={() => setOpenAddMemberDialog(true)}
      >
        + Add/Remove Members
      </Typography>
    </div>
  );
};

export default MembersMutate;
