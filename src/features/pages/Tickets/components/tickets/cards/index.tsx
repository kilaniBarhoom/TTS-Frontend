import { TicketT } from "@/lib/types";
import TicketsCardsSkeleton from "./skeleton";
import TicketCard from "./ticket-card";

type TicketsCardsProps = {
  tickets: TicketT[];
  isLoading: boolean;
};

const TicketsCards = ({ tickets, isLoading }: TicketsCardsProps) => {
  return (
    <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <TicketsCardsSkeleton />
      ) : (
        tickets &&
        tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
      )}
    </div>
  );
};

export default TicketsCards;
