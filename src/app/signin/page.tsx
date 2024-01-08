import React from "react";
import { useAuth } from "../lib/auth";

export default function SignIn() {
  const { session, isAuthenticated, signInWithProvider, signOutUser } =
    useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {session?.user?.name}!</p>
          <button onClick={signOutUser}>Sign out</button>
        </>
      ) : (
        <>
          <p>Please sign in:</p>
          <button onClick={() => signInWithProvider("github")}>
            Sign in with GitHub
          </button>
          <button onClick={() => signInWithProvider("google")}>
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
