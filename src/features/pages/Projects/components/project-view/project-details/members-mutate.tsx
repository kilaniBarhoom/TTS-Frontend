import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import { OwnerT } from "@/lib/types";
import { useProject } from "../provider";
import { useState } from "react";
import AddMembersDialog from "../../projects/table/Add members dialog/add-members-dialog";
import { useGetMembersByProjectId } from "../../../api";
import { useTranslation } from "react-i18next";

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
          members?.map((member: { id: string; name: string }) => (
            <Avatar key={member.id} className="size-7 -mr-2">
              <AvatarImage alt="Avatar" src="/avatars/01.png" />
              <AvatarFallback>
                {member.name.split("")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))
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
