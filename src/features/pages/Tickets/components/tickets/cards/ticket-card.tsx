import { TicketT } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import TicketPriorityBadge from "../../component/ticket-priority-badge";
import TicketStatusBadge from "../../component/ticket-status-badge";
import { Clock } from "lucide-react";
import { UserAvatar } from "@/components/component/user-avatar";
import TicketDialogDrawer from "../../ticket-view/ticket-details/ticket-dialog-drawer";

const TicketCard = ({ ticket }: { ticket: TicketT }) => {
  return (
    <Card>
      <CardHeader className="m-0 p-0 bg-muted">
        <div className="flex justify-between items-center flex-wrap p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <TicketStatusBadge status={ticket.ticketStatus} />
            <TicketPriorityBadge priority={ticket.ticketPriority} />
          </div>
          <Clock size={20} className="text-muted-foreground" />
        </div>
      </CardHeader>
      <Separator className="w-full border-border" />
      <CardContent className="grid w-full p-4 bg-background">
        <div className="grid gap-4">
          <TicketDialogDrawer ticketId={ticket.id}>
            <Typography
              element="h3"
              as={"h3"}
              className="font-semibold cursor-pointer hover:underline"
            >
              {ticket.name}
            </Typography>
          </TicketDialogDrawer>
          <div
            className="text-muted-foreground leading-5 list-disc"
            dangerouslySetInnerHTML={{ __html: ticket.description }}
          />
          <div className="grid gap-2">
            <div className="flex gap-2 items-center">
              <Typography
                element="p"
                as={"p"}
                className="text-sm text-muted-foreground"
              >
                Assigned To:
              </Typography>
              <Badge variant={"outline"}>
                <UserAvatar
                  className="flex-1"
                  avatarSize="size-5"
                  name={ticket.assignee.name}
                />
              </Badge>
            </div>
            <div className="flex gap-2 items-center">
              <Typography
                element="p"
                as={"p"}
                className="text-sm text-muted-foreground"
              >
                Reporter:
              </Typography>
              <Badge variant={"outline"}>
                <UserAvatar
                  className="flex-1"
                  avatarSize="size-5"
                  name={ticket.reporter.name}
                />
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
