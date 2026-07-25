import {
  Bad_Script,
  Carattere,
  Merriweather,
  MonteCarlo,
  Parisienne,
  Petit_Formal_Script,
} from "next/font/google";

const badscript = Merriweather({
  weight: ["400", "500"],
  style: ["italic"],
});

type Props = {
  author?: string;
  children: React.ReactNode;
};

export function Quote({ children, author }: Props) {
  return (
    <div className={`flex flex-col ${badscript.className}`}>
      <div className={`text-center italic text-xl font-medium`}>{children}</div>

      {author && (
        <div className="text-right text-base text-muted-foreground">
          - {author}
        </div>
      )}
    </div>
  );
}
