import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { useSearchParams } from "react-router-dom";

import Typography from "@/components/ui/typography";
import { Check, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { OwnerT } from "@/lib/types";

type AssignedToDropDownProps = {
  members: OwnerT[];
  isLoading: boolean;
  children: React.ReactNode;
};

export default function AssignedToDropDown({
  members,
  isLoading,
  children,
}: AssignedToDropDownProps) {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams({
    assignee: "",
  });

  const assignee = searchParams.get("assignee");

  const setassignee = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("assignee");
        if (value) prev.set("assignee", value);
        return prev;
      },
      { replace: true }
    );
  };

  const clearassignee = () => {
    setSearchParams(
      (prev) => {
        prev.delete("assignee");
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className=" flex items-center justify-between">
          <DropdownMenuLabel className="text-muted-foreground w-full">
            {t("Assigned To")}
          </DropdownMenuLabel>
          {assignee && (
            <Button variant={"link"} size={"xs"} onClick={clearassignee}>
              Clear
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          <DropdownMenuGroup>
            {members.map((member, index) => (
              <div key={member.id}>
                <DropdownMenuItem onClick={() => setassignee(member.id)}>
                  <Typography
                    as={"p"}
                    element="p"
                    className="flex items-center justify-between w-full"
                  >
                    {member.name}
                    {assignee && assignee === member.id && <Check size={20} />}
                  </Typography>
                </DropdownMenuItem>
                {index !== members.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
