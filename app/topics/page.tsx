import { allPosts } from "contentlayer/generated";
import removeDuplicates from "helpers/removeDuplicates";
import Link from "next/link";
import Image from "next/image";

export default function TopicPage() {
  const topics = removeDuplicates(
    allPosts.map((post) => {
      const ind = post._raw.flattenedPath.indexOf("/");
      return post._raw.flattenedPath.slice(0, ind);
    })
  );
  return (
    <div className="flex flex-wrap gap-5 justify-center pt-7">
      {topics.map((topic, index) => {
        return (
          <Link href={`/topics/${topic}`} key={index} className="flex items-center shadow-sm">
            <div className="border-primary border-2 h-[100%] rounded-l-lg border-r-0">
            <Image
              src={`/${topic}/index.jpg`}
              alt={`image about ${topic}`}
              width="64"
              height="64"
              className="h-[100%] m-0 rounded-l-lg"
            />
            </div>
            <div className="border-2 h-[100%] rounded-r-lg border-primary border-l-0">
              <p className="text-center uppercase font-semibold p-3">{topic}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
