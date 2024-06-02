import { Button } from "@/components/ui/button";
import { AlignJustify, Filter, Plus, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddTicketDialogDrawer from "../add-ticket-dialog-drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TicketsActions = () => {
  const { t } = useTranslation();

  const actions = (
    <>
      <Button
        className="h-full gap-2 md:p-2 py-3"
        size={"xs"}
        variant="outline"
      >
        <Filter size={15} />
        {t("Filter")}
      </Button>
      <Button
        className="h-full gap-2 md:p-2 py-3"
        size={"xs"}
        variant="outline"
      >
        <AlignJustify size={15} />
        {t("Group By")}
      </Button>
      <Button
        className="h-full gap-2 md:p-2 py-3"
        size={"xs"}
        variant="outline"
      >
        <User size={15} />
        {t("Assigned To")}
      </Button>
      <AddTicketDialogDrawer>
        <Button
          variant={"default"}
          className="h-full w-full md:w-fit gap-2 md:p-2 py-3"
          size={"xs"}
        >
          <Plus size={15} />
          {t("New Ticket")}
        </Button>
      </AddTicketDialogDrawer>
    </>
  );
  return (
    <>
      <div className="hidden md:flex gap-2">{actions}</div>
      <div className="flex md:hidden w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-primary rounded-md p-2">
              Actions
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">{actions}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default TicketsActions;