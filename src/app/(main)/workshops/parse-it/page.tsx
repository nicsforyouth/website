import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ContinueWithDiscord } from "@/components/auth/ContinueWithDiscord";
import { ParseItWorkshopPage } from "./MainPage";

export default async function ParseIt() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <ParseItWorkshopPage />
    </>
  );
  // return (
  //   <div className="flex min-h-screen items-center justify-center px-4">
  //     <div className="w-full max-w-sm rounded-xl border bg-muted border-border p-8 text-center">
  //       {session ? (
  //         <>
  //           <h1 className="text-xl font-semibold">
  //             You&apos;re registered as {session.user.name}!
  //           </h1>
  //           <p className="mt-3 text-sm">
  //             Thanks for registering! We will keep you updated on the details of
  //             the workshop.
  //           </p>
  //         </>
  //       ) : (
  //         <div className="space-y-4">
  //           <h1 className="text-xl font-semibold">
  //             You&apos;re not logged in.
  //           </h1>
  //           <div className="mt-5 flex justify-center">
  //             <ContinueWithDiscord callbackURL="/workshops/parse-it" />
  //           </div>
  //           <p className="text-sm text-muted-foreground">
  //             Logging in helps to track your progress and earn a final badge +
  //             certificate after completing the workshop!
  //           </p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
