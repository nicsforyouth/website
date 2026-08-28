"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";

export function ContinueWithDiscord() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    authClient.signIn.social({
      provider: "discord",
      callbackURL: "/workshop/parse-it",
    });
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-md bg-[#5865F2] px-4 py-2 text-white hover:bg-[#4752C4] transition"
    >
      <FaDiscord className="h-6 w-6" />
      {loading ? "Redirecting..." : "Sign in with Discord"}
    </button>
  );
}
