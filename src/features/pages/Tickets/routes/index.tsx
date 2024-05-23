import { Route, Routes } from "react-router-dom";
import TicketView from "./TicketView";
import Tickets from "./Tickets";

const TicketsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
      <Route path=":ticketId" element={<TicketView />} />
    </Routes>
  );
};

export default TicketsRoutes;
