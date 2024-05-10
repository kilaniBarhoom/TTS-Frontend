import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function ProjectFilters({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [searchParams, setSearchParams] = useSearchParams({
    Status: "",
  });

  const handleStatusChange = async (status: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("Status");
        if (status) prev.set("Status", status);
        return prev;
      },
      { replace: true }
    );
  };

  const { t } = useTranslation();

  return (
    <div className={cn("grid gap-2", className)}>
      {/* <FormField
          control={projectFiltersForm.control}
        name=""
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover> */}
      <Select
        onValueChange={(val) => {
          handleStatusChange(val);
        }}
      >
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">{t("Pending")}</SelectItem>
          <SelectItem value="Active">{t("Active")}</SelectItem>
          <SelectItem value="Completed">{t("Completed")}</SelectItem>
          <SelectItem value="Draft">{t("Draft")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
