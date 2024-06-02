import BreadcrumbComponent from "@/components/component/bread-crumb";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTicket } from "../../provider";
import WatchersMutate from "../mutation-components/watchers-mutate";
import { Skeleton } from "@/components/ui/skeleton";

const Header = ({
  setOpenDialog,
  isLoading,
}: {
  setOpenDialog: (value: boolean) => void;
  isLoading: boolean;
}) => {
  const { ticket } = useTicket();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <DialogHeader className="grid">
      <BreadcrumbComponent
        tree={[
          {
            title: ticket?.project.name,
            link: `/projects/${ticket?.project.id}`,
          },
        ]}
        currentPage={ticket?.name}
      />
      <div className="flex justify-between items-center">
        <DialogTitle>
          {isLoading ? (
            <Skeleton className="w-40 h-6" />
          ) : (
            <Button
              size="md"
              variant={"link"}
              className="p-0 w-fit"
              onClick={() => {
                setOpenDialog(false);
                navigate(`/tickets/${ticket?.id}`);
              }}
            >
              {`${t("Ticket: ")} ${ticket?.id.split(" ").splice(0, 5)}`}
            </Button>
          )}
        </DialogTitle>
        <WatchersMutate ticket={ticket}>
          <Button
            className={cn(
              "gap-1 px-2",
              ticket?.watchers?.length && "text-primary hover:text-primary"
            )}
            variant={"ghost"}
            size={"xs"}
          >
            <Eye size={20} /> {ticket?.watchers?.length || ""}
          </Button>
        </WatchersMutate>
      </div>
    </DialogHeader>
  );
};

export default Header;
