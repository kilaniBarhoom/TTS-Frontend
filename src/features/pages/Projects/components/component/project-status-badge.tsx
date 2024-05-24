import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ProjectStatusBadge = ({
  status,
  className,
  onAction,
}: {
  status: string;
  className?: string;
  onAction?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Badge
      variant="outline"
      size="sm"
      className={cn(
        className,
        status === "Active"
          ? "border-status-active bg-status-active/40  hover:bg-status-active/30"
          : status === "Completed"
          ? "border-status-completed bg-status-completed/40 hover:bg-status-completed/30"
          : status === "OnHold"
          ? "border-status-onhold bg-status-onhold/40 hover:bg-status-onhold/30"
          : status === "Canceled"
          ? "border-status-canceled bg-status-canceled/40 hover:bg-status-canceled/30"
          : status === "Pending"
          ? "border-status-pending bg-status-pending/40 hover:bg-status-pending/30"
          : status === "Delayed"
          ? "border-status-delayed bg-status-delayed/40 hover:bg-status-delayed/30"
          : status === "UnderReview"
          ? "border-status-underreview bg-status-underreview/40 hover:bg-status-underreview/30"
          : status === "Draft"
          ? "border-status-draft bg-status-draft/40 hover:bg-status-draft/30"
          : ""
      )}
      onClick={onAction}
    >
      {t(status)}
    </Badge>
  );
};

export default ProjectStatusBadge;
