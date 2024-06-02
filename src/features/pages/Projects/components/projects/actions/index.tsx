import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AlignJustify, Filter, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddProjectDialogDrawer from "../add-project-dialog-drawer";
import FiltersPopover from "./filters-popover";
import GroupByDropDown from "./groupby-dropdown";

const ProjectsActions = () => {
  const { t } = useTranslation();
  const actions = (
    <>
      <FiltersPopover>
        <Button
          className="h-full gap-2 md:p-2 py-3"
          size={"xs"}
          variant="outline"
        >
          <Filter size={15} />
          {t("Filter")}
        </Button>
      </FiltersPopover>
      <GroupByDropDown>
        <Button
          className="h-full gap-2 md:p-2 py-3"
          size={"xs"}
          variant="outline"
        >
          <AlignJustify size={15} />
          {t("Group By")}
        </Button>
      </GroupByDropDown>
      <AddProjectDialogDrawer>
        <Button
          variant={"default"}
          size={"xs"}
          className="h-full w-full md:w-fit gap-2 md:p-2 py-3"
        >
          <Plus size={15} />
          {t("New Project")}
        </Button>
      </AddProjectDialogDrawer>
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

export default ProjectsActions;
