"use client";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowUp } from "lucide-react";

const TableOfContents = dynamic(() => import("./toc-client"), { ssr: false });

const BUTTON_STYLES = {
  copy: "absolute top-2 right-2 z-50 text-cyan-900 border-2 border-cyan-900 rounded-md px-3 py-[1px]",
  language: "absolute top-2 left-2 z-50 text-white border-2 border-white px-3 py-[1px] min-w-[80px] rounded-full",
} as const;

const PostLayout = ({ params }: { params: { slug: string } }) => {
  // Tìm bài post theo slug
  const post = allPosts.find((post) => {
    const pathSegments = post._raw.flattenedPath.split("/");
    return pathSegments[pathSegments.length - 1] === params.slug;
  });

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  // Thêm copy button và language label cho code blocks
  useEffect(() => {
    const preTags = document.querySelectorAll("pre");
    const buttons: HTMLButtonElement[] = [];
    const labels: HTMLLabelElement[] = [];

    preTags.forEach((preTag) => {
      const codeTag = preTag.querySelector("code");
      if (!codeTag) return;

      // Tạo Copy button
      const copyButton = document.createElement("button");
      copyButton.className = BUTTON_STYLES.copy;
      copyButton.innerHTML = "<strong>Copy</strong>";
      copyButton.onclick = () => {
        navigator.clipboard.writeText(codeTag.textContent || "");
      };

      // Tạo Language label
      const languageLabel = document.createElement("label");
      languageLabel.className = BUTTON_STYLES.language;
      const language = codeTag.getAttribute("data-language") || "code";
      languageLabel.innerHTML = `<p class="text-center underline">${language}</p>`;

      codeTag.appendChild(copyButton);
      codeTag.appendChild(languageLabel);

      buttons.push(copyButton);
      labels.push(languageLabel);
    });

    // Cleanup function để xóa buttons khi component unmount
    return () => {
      buttons.forEach((btn) => btn.remove());
      labels.forEach((label) => label.remove());
    };
  }, []);

  const scrollToTop = () => {
    document.getElementById("my-title")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <article className="py-8 mx-auto max-w-xl">
      {/* Header với thông tin bài viết */}
      <header className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 id="my-title">{post.title}</h1>
      </header>

      {/* Table of contents */}
      <TableOfContents tags={post.tags} />

      {/* Nội dung bài viết */}
      <Content />

      {/* Nút scroll to top */}
      <button
        className="fixed bottom-2 right-2 bg-transparent border-cyan-700 p-2 rounded-md hover:bg-cyan-50 dark:hover:bg-cyan-900 transition-colors"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        type="button"
      >
        <ArrowUp />
      </button>
    </article>
  );
};

export default PostLayout;
