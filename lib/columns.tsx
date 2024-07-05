"use client";
import { compareDesc, format, parseISO } from "date-fns";
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
import { Badge } from "components/ui/badge";
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

export const Docs: ColumnDef<Docs>[] = [
  {
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>
              <Link
                href={row.original.url}
                legacyBehavior
              >
                <p className="hover:underline">
                  {row.original.title}
                </p>
              </Link>
            </CardTitle>
            <CardDescription>
              <time
                dateTime={row.original.date}
                className="block mb-2 text-xs text-gray-600"
              >
                {format(parseISO(row.original.date), "LLLL d, yyyy")}
              </time>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              {row.original?.tags?.map((tag, idx) => (
                <button key={idx}>{tag}</button>
              ))}
            </div>
            <CardFooter></CardFooter>
          </CardContent>
        </Card>
      );
    },
  },
];
