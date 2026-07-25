"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  slug: string;
};

export function ShareButton({ slug }: Props) {
  async function handleShare(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const url = window.location.origin + "/articles/" + slug;

    if (navigator.share) {
      try {
        await navigator.share({
          url,
        });
      } catch {}
      return;
    }

    await navigator.clipboard.writeText(url);
    toast.success("Article link copied.");
  }

  return (
    <Button
      onClick={handleShare}
      size={"icon-sm"}
      variant={"outline"}
      className={
        "cursor-pointer flex items-center justify-center hover:text-black"
      }
    >
      <Share2 className="text-muted-foreground hover:text-black" />
    </Button>
  );
}
