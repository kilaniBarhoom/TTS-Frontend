import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import ProjectStatusBadge from "../../component/project-status-badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ActionsColumn } from "./actons-dropdown";

const TableGroutRow = () => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <>
        <TableRow>
          <TableCell colSpan={5}>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant={"ghostOnNav"} size="xs">
                  <ChevronRight
                    className={cn(
                      "transition-all ease-in-out duration-200",
                      open ? "rotate-90" : "rotate-0"
                    )}
                    size={15}
                  />
                </Button>
              </CollapsibleTrigger>
              <ProjectStatusBadge status="Active" />
            </div>
          </TableCell>
        </TableRow>
        <CollapsibleContent asChild>
          <>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium hover:underline cursor-pointer max-w-6">
                    <div className="truncate">name {index}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    start date {index}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    end date {index}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <ProjectStatusBadge status="Active" />
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <ActionsColumn projectId={"123"} />
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
};

export default TableGroutRow;
