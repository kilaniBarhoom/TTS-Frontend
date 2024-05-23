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
import { Columns3, Filter, Plus, Table } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ProjectFilters from "../components/projects/filters";
import AddProjectDialog from "../components/projects/add-project-dialog";
import TableWrapper from "../components/projects/table/table-wrapper";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
const Projects = () => {
  const { t } = useTranslation();
  const [openFilters, setOpenFilters] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    ProjectName: "",
  });
  useEffect(() => {
    // console.log(searchParams.has("Status"), searchParams.has("ProjectName"));

    setOpenFilters(
      searchParams.has("Status") || searchParams.has("ProjectName")
    );
  }, [searchParams]);

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
      <Helmet>
        <title>Projects | TTS</title>
      </Helmet>
      <Typography as="h2" element="h2">
        {t("Projects")}
      </Typography>
      <Collapsible open={openFilters} onOpenChange={setOpenFilters}>
        <>
          <div className="flex gap-2 w-full justify-between items-center my-2 flex-wrap sm:flex-wrap lg:flex-nowrap ">
            <Input
              placeholder={t("Search by project name...")}
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              className="h-fit"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setOpenFilters((p) => !p)}
                className="h-fit gap-2"
                variant={"secondary"}
              >
                <Filter size={20} />
                {t("Filter")}
              </Button>
              <AddProjectDialog>
                <Button variant={"default"} className="h-fit gap-2">
                  <Plus size={20} />
                  {t("New")}
                </Button>
              </AddProjectDialog>
            </div>
          </div>
          <Separator className="border-border w-full mb-2" />
          <div>
            <CollapsibleContent className="flex gap-2 flex-wrap">
              <ProjectFilters />
            </CollapsibleContent>
          </div>
        </>
      </Collapsible>
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="border-b-[1px] w-full justify-start rtl:flex-row-reverse border-border">
          <TabsTrigger value="table">
            <Table size={20} /> {t("Table")}
          </TabsTrigger>
          <TabsTrigger value="board">
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
