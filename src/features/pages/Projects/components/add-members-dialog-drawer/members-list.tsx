import { Button } from "@/components/ui/button";

import { useGetMembersByProjectId } from "../../api";

import { UserAvatar } from "@/components/component/user-avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { OwnerT } from "@/lib/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MembersList({ projectId }: { projectId: string }) {
  const { data: members, isLoading } = useGetMembersByProjectId(projectId);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const filteredMembers = members?.filter((member: OwnerT) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full border-border border rounded-md">
      <div className="border-b border-border">
        <div className="p-4">
          <Input
            className=""
            icon={<Search size={20} />}
            iconPosition={"left"}
            placeholder={t("Find Members...")}
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(event.target.value)
            }
          />
        </div>
      </div>

      <ScrollArea className="h-52">
        {isLoading ? (
          <div className="flex flex-col gap-1 w-full p-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : (
          filteredMembers?.map((member: OwnerT, index: number) => (
            <div
              key={member.id}
              className={`flex items-center justify-between py-2 px-4 ${
                index === filteredMembers.length - 1
                  ? ""
                  : "border-b border-border"
              }`}
            >
              <UserAvatar name={member.name} />
              <Button variant="link" size="sm">
                {t("Remove")}
              </Button>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
