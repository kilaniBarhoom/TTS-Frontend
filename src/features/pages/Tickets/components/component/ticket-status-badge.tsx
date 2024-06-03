import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const TicketStatusBadge = ({
  status,
  className,
  onAction,
  children,
}: {
  status: string;
  className?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  return (
    <Badge
      variant="outline"
      size="sm"
      className={cn(
        className,
        status === "InProgress"
          ? "border-status-active bg-status-active/40  hover:bg-status-active/30"
          : status === "Completed"
          ? "border-status-completed bg-status-completed/40 hover:bg-status-completed/30"
          : status === "Pending"
          ? "border-yellow-400 bg-status-pending/40 hover:bg-status-pending/30"
          : status === "Canceled"
          ? "border-status-canceled bg-status-canceled/40 hover:bg-status-canceled/30"
          : ""
      )}
      onClick={onAction}
    >
      {t(status)}
      {children}
    </Badge>
  );
};

export default TicketStatusBadge;
