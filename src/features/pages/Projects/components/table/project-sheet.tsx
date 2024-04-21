// import { useGetProjectByIdQuery } from "@/api/projects";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { ChevronsLeft } from "lucide-react";
import { useEffect } from "react";

export default function ProjectSheet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  //   const project = useGetProjectByIdQuery();
  //   useEffect(() => {
  //     console.log(project.then((res) => res.data));
  //   }, []);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <div>
            <Button size="icon" variant={"ghost"}>
              <ChevronsLeft size={20} />
            </Button>
          </div>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
