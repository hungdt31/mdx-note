"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "components/ui/card";
import { Bookmark, GitCommitVertical, GitMerge, TagIcon } from "lucide-react";

export default function Table_of_contents({ tags }: { tags: string[] }) {
  const [headings, setHeadings] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const h2Elements = Array.from(document.querySelectorAll("h2, h3"));
    const h2contents = h2Elements.map((el) => ({
      id: el.id,
      text: el.textContent,
      type: el.tagName,
    }));
    setHeadings(h2contents);
  }, []);

  // Không render gì cho đến khi component được mount trên client
  if (!mounted) {
    return null;
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <p className="text-xl font-semibold flex items-center">
          <Bookmark className="mr-3" /> Table Of Contents
        </p>
      </CardHeader>
      <CardContent>
        {headings.length > 0 ? (
          headings.map((heading, index) => (
            <div key={index} className={heading.type === "H3" ? "text-base ml-9" : "text-lg"}>
              <a href={`#${heading.id}`} className="flex gap-3 items-center text-cyan-700">
                {heading.type === "H2" ? <GitCommitVertical /> : <GitMerge size={16} />} {heading.text}
              </a>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Loading...</p>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-3 flex-wrap">
          <TagIcon /> {tags?.map((tag, idx) => (
            <button key={idx}>{tag}</button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}