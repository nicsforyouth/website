"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";

export function ContinueWithDiscord({ callbackURL }: { callbackURL: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    authClient.signIn.social({
      provider: "discord",
      callbackURL,
    });
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "flex items-center cursor-pointer gap-2 rounded-md px-4 py-2 text-white hover:bg-[#4752C4] transition",
        loading ? "bg-[#4752C4]" : "bg-[#5865F2]",
      )}
    >
      <FaDiscord className="h-6 w-6" />
      {loading ? "Redirecting..." : "Sign in with Discord"}
    </button>
  );
}
