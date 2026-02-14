"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function BookmarkForm({ user }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert("Error adding bookmark");
      console.error(error);
    } else {
      setTitle("");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <h3 className="text-lg font-semibold mb-3">
        Add Bookmark
      </h3>

      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 mb-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="url"
        placeholder="https://example.com"
        className="w-full border p-2 mb-3 rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Bookmark"}
      </button>
    </form>
  );
}
