import { UserAvatar } from "@/components/component/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Typography from "@/components/ui/typography";
import { OwnerT, TicketT } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTicketWatchMutation } from "../../../../api/tickets";

const WatchersMutate = ({
  ticket,
  children,
}: {
  ticket: TicketT;
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { mutateAsync } = useTicketWatchMutation();
  const [hoveredWatcherId, setHoveredWatcherId] = useState<string | null>(null);

  const handleWatchTicket = async () => {
    await mutateAsync(ticket.id);
  };

  const watchingTicket = ticket?.watchers?.find(
    (watcher) => watcher.id === user?.id
  ) ? (
    <DropdownMenuItem>
      <Typography
        as={"p"}
        element="p"
        className="flex items-center gap-2 text-primary"
      >
        <EyeOff size={20} />
        {t("Stop Watching")}
      </Typography>
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem onClick={handleWatchTicket}>
      <Typography
        as={"p"}
        element="p"
        className="flex items-center gap-2 text-primary"
      >
        <Eye size={20} />
        {t("Start Watching")}
      </Typography>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 border-border">
        {watchingTicket}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-muted-foreground">
          Watching This Ticket
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {ticket?.watchers?.length ? (
            ticket?.watchers.map((watcher: OwnerT) => (
              <DropdownMenuItem
                key={watcher.id}
                className="flex items-center justify-between"
                onMouseEnter={() => setHoveredWatcherId(watcher.id)}
                onMouseLeave={() => setHoveredWatcherId(null)}
              >
                <UserAvatar name={watcher.name} />
                {hoveredWatcherId === watcher.id && (
                  <Button size={"xs"} variant={"hover"}>
                    <X size={16} />
                  </Button>
                )}
              </DropdownMenuItem>
            ))
          ) : (
            <Typography as={"p"} element="p" className="text-center my-4">
              {t("No watchers")}
            </Typography>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WatchersMutate;
