import { UserAvatar } from "@/components/component/user-avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import TicketDialog from "../../ticket-view/ticket-dialog";
import TicketsSkeleton from "./skeleton";

const TicketsTable = ({
  tickets,
  isLoading,
}: {
  tickets: any;
  isLoading: boolean;
}) => {
  const dummyArray = Array.from({ length: 5 });
  const navigate = useNavigate();

  const [_, setSearchParams] = useSearchParams({
    selectedTicket: "",
  });

  const setSelectedTicket = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("selectedTicket");
        if (value) prev.set("selectedTicket", value);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-52">Name</TableHead>
          <TableHead className="min-w-52">Project</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Reporter</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          dummyArray.map((_, index) => <TicketsSkeleton key={index} />)
        ) : tickets && tickets.length ? (
          tickets.map((ticket: TicketT) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium hover:underline cursor-pointer min-w-fit">
                <TicketDialog>
                  <div
                    onClick={() => {
                      setSelectedTicket(ticket.id);
                    }}
                  >
                    {ticket.name}
                  </div>
                </TicketDialog>
              </TableCell>
              <TableCell
                className="font-medium hover:underline cursor-pointer min-w-fit"
                onClick={() =>
                  navigate(`/projects/${ticket.project?.id?.toString()}`, {
                    replace: true,
                  })
                }
              >
                {ticket.project.name}
              </TableCell>

              <TableCell>
                <Badge
                  variant="leftBordered"
                  size="sm"
                  className={cn(
                    ticket.ticketPriority === "Low"
                      ? "border-l-priority-low text-primary-foreground hover:bg-priority-low/30"
                      : ticket.ticketPriority === "Medium"
                      ? "border-l-priority-medium text-secondary-foreground hover:bg-priority-medium/30"
                      : ticket.ticketPriority === "High"
                      ? "border-l-priority-high text-destructive-foreground hover:bg-priority-high/30"
                      : ""
                  )}
                >
                  {ticket.ticketPriority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  size="sm"
                  className={cn(
                    ticket.ticketStatus === "InProgress"
                      ? "border-status-active bg-status-active/40 text-status-active-foreground hover:bg-status-active/30"
                      : ticket.ticketStatus === "Pending"
                      ? "border-status-pending bg-status-pending/40 text-status-pending-foreground hover:bg-status-pending/30"
                      : ticket.ticketStatus === "Completed"
                      ? "border-status-completed bg-status-completed/40 text-status-completed-foreground hover:bg-status-completed/30"
                      : ticket.ticketStatus === "Canceled"
                      ? "border-status-canceled bg-status-canceled/40 text-status-canceled-foreground hover:bg-status-canceled/30"
                      : ""
                  )}
                >
                  {ticket.ticketStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <UserAvatar name={ticket.assignee.name} avatarSize="size-6" />
              </TableCell>
              <TableCell>
                <UserAvatar name={ticket.reporter.name} avatarSize="size-6" />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg fond-bold py-5"
            >
              No tickets found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TicketsTable;
