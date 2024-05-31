import { UserAvatar } from "@/components/component/user-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketT } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import TicketPriorityBadge from "../../component/ticket-priority-badge";
import TicketStatusBadge from "../../component/ticket-status-badge";
import TicketDialog from "../../ticket-view/ticket-details/ticket-dialog";
import TicketsSkeleton from "./skeleton";

const TicketsTable = ({
  tickets,
  isLoading,
}: {
  tickets: TicketT[];
  isLoading: boolean;
}) => {
  const dummyArray = Array.from({ length: 5 });
  const navigate = useNavigate();

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
                <TicketDialog ticketId={ticket.id}>
                  <div>{ticket.name}</div>
                </TicketDialog>
              </TableCell>
              <TableCell
                className="font-medium hover:underline cursor-pointer min-w-fit"
                onClick={() =>
                  navigate(`/projects/${ticket.project?.id?.toString()}`)
                }
              >
                {ticket.project.name}
              </TableCell>

              <TableCell>
                <TicketPriorityBadge priority={ticket.ticketPriority} />
              </TableCell>
              <TableCell>
                <TicketStatusBadge status={ticket.ticketStatus} />
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
