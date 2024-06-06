import { TicketT } from "@/lib/types";
import TicketCard from "../ticket-card";

const Cards = ({ tickets }: { tickets: TicketT[] }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Cards;
