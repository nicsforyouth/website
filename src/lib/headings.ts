import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

export interface Heading {
  depth: 2 | 3;
  text: string;
  slug: string;
}

export function extractHeadings(markdown: string): Heading[] {
  const tree = fromMarkdown(markdown);

  const slugger = new GithubSlugger();

  const headings: Heading[] = [];

  function walk(node: any) {
    if (!node) return;

    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const text = toString(node);

      headings.push({
        depth: node.depth,
        text,
        slug: slugger.slug(text),
      });
    }

    if (node.children) {
      node.children.forEach(walk);
    }
  }

  walk(tree);

  return headings;
}
