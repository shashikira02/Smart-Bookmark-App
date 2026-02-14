"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import BookmarkForm from "@/components/bookmarks/BookmarkForm";
import BookmarkList from "@/components/bookmarks/BookmarkList";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <p className="mb-4">Welcome, {user?.email}</p>

      <BookmarkForm user={user} />
      <BookmarkList user={user} />

    </div>
  );
}
