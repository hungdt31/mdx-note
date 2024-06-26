"use client";
import { CopyIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Link,ArrowUp, Bookmark} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "components/ui/card";
// export const generateStaticParams = async () =>
//   allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

// export const generateMetadata = ({ params }) => {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
//   return { title: post.title };
// };
const Table_of_contents = ({tags}) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const h2Elements = Array.from(document.querySelectorAll("h2, h3"));
      //console.log(h2Elements);
      const h2contents = h2Elements.map((el) => ({
        id: el.id,
        text: el.textContent,
        type: el.tagName,
      }));
      //console.log(h2contents);
      setHeadings(h2contents);
    }
  }, []);

  // console.log(headings);

  return (
    <Card className="my-5">
      <CardHeader>
        <p className="text-xl font-semibold flex items-center"><Bookmark className="mr-3"/> Table of contents</p>
      </CardHeader>
      <CardContent>
        {headings.map((heading, index) => (
          <div key={index} className={heading.type == 'H3' ? 'text-base ml-9' : 'text-lg'}>
            <a href={`#${heading.id}`} className="flex gap-3 items-center">
            {heading.type == 'H2' && <Link />} {heading.text}
            </a>
          </div>
        ))}
      </CardContent>
      <CardFooter>
      <div className="flex items-center gap-3 flex-wrap">
      Tags: {tags?.map((tag, idx) => (
        <button key={idx}>{tag}</button>
      ))}
      </div>
      </CardFooter>
    </Card>
  );
};
const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => {
    const ind = post._raw.flattenedPath.indexOf("/")
    return post._raw.flattenedPath.slice(ind + 1) === params.slug
});
  // console.log(post);
  if (!post) notFound();
  const Content = getMDXComponent(post.body.code);
  useEffect(() => {
    const preTags = document.querySelectorAll("pre")
    for (let i = 0; i < preTags.length; i++){
      const codeTag = preTags[i].querySelector("code")
      const copiedText = codeTag.textContent

      const cssCopyButton = "absolute top-2 block right-2 z-50 text-[#7355aa] border-2 border-[#7355aa] rounded-md px-3 py-[1px]"
      const copyButton = document.createElement("button")
      copyButton.className = cssCopyButton
      copyButton.innerHTML = '<strong>Copy</strong>'

      const csslanguageButton = "absolute top-2 block left-2 z-50 text-white border-2 border-white px-3 py-[1px] min-w-[80px] rounded-full"
      const languageButton = document.createElement("label")
      languageButton.className = csslanguageButton
      languageButton.innerHTML = `<p className="text-center underline">${codeTag.getAttribute("data-language")}</p>`

      codeTag.appendChild(copyButton)
      codeTag.appendChild(languageButton)

      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(copiedText)
      })
    } 
  },[])
  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 id="my-title">{post.title}</h1>
      </div>
      <Table_of_contents tags={post.tags}/>
      <Content />
      <a className="fixed bottom-2 right-2 bg-transparent" href="#my-title">
        <button>
          <ArrowUp />
        </button>
      </a>
    </article>
  );
};

export default PostLayout;
