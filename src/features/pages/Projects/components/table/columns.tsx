import { ProjectT } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Ban,
  Edit,
  ExternalLink,
  MoreVertical,
  UserRoundPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import AddMembersDialog from "./Add members dialog/add-members-dialog";
import ProjectSheet from "./project-sheet";

export const data: ProjectT[] = [
  {
    id: "m5gr84i9",
    name: "Project 1",
    description: "Project 1 description",
    projectStatus: "Pending",
    startDate: "DD/MM/YYYY",
    endDate: "DD/MM/YYYY",
    owner: {
      id: "1",
      name: "Owner 1",
    },
  },
  {
    id: "m5gr84j0",
    name: "Project 2",
    description: "Project 2 description",
    projectStatus: "Completed",
    startDate: "DD/MM/YYYY",
    endDate: "DD/MM/YYYY",
    owner: {
      id: "1",
      name: "Owner 1",
    },
  },
];

export const columns: ColumnDef<ProjectT>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: () => {
      return <div className="hidden">ID</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize hidden">{row.getValue("id")}</div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => {
      return <div className="hidden sm:block md:block">Description</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize hidden sm:block md:block">
        {row.getValue("description")}
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div
          className="items-center cursor-pointer gap-1 hidden sm:flex md:flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="hidden sm:block md:block">
          {row.getValue("startDate")}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "endDate",
    header: () => {
      return <div className="hidden sm:block md:block">End Date</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="hidden sm:block md:block">
          {row.getValue("endDate")}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "projectStatus",
    header: () => {
      return <div className="hidden sm:block md:block">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="bg-background hidden sm:block md:block"
        >
          {row.getValue("projectStatus")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [openMembersDialog, setOpenMembersDialog] =
        useState<boolean>(false);
      const [openProjectsSheet, setOpenProjectsSheet] =
        useState<boolean>(false);
      const [searchParams, setSearchParams] = useSearchParams({
        projectId: "",
      });
      const { t } = useTranslation();
      const setSearch = (value: string) => {
        setSearchParams(
          (prev) => {
            prev.delete("projectId");
            if (value) prev.set("projectId", value);
            return prev;
          },
          { replace: true }
        );
      };

      return (
        <DropdownMenu>
          <AddMembersDialog
            open={openMembersDialog}
            setOpen={setOpenMembersDialog}
          />
          <ProjectSheet
            open={openProjectsSheet}
            setOpen={setOpenProjectsSheet}
          />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2 items-center"
              onClick={() => {
                setOpenMembersDialog(true);
                setSearch(row.getValue("id"));
              }}
            >
              <UserRoundPlus size={20} />
              {t("Add Members")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 items-center"
              onClick={() => setOpenProjectsSheet(true)}
            >
              <ExternalLink size={20} /> {t("Open")}
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 items-center">
              <Edit size={20} /> {t("Edit")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive gap-2 items-center">
              <Ban size={20} />
              {t("Set To Cancelled")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
