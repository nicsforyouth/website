import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ContinueWithDiscord } from "@/components/auth/ContinueWithDiscord";

export default async function RegisterPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border bg-muted border-border p-8 text-center">
        {session ? (
          <>
            <h1 className="text-xl font-semibold">
              You&apos;re registered as {session.user.name}!
            </h1>
            <p className="mt-3 text-sm">
              Thanks for registering! We will keep you updated on the details of
              the workshop.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">
              You&apos;re not logged in.
            </h1>
            <div className="mt-5 flex justify-center">
              <ContinueWithDiscord />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
