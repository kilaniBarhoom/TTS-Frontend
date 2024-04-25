import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { ChevronDown, Columns3, Table } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { DateRangeFilter } from "./components/filters/date-range-picker";
import MutationDialog from "./components/mutation dialog/add-update-dialog";
import TableWrapper from "./components/table/table-wrapper";

const Projects = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams({
    ProjectName: "",
  });

  const search = searchParams.get("ProjectName") || "";
  const setSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("ProjectName");
        if (value) prev.set("ProjectName", value);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      <Typography as="h2" element="h2">
        {t("Projects")}
      </Typography>
      <Collapsible>
        <>
          <div className="flex gap-2 w-full justify-between items-center my-2 flex-wrap sm:flex-wrap lg:flex-nowrap">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
            <div className="flex gap-2">
              <CollapsibleTrigger className="max-w-[300px] w-full bg-secondary text-primary flex flex-row items-center justify-center h-9 rounded-md gap-2">
                Advanced filtering <ChevronDown size={20} />
              </CollapsibleTrigger>
              <MutationDialog>
                <Button variant={"default"} size={"sm"} className="px-8">
                  New
                </Button>
              </MutationDialog>
            </div>
          </div>
          <div>
            <CollapsibleContent className="flex gap-2 flex-wrap">
              <DateRangeFilter />
              <Select>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">{t("Pending")}</SelectItem>
                  <SelectItem value="Active">{t("Active")}</SelectItem>
                  <SelectItem value="Completed">{t("Completed")}</SelectItem>
                  <SelectItem value="Draft">{t("Draft")}</SelectItem>
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </div>
        </>
      </Collapsible>
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="border-b-[1px] w-full justify-start border-border">
          <TabsTrigger value="table" className="gap-1 items-center flex">
            <Table size={20} /> {t("Table")}
          </TabsTrigger>
          <TabsTrigger value="board" className="gap-1 items-center flex">
            <Columns3 size={20} /> {t("Board")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <TableWrapper />
        </TabsContent>
        <TabsContent value="board">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
