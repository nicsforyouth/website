"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function LoginButton() {
  return (
    <button onClick={() => authClient.signIn.social({ provider: "discord" })}>
      Sign in with Discord
    </button>
  );
}

const AuthPage = () => {
  // const [user, setUser] = useState();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   authClient.getSession().then(({ data }) => {
  //     if (data?.session) {
  //       setUser(data.session.user);
  //     }
  //     setLoading(false);
  //   });
  // }, []);
  //
  // return <div></div>;
  return (
    <div>
      <LoginButton />
    </div>
  );
};

export default AuthPage;
