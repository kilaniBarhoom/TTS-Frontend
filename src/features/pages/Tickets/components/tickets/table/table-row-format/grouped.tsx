import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";
import { TicketT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  ticketStatuses,
  ticketPriorities,
} from "../../actions/filters-popover";
import TableRows from "./normal";
import TicketStatusBadge from "../../../component/ticket-status-badge";
import TicketPriorityBadge from "../../../component/ticket-priority-badge";

const TableGroupedRows = ({
  tickets,
  by,
}: {
  tickets: TicketT[];
  by: string;
}) => {
  return (
    <>
      {by === "status" &&
        ticketStatuses.map((element, index) => {
          const groupedTickets = tickets.filter(
            (ticket) => ticket.ticketStatus === element
          );
          return (
            <GroupedRow
              key={index}
              title={element}
              tickets={groupedTickets}
              by={by}
            />
          );
        })}
      {by === "priority" &&
        ticketPriorities.map((element, index) => {
          const groupedTickets = tickets.filter(
            (ticket) => ticket.ticketPriority === element
          );
          return (
            <GroupedRow
              key={index}
              title={element}
              tickets={groupedTickets}
              by={by}
            />
          );
        })}
    </>
  );
};

export default TableGroupedRows;

const GroupedRow = ({
  title,
  tickets,
  by,
}: {
  title: string;
  tickets: TicketT[];
  by: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <>
        <TableRow>
          <TableCell colSpan={6} className="py-5">
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant={"ghostOnNav"} size="xs">
                  <ChevronRight
                    className={cn(
                      "transition-all ease-in-out duration-200",
                      open ? "rotate-90" : "rotate-0"
                    )}
                    size={15}
                  />
                </Button>
              </CollapsibleTrigger>
              {by === "status" ? (
                <TicketStatusBadge status={title} />
              ) : (
                <TicketPriorityBadge priority={title} />
              )}
            </div>
          </TableCell>
        </TableRow>
        <CollapsibleContent asChild>
          <>
            {tickets && tickets.length ? (
              <TableRows tickets={tickets} level={2} />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg font-bold py-5"
                >
                  No tickets with status: {title} found
                </TableCell>
              </TableRow>
            )}
          </>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
};
