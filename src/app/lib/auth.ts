import { useSession as _useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = _useSession();

  const isAuthenticated = status === "authenticated";

  const signInWithProvider = async (provider: any) => {
    await signIn(provider);
  };

  const signOutUser = async () => {
    await signOut();
  };

  return {
    session,
    isAuthenticated,
    signInWithProvider,
    signOutUser,
  };
}
