"use client";
import { CircleCheckBig } from "lucide-react";
import { Tags } from "lucide-react";
import {
  ColumnDef,
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
import { Dispatch } from "react";
import { SetStateAction } from "react";
import React from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tags: string[];
  setChoosenTag?: Dispatch<SetStateAction<string[]>>;
  choosenTag?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tags,
  setChoosenTag,
  choosenTag
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
    <div>
      {/* input */}
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="Search titles"
          value={(table.getColumn("title")?.getFilterValue() as string) || ""}
          onChange={(e) => {
            table.getColumn("title")?.setFilterValue(e.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Tags</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {
          tags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              // style item base checked or not
              className={choosenTag.includes(tag) ? "bg-primary-foreground text-primary-background my-1" : "my-1"}
              onCheckedChange={() => setChoosenTag((prev) => prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag])}
            >
              <DropdownMenuLabel>{tag}</DropdownMenuLabel>
              {choosenTag.includes(tag) && <CircleCheckBig className="w-4 h-4 ml-auto mr-2" />}
            </DropdownMenuCheckboxItem>
          ))
        }
        <DropdownMenuCheckboxItem
          onCheckedChange={() => setChoosenTag([])}
        >
          <DropdownMenuLabel>All</DropdownMenuLabel>
          {choosenTag.length === 0 && <CircleCheckBig className="w-4 h-4 ml-auto mr-2" />}
          <DropdownMenuSeparator />
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
        {
          choosenTag.length > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <Tags />
              {
                choosenTag.map((tag) => (
                  <div key={tag} className="flex items-center gap-1">
                    {/* <p className="text-sm"></p> */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      // onClick={() => setChoosenTag((prev) => prev.filter((item) => item !== tag))}
                    >
                      #{tag}
                    </Button>
                  </div>
                ))
              }
            </div>
          )
        }
      {/* table */}
      <div className="">
        {/* <Table>
          <TableBody > */}
        <div>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <div key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>
              <p className="py-2 px-4">Not found</p>
            </div>
          )}
        </div>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
    </div>
  );
}

export default DataTable;
