"use client";
import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import DocsDataTable from "components/docs-datatble";
import { Docs } from "lib/columns";
import { useState } from "react";
import removeDuplicates from "helpers/removeDuplicates";
import TagProps from "interfaces/tag-props";

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Chuẩn hóa tags và sort bài viết
  const normalizedPosts = allPosts
    .map(post => ({
      ...post,
      tags: post.tags.map(tag => tag.replace(/\r/g, "")),
    }))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  // Lọc bài viết theo tag đã chọn
  const filteredPosts = selectedTags.length === 0
    ? normalizedPosts
    : normalizedPosts.filter(post =>
      selectedTags.every(tag => post.tags.includes(tag))
    );

  // Lấy tất cả tag duy nhất
  const tags: TagProps[] = removeDuplicates(
    normalizedPosts.flatMap(post => post.tags)
  );

  return (
    <div className="max-w-xl py-8 mx-auto">
      <div className="flex justify-center gap-3 items-center mb-7">
        <h1 className="text-3xl font-bold text-center">My note</h1>
      </div>
      <DocsDataTable
        columns={Docs}
        data={filteredPosts}
        tags={tags}
        setChoosenTag={setSelectedTags}
        choosenTag={selectedTags}
      />
    </div>
  );
}
