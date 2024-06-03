import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const TicketPriorityBadge = ({
  priority,
  className,
  onAction,
  children,
}: {
  priority: string;
  className?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  return (
    <Badge
      variant="leftBordered"
      size="sm"
      className={cn(
        className,
        priority === "Low"
          ? "border-l-priority-low hover:bg-priority-low/30"
          : priority === "Medium"
          ? "border-l-priority-medium hover:bg-priority-medium/30"
          : priority === "High"
          ? "border-l-priority-high hover:bg-priority-high/30"
          : ""
      )}
      onClick={onAction}
    >
      {t(priority)}
      {children}
    </Badge>
  );
};

export default TicketPriorityBadge;
