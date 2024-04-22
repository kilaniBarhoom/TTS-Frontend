import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { Columns3, Table } from "lucide-react";
import { useTranslation } from "react-i18next";
import DataTableDemo from "./components/table/data-table";
import { useSearchParams } from "react-router-dom";
import { useGetAllProjectsQuery } from "@/api/projects";

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

  const { data: projects } = useGetAllProjectsQuery();
  return (
    <div className="flex flex-col">
      <Typography as="h2" element="h2">
        {t("Projects")}
      </Typography>
      <div className="flex items-center py-4">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="border-b-2 w-full rounded-none justify-between">
            <div className="flex gap-4">
              <TabsTrigger value="table" className="gap-1 items-center flex">
                <Table size={20} /> {t("Table")}
              </TabsTrigger>
              <TabsTrigger value="board" className="gap-1 items-center flex">
                <Columns3 size={20} /> {t("Board")}
              </TabsTrigger>
            </div>
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              className="max-w-sm mb-2"
            />
          </TabsList>
          <TabsContent value="table">
            <DataTableDemo projects={projects} />
          </TabsContent>
          <TabsContent value="board">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Projects;
