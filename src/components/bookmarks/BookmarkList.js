"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setBookmarks(data);
      }

      setLoading(false);
    };

    fetchBookmarks();
  }, [user]);

  if (loading) return <p>Loading bookmarks...</p>;

  if (bookmarks.length === 0)
    return <p>No bookmarks yet.</p>;

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
        />
      ))}
    </div>
  );
}
