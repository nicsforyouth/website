import { visit } from "unist-util-visit";

export default function remarkJSRunner() {
  return (tree: any) => {
    visit(tree, "mdxJsxFlowElement", (node: any) => {
      if (node.name !== "JSRunner") return;

      const codeBlock = node.children?.find(
        (child: any) => child.type === "code",
      );

      if (!codeBlock) return;

      node.attributes = [
        {
          type: "mdxJsxAttribute",
          name: "code",
          value: codeBlock.value,
        },
      ];

      node.children = [];
    });
  };
}
