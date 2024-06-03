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
        <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TicketsCardsSkeleton />
        </div>
      ) : tickets && groupBy ? (
        <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GroupedCards tickets={tickets} by={groupBy} />
        </div>
      ) : (
        <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Cards tickets={tickets} />
        </div>
      )}
    </>
  );
};

export default ticketsCards;
