import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { useGetAllProjectsQuery } from "@/api/projects";
import { ProjectT } from "@/lib/types";
import { useSearchParams } from "react-router-dom";
import { columns } from "./columns";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { searchProjEndp } from "@/lib/constants";

export default function DataTableDemo() {
  const [openProject, setopenProject] = React.useState<boolean>(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("ProjectName") || "";
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "projects",
      {
        ProjectName: search,
      },
    ],
    queryFn: async () => {
      const { data: response } = await axios.get(searchProjEndp, {
        params: { search },
      });
      console.log(response.items);

      return response.items;
    },
  });

  const items: ProjectT[] = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      owner: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
      },
      name: "string",
      description: "string",
      startDate: "2024-04-20",
      endDate: "2024-04-20",
      projectStatus: "Active",
    },
  ];

  const table = useReactTable({
    data: projects || items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border dark:text-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={() => setopenProject(true)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* pagination */}
      </div>
    </div>
  );
}
