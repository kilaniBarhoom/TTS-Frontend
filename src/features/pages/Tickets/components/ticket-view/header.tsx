import BreadcrumbComponent from "@/components/component/bread-crumb";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, X } from "lucide-react";
import { useTicket } from "./provider";
import { useTranslation } from "react-i18next";

const Header = ({ handleCloseDialog }: { handleCloseDialog: () => void }) => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  return (
    <DialogHeader className="flex flex-row items-center justify-between">
      <DialogTitle className="grid gap-1">
        <BreadcrumbComponent
          tree={[
            {
              title: ticket?.project.name,
              link: `/projects/${ticket?.project.id}`,
            },
          ]}
          currentPage={ticket?.name}
        />
        {`${t("Ticket: ")} ${ticket?.id.split(" ").splice(0, 5)}`}
      </DialogTitle>
      <div className="flex gap-2 items-center">
        <Button className="gap-1 px-2" variant={"ghost"} size={"xs"}>
          <Eye size={20} /> 1
        </Button>
        <Button variant={"ghost"} size={"xs"} onClick={handleCloseDialog}>
          <X size={20} />
        </Button>
      </div>
    </DialogHeader>
  );
};

export default Header;
