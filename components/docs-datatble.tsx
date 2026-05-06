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

function DataTable<TData, TValue>({
  columns,
  data,
  tags,
  setChoosenTag,
  choosenTag = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filteredTags, setFilteredTags] = React.useState<TagProps[]>(tags);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Cập nhật filteredTags khi tags prop thay đổi
  React.useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

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
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search titles..."
            value={(table.getColumn("title")?.getFilterValue() as string) || ""}
            onChange={(e) => {
              table.getColumn("title")?.setFilterValue(e.target.value);
            }}
            className="w-full rounded-full bg-muted/50 border-muted focus-visible:ring-cyan-500 pl-4"
          />
        </div>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="cursor-pointer text-cyan-600 py-2 rounded-full px-6 font-semibold border border-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors flex items-center gap-2"
            >
              <TagsLucide className="w-4 h-4" />
              Tags
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="p-4 w-80 min-h-full bg-primary-foreground">
              {/* Sidebar content here */}
              <div className="mb-3 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <Input
                    placeholder="Search tag"
                    onChange={(e) => {
                      const searchValue = e.target.value.toLowerCase();
                      setFilteredTags(
                        tags.filter((el: TagProps) =>
                          el.name.toLowerCase().includes(searchValue)
                        )
                      );
                    }}
                  />
                  <Button onClick={() => setChoosenTag?.([])} className="bg-cyan-500 text-white hover:bg-cyan-500">
                    Reset
                  </Button>
                </div>
                <hr />
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredTags.map((tag) => {
                  const isSelected = choosenTag.includes(tag.name);
                  return (
                    <button
                      key={tag.name}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors flex items-center gap-1 ${isSelected
                        ? "bg-cyan-500 border-cyan-500 text-white"
                        : "bg-background border-border hover:border-cyan-500 text-foreground"
                        }`}
                      onClick={() =>
                        setChoosenTag?.((prev: string[]) =>
                          prev.includes(tag.name)
                            ? prev.filter((item: string) => item !== tag.name)
                            : [...prev, tag.name]
                        )
                      }
                    >
                      {tag.name} <span className="opacity-70 text-xs">({tag.count})</span>
                      {isSelected && <CircleCheckBig className="w-3.5 h-3.5 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {choosenTag.length > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground mr-1">Filtered by:</span>
          {choosenTag.map((tag) => (
            <div key={tag} className="flex items-center gap-1">
              <Button
                variant="default"
                size="sm"
                className="rounded-full h-7 px-3 text-xs bg-cyan-100 hover:bg-cyan-200 text-cyan-800 border border-cyan-200"
                onClick={() => setChoosenTag?.((prev) => prev.filter((item) => item !== tag))}
              >
                {tag} <span className="ml-1 opacity-60 hover:opacity-100">×</span>
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setChoosenTag?.([])}
          >
            Clear all
          </Button>
        </div>
      )}
      {/* table */}
      <div className="">
        {/* <Table>
          <TableBody > */}
        <div className="flex flex-col">
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
