import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuthContext } from "../components/auth/AuthProvider";

export function useNotesDb(guideId) {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !guideId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("guide_id", guideId)
        .order("created_at");

      if (!error) setNotes(data);
      else console.error("Failed to load notes:", error);

      setLoading(false);
    };

    load();
  }, [user, guideId]);

  const addNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        guide_id: guideId,
      })
      .select()
      .single();

    if (!error) setNotes((prev) => [...prev, data]);
  };

  const updateNote = async (id, updates) => {
    const { error } = await supabase
      .from("notes")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return console.error(error);

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const deleteNote = async (id) => {
    await supabase.from("notes").delete().eq("id", id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notes: notes ?? [],
    loading,
    addNote,
    updateNote,
    deleteNote,
  };
}
