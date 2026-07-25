import { Info, TriangleAlert, CircleCheck, CircleX } from "lucide-react";

type Props = {
  type?: "info" | "warning" | "success" | "danger";
  children: React.ReactNode;
};

const styles = {
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/15 text-blue-800",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-800",
  },
  success: {
    icon: CircleCheck,
    className: "border-green-500/30 bg-green-500/10 text-green-800",
  },
  danger: {
    icon: CircleX,
    className: "border-red-500/30 bg-red-500/10 text-red-800",
  },
};

export function Callout({ type = "info", children }: Props) {
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div
      className={
        "my-6 flex gap-3 items-center rounded-xl border px-4 " + style.className
      }
    >
      <Icon className="h-5 w-5 shrink-0" />

      <div>{children}</div>
    </div>
  );
}
