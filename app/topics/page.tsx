import { allPosts } from "contentlayer/generated";
import removeDuplicates from "helpers/removeDuplicates";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TopicPage() {
  const topics = removeDuplicates(
    allPosts.map((post) => {
      const ind = post._raw.flattenedPath.indexOf("/");
      return post._raw.flattenedPath.slice(0, ind);
    })
  );
  return (
    <div className="flex justify-center lg:px-9 px-3">
      <Table>
  <TableCaption>A list of your recent note.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">No.</TableHead>
      <TableHead></TableHead>
      <TableHead>Topic</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {topics.map((topic, index) => {
        return (
          <TableRow>
            <TableCell className="font-medium">{index+1}</TableCell>
          <TableCell>
          <Image
              src={`/${topic}/index.jpg`}
              alt={`image about ${topic}`}
              width="64"
              height="64"
            />
          </TableCell>
          <TableCell className="uppercase"><Link href={`/topics/${topic}`} key={index}>{topic}</Link></TableCell>
        </TableRow>
        );
      })}
    
  </TableBody>
</Table>
    </div>
  );
}
