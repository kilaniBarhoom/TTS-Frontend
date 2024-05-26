import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
// import { CalendarIcon } from "lucide-react";
// import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import ProjectStatusBadge from "../../component/project-status-badge";
import { Calendar, MoveRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Calendar as DatePicker } from "@/components/ui/calendar";

export const projectStatuses = [
  "Active",
  "Completed",
  "OnHold",
  "Canceled",
  "Pending",
  "Delayed",
  "UnderReview",
  "Draft",
];

export default function FiltersPopover({
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

  const Status = searchParams.get("Status");
  const StartDate = searchParams.get("StartDate");
  const EndDate = searchParams.get("EndDate");

  const setStartDate = (value?: Date) => {
    const startDate = value?.toDateString();
    console.log(value);
    console.log(startDate);

    setSearchParams(
      (prev) => {
        prev.delete("StartDate");
        if (startDate) prev.set("StartDate", startDate);
        return prev;
      },
      { replace: true }
    );
  };

  const setEndDate = (value?: Date) => {
    const endDate = value?.toDateString();
    setSearchParams(
      (prev) => {
        prev.delete("EndDate");
        if (endDate) prev.set("EndDate", endDate);
        return prev;
      },
      { replace: true }
    );
  };

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

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <Typography as="h3" element="h3">
          Status
        </Typography>
        <div className="grid gap-2">
          {projectStatuses.map((status) => (
            <Button
              key={status}
              variant="hover"
              className="justify-start p-0 h-fit w-fit"
              // onClick={() => handleStatusChange(status)}
            >
              <ProjectStatusBadge status={status} />
            </Button>
          ))}
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Calendar size={15} />
                  {StartDate
                    ? format(parseISO(StartDate), "EEE, dd/MM/yyyy")
                    : t("Start Date")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={2024}
                  toYear={2025}
                  selected={parseISO(StartDate)}
                  onSelect={(date) => setStartDate(date)}
                />
              </PopoverContent>
            </Popover>
            <MoveRight className="text-muted-foreground" size={15} />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Calendar size={15} />
                  {StartDate
                    ? format(parseISO(EndDate), "EEE, dd/MM/yyyy")
                    : t("Start Date")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={2024}
                  toYear={2025}
                  selected={parseISO(EndDate)}
                  onSelect={(date) => setEndDate(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// }) {
//   const [searchParams, setSearchParams] = useSearchParams({
//     Status: "",
//   });

//   const handleStatusChange = async (status: string) => {
//     setSearchParams(
//       (prev) => {
//         prev.delete("Status");
//         if (status) prev.set("Status", status);
//         return prev;
//       },
//       { replace: true }
//     );
//   };

//   const { t } = useTranslation();

//   return <div className={cn("grid gap-2", className)}></div>;
// }
