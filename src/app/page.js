"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-6">
        Smart Bookmark App
      </h1>
      <LoginButton />
    </div>
  );
}
