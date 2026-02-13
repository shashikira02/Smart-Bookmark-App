import { supabase } from "../lib/supabase/supabaseClient";

export default async function Home() {
  console.log("Supabase initialized:", !!supabase);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-6">
        Smart Bookmark App
      </h1>
      <p>Supabase connected successfully.</p>
    </div>
  );
}
