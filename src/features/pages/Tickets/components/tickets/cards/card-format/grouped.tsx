import { TicketT } from "@/lib/types";
import { useState } from "react";
import {
  ticketPriorities,
  ticketStatuses,
} from "../../actions/filters-popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Cards from "./normal";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import TicketStatusBadge from "../../../component/ticket-status-badge";
import TicketPriorityBadge from "../../../component/ticket-priority-badge";

const GroupedCards = ({ tickets, by }: { tickets: TicketT[]; by: string }) => {
  return (
    <div className="grid gap-8">
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
        <div className="flex items-center gap-2">
          <CollapsibleTrigger className="" asChild>
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
