"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setBookmarks(data || []);
    };

    fetchBookmarks();

    // Realtime subscription
    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          console.log("Realtime event:", payload);

          // Only update if it belongs to current user
          if (payload.new?.user_id === user.id) {
            if (payload.eventType === "INSERT") {
              setBookmarks((prev) => [payload.new, ...prev]);
            }
          }

          if (payload.old?.user_id === user.id) {
            if (payload.eventType === "DELETE") {
              setBookmarks((prev) =>
                prev.filter((item) => item.id !== payload.old.id)
              );
            }
          }
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
