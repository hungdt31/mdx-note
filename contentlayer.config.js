import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkMath from 'remark-math'
// import { s } from 'hastscript';
import remarkFrontmatter from 'remark-frontmatter'
import rehypeKatex from 'rehype-katex'
// import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
// import remarkParse from 'remark-parse'
// import rehypeStringify from 'rehype-stringify'
const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      // remarkParse,
      // remarkFrontmatter,
      // remarkRehype,
      remarkGfm,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: "dracula",
          // keepBackground: false,
        },
      ],
      // rehypeStringify
    ],
  }
})
