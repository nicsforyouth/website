import type { MDXComponents } from "mdx/types";

import { Callout } from "./Callout";
import { Image } from "./Image";
import { Table } from "./ProseTable";
import { Quote } from "./Quote";

export const mdxComponents: MDXComponents = {
  Callout,
  Image,
  Quote,
  table: Table,
};
