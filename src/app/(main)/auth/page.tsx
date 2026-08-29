import { ContinueWithDiscord } from "@/components/auth/ContinueWithDiscord";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 bg-muted">
      <div className="w-full max-w-sm bg-background flex flex-col items-center justify-center px-6 py-16 rounded-md border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome to NICS
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue to your NICS account.
          </p>
        </div>

        <ContinueWithDiscord callbackURL="/workshops/parse-it" />
      </div>
    </main>
  );
}
