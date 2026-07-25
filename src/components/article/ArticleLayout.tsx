import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ArticleLayout({ children }: Props) {
  return <main className="mx-auto max-w-7xl px-3 py-16">{children}</main>;
}
