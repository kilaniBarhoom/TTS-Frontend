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

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import AddMembersDialog from "./add-members-dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectSheet from "./project-sheet";
import { useSearchParams } from "react-router-dom";

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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("startDate")}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      return <div>{row.getValue("endDate")}</div>;
    },
  },
  {
    accessorKey: "projectStatus",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="bg-black">
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
