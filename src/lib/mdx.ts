import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx";
import { Heading } from "./remark-headings";
import remarkJSRunner from "./remark-js-runner";

export async function parseMDX(source: string) {
  const headings: Heading[] = [];

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkJSRunner,
          // remarkHeadings(headings)
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
            },
          ],
        ],
      },
    },
  });
  return { content, headings };
}
