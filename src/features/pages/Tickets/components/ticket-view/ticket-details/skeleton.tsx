import { Loader2 } from "lucide-react";

const TicketSkeleton = () => {
  return (
    <div className="grid gap-2 min-h-40">
      <div className="w-full h-full flex justify-center items-center">
        <Loader2 className="text-primary size-10 animate-spin" />
      </div>
    </div>
  );
};

export default TicketSkeleton;
