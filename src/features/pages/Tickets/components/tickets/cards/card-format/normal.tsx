import { TicketT } from "@/lib/types";
import TicketCard from "../ticket-card";

const Cards = ({ tickets }: { tickets: TicketT[] }) => {
  return tickets.map((ticket) => (
    <TicketCard key={ticket.id} ticket={ticket} />
  ));
};

export default Cards;
