import type { MDXComponents } from "mdx/types";

import { Callout } from "./Callout";
import { Image } from "./Image";
import { Table } from "./ProseTable";
import { Quote } from "./Quote";
import { DraggableString } from "./string-drag";
import JSRunner from "./js-runner";
import { YouTube } from "./youtube";

export const mdxComponents: MDXComponents = {
  Callout,
  Image,
  Quote,
  table: Table,
  DraggableString,
  JSRunner,
  YouTube,
};
