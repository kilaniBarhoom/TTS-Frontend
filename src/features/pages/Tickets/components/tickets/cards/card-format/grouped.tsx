import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Typography from "@/components/ui/typography";
import { TicketT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import TicketPriorityBadge from "../../../component/ticket-priority-badge";
import TicketStatusBadge from "../../../component/ticket-status-badge";
import {
  ticketPriorities,
  ticketStatuses,
} from "../../actions/filters-popover";
import Cards from "./normal";

const GroupedCards = ({ tickets, by }: { tickets: TicketT[]; by: string }) => {
  return (
    <div className="grid gap-8 w-full">
      {by === "status" &&
        ticketStatuses.map((element, index) => {
          const groupedTickets = tickets.filter(
            (ticket) => ticket.ticketStatus === element
          );
          return (
            <GroupedCard
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
            <GroupedCard
              key={index}
              title={element}
              tickets={groupedTickets}
              by={by}
            />
          );
        })}
    </div>
  );
};

export default GroupedCards;

const GroupedCard = ({
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
        <div className="flex items-center gap-2 w-full">
          <CollapsibleTrigger asChild>
            <Button variant={"ghostOnNav"} className="w-full" size="xs">
              {by === "status" ? (
                <TicketStatusBadge
                  className="w-full py-4 flex justify-center items-center gap-2"
                  status={title}
                >
                  <ChevronDown
                    className={cn(
                      "transition-all ease-in-out duration-200",
                      open ? "-rotate-180" : "rotate-0"
                    )}
                    size={15}
                  />
                </TicketStatusBadge>
              ) : (
                <TicketPriorityBadge
                  className="w-full py-4 flex justify-center items-center gap-2"
                  priority={title}
                >
                  <ChevronDown
                    className={cn(
                      "transition-all ease-in-out duration-200",
                      open ? "-rotate-180" : "rotate-0"
                    )}
                    size={15}
                  />
                </TicketPriorityBadge>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent asChild>
          <>
            {tickets && tickets.length ? (
              <Cards tickets={tickets} />
            ) : (
              <Typography element="p" as={"largeText"} className="mx-auto my-4">
                No tickets with {by}: {title} found
              </Typography>
            )}
          </>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
};
