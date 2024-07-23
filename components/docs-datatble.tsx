"use client";
import { StepBack, CircleCheckBig, StepForward } from "lucide-react";
import { Tags as TagsLucide } from "lucide-react";
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
import TagProps from "interfaces/tag-props";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tags: TagProps[];
  setChoosenTag?: Dispatch<SetStateAction<string[]>>;
  choosenTag?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tags,
  setChoosenTag,
  choosenTag,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [Tags, setTags] = React.useState<TagProps[]>(tags);
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
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="text-cyan-700 py-2 rounded-sm px-5 font-bold border-2 border-cyan-700 bg-muted"
            >
              Tags
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="p-4 w-80 min-h-full bg-primary-foreground">
              {/* Sidebar content here */}
              <div className="mb-3 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <Input
                    placeholder="Search tag"
                    onChange={(e) => {
                      setTags(tags.filter((el : TagProps) => el.name = e.target.value));
                    }}
                  />
                  <Button onClick={() => setChoosenTag([])} className="bg-cyan-500 text-white hover:bg-cyan-500">
                    Reset
                  </Button>
                </div>
                <hr />
              </div>
              {Tags.map((tag, index) => (
                <button
                  key={index}
                  // style item base checked or not
                  className={
                    choosenTag.includes(tag.name)
                      ? "bg-primary-foreground text-primary-background my-1 inline mr-2"
                      : "my-1 inline mr-2"
                  }
                  onClick={() =>
                    setChoosenTag((prev : string[]) =>
                      prev.includes(tag.name)
                        ? prev.filter((item : string) => item !== tag.name)
                        : [...prev, tag.name]
                    )
                  }
                >
                  <div className="flex justify-center items-center">
                    <p>{tag.name} ({tag.count})</p>
                    {choosenTag.includes(tag.name) && (
                      <CircleCheckBig className="w-4 h-4 ml-2" />
                    )}
                  </div>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {choosenTag.length > 0 && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <TagsLucide />
          {choosenTag.map((tag) => (
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
          ))}
        </div>
      )}
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
          className="rounded-full"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <StepBack />
        </Button>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: table.getPageCount() }, (_, i: number) => (
            <button
              key={i}
              onClick={() => {
                table.setPageIndex(i);
              }}
              className={
                table.getState().pagination.pageIndex === i
                  ? "border-cyan-500 text-cyan-500 px-3"
                  : "px-3 border-0"
              }
              // disabled={table.getState().pagination.pageIndex === i}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          className="rounded-full"
          disabled={!table.getCanNextPage()}
        >
          <StepForward />
        </Button>
      </div>
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div> */}
    </div>
  );
}

export default DataTable;
