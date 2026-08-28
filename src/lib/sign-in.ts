import { authClient } from "@/lib/auth-client"; //import the auth client

await authClient.signIn.social({
  provider: "discord",
  callbackURL: "/",
  errorCallbackURL: "/error",
  newUserCallbackURL: "/",
  disableRedirect: false,
});
