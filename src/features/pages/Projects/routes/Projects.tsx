import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import {
  AlignJustify,
  Columns3,
  Filter,
  Plus,
  Search,
  Table,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import FiltersPopover from "../components/projects/actions/filters-popover";
import AddProjectDialog from "../components/projects/add-project-dialog";
import TableWrapper from "../components/projects/table/table-wrapper";
import GroupByDropDown from "../components/projects/actions/groupby-dialog";
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
    <div className="flex flex-col h-full">
      <Helmet>
        <title>Projects | TTS</title>
      </Helmet>
      <Typography as="h2" element="h2">
        {t("Projects")}
      </Typography>
      <div className="flex gap-2 justify-between items-center flex-wrap md:flex-nowrap my-5">
        <Input
          placeholder={t("Search by project name...")}
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          icon={<Search size={20} />}
          iconPosition={"left"}
          className="h-fit w-full md:w-60"
        />
        <div className="flex gap-2">
          <FiltersPopover>
            <Button className="h-full gap-2" size={"sm"} variant="outline">
              <Filter size={15} />
              {t("Filter")}
            </Button>
          </FiltersPopover>
          <GroupByDropDown>
            <Button className="h-full gap-2" size={"sm"} variant="outline">
              <AlignJustify size={15} />
              {t("Group By")}
            </Button>
          </GroupByDropDown>
          <AddProjectDialog>
            <Button variant={"default"} size={"sm"} className="h-full gap-2">
              <Plus size={15} />
              {t("New")}
            </Button>
          </AddProjectDialog>
        </div>
      </div>
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="border-b-[1px] w-full justify-start rtl:flex-row-reverse border-border">
          <TabsTrigger value="table">
            <Table size={20} /> {t("Table")}
          </TabsTrigger>
          <TabsTrigger value="kanban">
            <Columns3 size={20} /> {t("Kanban")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <TableWrapper />
        </TabsContent>
        <TabsContent value="kanban">
          <Typography element="h4" as={"h4"}>
            {t("Comming soon.")}
          </Typography>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
