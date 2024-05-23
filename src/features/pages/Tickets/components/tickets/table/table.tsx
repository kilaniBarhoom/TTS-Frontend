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
        ) : tickets.length ? (
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
                <Badge variant="default" size="sm">
                  {ticket.ticketPriority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" size="sm">
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
