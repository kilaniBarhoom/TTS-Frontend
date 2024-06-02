import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { Columns3, Search, Table } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ProjectsActions from "../components/projects/actions";
import ProjectsWrapper from "../components/projects/projects-wrapper";
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
      <Tabs defaultValue="table" className="w-full">
        <div className="flex gap-2 w-full justify-between items-center my-5 flex-wrap md:flex-nowrap ">
          <div className="flex gap-2 items-center w-full">
            <TabsList className="justify-start rtl:flex-row-reverse hidden md:flex">
              <TabsTrigger value="table">
                <Table size={15} /> {t("Table")}
              </TabsTrigger>
              <TabsTrigger value="kanban">
                <Columns3 size={15} /> {t("Kanban")}
              </TabsTrigger>
            </TabsList>
            <Input
              placeholder={t("Search by project name...")}
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              icon={<Search size={15} />}
              iconPosition={"left"}
              className="h-fit p-2 text-xs w-full md:w-72"
            />
          </div>
          <ProjectsActions />
        </div>

        <TabsContent value="table">
          <ProjectsWrapper />
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
