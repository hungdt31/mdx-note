"use client";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import DocsDataTable from "components/docs-datatble";
import { Docs } from "lib/columns";
import { useState } from "react";
import removeDuplicates from "helpers/removeDuplicates";
import TagProps from "interfaces/tag-props";

export default function Home() {
  const [choosenTag, setChoosenTag] = useState<string[]>([]);
  let posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  posts = posts.map((post) => {
    post.tags.map((tag) => {
      return tag.replaceAll("\r", "");
    });
    return post;
  });
  // lấy ra tất cả các giá trị của trường tags
  posts = posts.filter((post) => {
    if (choosenTag.length === 0) {
      return true;
    }
    let count = 0;
    for (let i = 0; i < choosenTag.length; i++) {
      if (post.tags.includes(choosenTag[i])) {
        count += 1;
      }
    }
    if (count === choosenTag.length) {
      return true;
    }
    return false;
  });
  console.log(1)
  // lọc ra các giá trị trùng lặp
  const tagMap : TagProps[] = removeDuplicates(allPosts.map((post) => post.tags).flat());

  return (
    <div className="max-w-xl py-8 mx-auto">
      <div className="flex justify-center gap-3 items-center mb-7">
        <h1 className="text-3xl font-bold text-center">My note</h1>
      </div>
      <DocsDataTable
        columns={Docs}
        data={posts}
        tags={tagMap}
        setChoosenTag={setChoosenTag}
        choosenTag={choosenTag}
      />
    </div>
  );
}
