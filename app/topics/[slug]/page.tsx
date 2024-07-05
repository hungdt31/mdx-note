import { CircleChevronRight } from "lucide-react";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
export default function Page({ params }: { params: { slug: string } }) {
  const posts = allPosts.filter((post) => {
    const ind = post._raw.flattenedPath.indexOf("/")
    return post._raw.flattenedPath.slice(0,ind) == params.slug;
  })
  return (
    <div>
      <div className="flex gap-5 items-center justify-center">
        {/* <CircleChevronRight /> */}
        <h2 className="uppercase">{params.slug}</h2>
      </div>
      {
        posts.map((post, index) => {
          return (
            <h4 className="font-semibold" key={index}>
              <Link href={post.url}>
                {post.title}
              </Link>
            </h4>
          )
        })
      }
    </div>
  );
}
