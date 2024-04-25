import { Button } from "@/components/ui/button";

import { useGetMembersByProjectId } from "../../../api";

import { UserAvatar } from "@/components/component/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OwnerT } from "@/lib/types";

export default function MembersList({ projectId }: { projectId: string }) {
  const { data: members } = useGetMembersByProjectId({ projectId });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-56">
        <Button variant="outline">Members</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          {members &&
            members.map((member: OwnerT) => (
              <UserAvatar key={member.id} name={member.name} />
            ))}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
