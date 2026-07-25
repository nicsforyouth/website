import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export interface Heading {
  depth: 2 | 3;
  text: string;
  slug: string;
}

export function remarkHeadings(headings: Heading[]) {
  return (tree: any) => {
    const slugger = new GithubSlugger();

    visit(tree, "heading", (node: any) => {
      if (node.depth !== 2 && node.depth !== 3) return;

      const text = toString(node).trim();

      headings.push({
        depth: node.depth,
        text,
        slug: slugger.slug(text),
      });
    });
  };
}
