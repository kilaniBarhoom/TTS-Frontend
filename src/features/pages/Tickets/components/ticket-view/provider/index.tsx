// ticket and isLoading context provder component
import { TicketT } from "@/lib/types";
import { createContext, useContext } from "react";
import { useGetTicketByIdQuery } from "../../../api";

const TicketProviderContext = createContext<any>(null);

export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: ticket, isLoading } = useGetTicketByIdQuery();

  const value: {
    ticket?: TicketT;
    isLoading: boolean;
  } = {
    ticket,
    isLoading,
  };

  return (
    <TicketProviderContext.Provider value={value}>
      {children}
    </TicketProviderContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketProviderContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
