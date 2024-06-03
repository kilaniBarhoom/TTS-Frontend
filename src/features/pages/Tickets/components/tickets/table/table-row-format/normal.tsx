import { TicketT } from "@/lib/types";
import { TableCell, TableRow } from "@/components/ui/table";

import { useNavigate } from "react-router-dom";
import TicketDialogDrawer from "../../../ticket-view/ticket-details/ticket-dialog-drawer";
import TicketPriorityBadge from "../../../component/ticket-priority-badge";
import TicketStatusBadge from "../../../component/ticket-status-badge";
import { UserAvatar } from "@/components/component/user-avatar";
import AddTicketDialogDrawer from "../../add-ticket-dialog-drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TableRows = ({
  tickets,
  level,
}: {
  tickets: TicketT[];
  level?: number;
}) => {
  const navigate = useNavigate();
  return (
    <>
      {tickets.map((ticket: TicketT) => (
        <TableRow key={ticket.id}>
          <TableCell
            style={{ paddingLeft: `${level && level * 40}px` }}
            className="font-medium hover:underline cursor-pointer min-w-fit max-w-6 overflow-x-hidden"
          >
            <TicketDialogDrawer ticketId={ticket.id}>
              <div>{ticket.name}</div>
            </TicketDialogDrawer>
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
      ))}
      <TableRow className="border border-border">
        <TableCell colSpan={6} className="cursor-pointer">
          <AddTicketDialogDrawer>
            <Button
              className="gap-2 p-0 w-full justify-start"
              variant={"hover"}
            >
              <Plus size={20} />
              New
            </Button>
          </AddTicketDialogDrawer>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRows;
