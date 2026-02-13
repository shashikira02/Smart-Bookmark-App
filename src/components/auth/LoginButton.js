"use client";

import useAuth from "@/hooks/useAuth";

export default function LoginButton() {
  const { signInWithGoogle } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Login with Google
    </button>
  );
}
