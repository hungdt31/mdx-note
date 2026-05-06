"use client";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Docs = {
  title: string;
  date: string;
  tags: string[];
  body: any;
  _id: string;
  _raw: any;
  type: string;
  url: string;
};

import { CalendarDays } from "lucide-react";

export const Docs: ColumnDef<Docs>[] = [
  {
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <Card className="mb-6 shadow-md hover:shadow-md transition-all duration-300 border-muted/60 overflow-hidden group">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl md:text-2xl text-cyan-700 dark:text-cyan-500 group-hover:text-cyan-600 transition-colors">
              <Link
                href={row.original.url}
                legacyBehavior
              >
                <a className="font-semibold">
                  {row.original.title}
                </a>
              </Link>
            </CardTitle>
            <CardDescription>
              <time
                dateTime={row.original.date}
                className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                {format(parseISO(row.original.date), "LLLL d, yyyy")}
              </time>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap mt-1">
              {row.original?.tags?.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border">
                  {tag}
                </span>
              ))}
            </div>
            <CardFooter className="p-0"></CardFooter>
          </CardContent>
        </Card>
      );
    },
  },
];
