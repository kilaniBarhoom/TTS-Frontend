import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ToolCard from "./tool-card";

const Tools = () => {
  return (
    <div className="grid gap-5">
      <Button className="w-fit" size={"sm"}>
        <Plus size={20} /> New Tool
      </Button>
      <div className="flex gap-5">
        <ToolCard />
      </div>
    </div>
  );
};

export default Tools;
