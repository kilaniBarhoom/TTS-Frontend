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
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import TableWrapper from "../components/tickets/table/table-wrapper";
import { TicketProvider } from "../components/ticket-view/provider";
import AddTicketDialog from "../components/tickets/add-ticket-dialog";
import { Button } from "@/components/ui/button";
const Projects = () => {
  const { t } = useTranslation();
  const [openFilters, setOpenFilters] = useState(false);

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
      <Helmet>
        <title>Tickets | TTS</title>
      </Helmet>
      <Typography as="h2" element="h2">
        {t("Tickets")}
      </Typography>
      <div className="flex gap-2 w-full justify-between items-center my-5 flex-wrap md:flex-nowrap ">
        <Input
          placeholder={t("Search by ticket name...")}
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          icon={<Search size={20} />}
          iconPosition={"left"}
          className="h-fit w-full md:w-60"
        />
        <div className="flex gap-2">
          <Button className="h-fit gap-2" variant={"ghost"} size={"sm"}>
            <Filter size={15} />
            {t("Filter")}
          </Button>
          <Button className="h-fit gap-2" variant={"ghost"} size={"sm"}>
            <AlignJustify size={15} />
            {t("Group By")}
          </Button>
          <AddTicketDialog>
            <Button variant={"default"} className="h-fit gap-2" size={"sm"}>
              <Plus size={15} />
              {t("New")}
            </Button>
          </AddTicketDialog>
        </div>
      </div>
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="border-b-[1px] w-full justify-start rtl:flex-row-reverse border-border">
          <TabsTrigger value="table" className="gap-1 items-center flex">
            <Table size={20} /> {t("Table")}
          </TabsTrigger>
          <TabsTrigger value="kanban" className="gap-1 items-center flex">
            <Columns3 size={20} /> {t("Kanban")}
          </TabsTrigger>
        </TabsList>

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

export default Projects;
