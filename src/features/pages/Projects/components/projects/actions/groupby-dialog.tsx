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
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function GroupByDropDown({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams({
    Status: "",
    StartDate: "",
    EndDate: "",
  });

  const groupBy = searchParams.get("groupBy");

  React.useEffect(() => {
    console.log(groupBy);
  }, [groupBy]);

  const setGroupBy = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("groupBy");
        if (value) prev.set("groupBy", value);
        return prev;
      },
      { replace: true }
    );
  };

  const clearGroupBy = () => {
    setSearchParams(
      (prev) => {
        prev.delete("groupBy");
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
          <DropdownMenuLabel className="text-muted-foreground">
            {t("Group By")}
          </DropdownMenuLabel>
          {groupBy && (
            <Button variant={"link"} size={"xs"} onClick={clearGroupBy}>
              Clear
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setGroupBy("status")}>
            <Typography
              as={"p"}
              element="p"
              className="flex items-center justify-between w-full"
            >
              {t("Status")}
              {groupBy && groupBy === "status" && <Check size={20} />}
            </Typography>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
