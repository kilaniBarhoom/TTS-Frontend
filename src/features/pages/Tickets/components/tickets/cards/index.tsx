import { TicketT } from "@/lib/types";
import { useSearchParams } from "react-router-dom";
import GroupedCards from "./card-format/grouped";
import Cards from "./card-format/normal";
import TicketsCardsSkeleton from "./skeleton";

type TicketsCardsProps = {
  tickets: TicketT[];
  isLoading: boolean;
};

const ticketsCards = ({ tickets, isLoading }: TicketsCardsProps) => {
  const [searchParams] = useSearchParams();
  const groupBy = searchParams.get("groupBy");
  return (
    <>
      {isLoading ? (
        <TicketsCardsSkeleton />
      ) : tickets && groupBy ? (
        <GroupedCards tickets={tickets} by={groupBy} />
      ) : (
        <Cards tickets={tickets} />
      )}
    </>
  );
};

export default ticketsCards;
