import { TicketProvider } from "../components/ticket-view/provider";
import TicketDetails from "../components/ticket-view/ticket-details";

const TicketView = () => {
  return (
    <TicketProvider>
      <TicketDetails />
    </TicketProvider>
  );
};

export default TicketView;
