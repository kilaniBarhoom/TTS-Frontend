import BreadcrumbComponent from "@/components/component/bread-crumb";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { Columns3, Search, Table } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../../Projects/api/projects";
import { TicketProvider } from "../components/ticket-view/provider";
import TicketsActions from "../components/tickets/actions";
import TableWrapper from "../components/tickets/table/tickets-wrapper";
const Tickets = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams({
    TicketName: "",
  });

  const projectId = searchParams.get("projectId") || "";
  const { data: project } = useGetProjectByIdQuery(projectId);

  const search = searchParams.get("TicketName") || "";
  const setSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("TicketName");
        if (value) prev.set("TicketName", value);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className="flex flex-col h-full">
      {project && (
        <BreadcrumbComponent
          tree={[
            {
              title: `Project: ${project.name}`,
              link: `/projects/${project.id}`,
            },
          ]}
          currentPage={t("Tickets")}
        />
      )}
      <Helmet>
        <title>Tickets | TTS</title>
      </Helmet>
      <Typography as="h2" element="h2">
        {t("Tickets")}
      </Typography>
      <Tabs defaultValue="table" className="w-full">
        <div className="flex gap-2 w-full justify-between items-center my-5 flex-wrap md:flex-nowrap ">
          <div className="flex gap-2 items-center w-full">
            <TabsList className="justify-start rtl:flex-row-reverse hidden md:flex">
              <TabsTrigger value="table" className="gap-1 items-center flex">
                <Table size={15} /> {t("Table")}
              </TabsTrigger>
              <TabsTrigger value="kanban" className="gap-1 items-center flex">
                <Columns3 size={15} /> {t("Kanban")}
              </TabsTrigger>
            </TabsList>
            <Input
              placeholder={t("Search by ticket name...")}
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              icon={<Search size={15} />}
              iconPosition={"left"}
              className="h-fit p-2 text-xs w-full md:w-72"
            />
          </div>
          <TicketsActions />
        </div>

        <TabsContent value="table">
          <TicketProvider>
            <TableWrapper />
          </TicketProvider>
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

export default Tickets;
