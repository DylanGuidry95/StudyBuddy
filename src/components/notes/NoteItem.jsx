import { useEffect, useRef, useState } from "react";

function NoteItem({ note, ui }) {
  const isCollapsed = ui.collapsed[note.id] !== false;

  const [draft, setDraft] = useState(note.content);
  const isDirtyRef = useRef(false);
  const timeoutRef = useRef(null);

  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Sync ONLY when switching notes
  useEffect(() => {
    isDirtyRef.current = false;
    setDraft(note.content);
  }, [note.id]);

  // Cleanup
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setDraft(value);
    isDirtyRef.current = true;

    clearTimeout(timeoutRef.current);

    setIsSaving(true);
    setJustSaved(false);

    timeoutRef.current = setTimeout(async () => {
      await ui.updateContent(note.id, value);

      setIsSaving(false);
      setJustSaved(true);
      isDirtyRef.current = false;

      // hide "Saved" after a moment
      setTimeout(() => setJustSaved(false), 1500);
    }, 700);
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "6px", marginBottom: "8px" }}
    >
      <div style={{ display: "flex", gap: "6px" }}>
        <button onClick={() => ui.toggleCollapse(note.id)}>
          {isCollapsed ? "▶" : "▼"}
        </button>

        <strong>{note.title || "Untitled Note"}</strong>

        <button
          onClick={() => ui.remove(note.id)}
          style={{ marginLeft: "auto" }}
        >
          🗑️
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div
            style={{ fontSize: "0.8em", marginTop: "4px", color: "#6b7280" }}
          >
            {isSaving && "Saving…"}
            {!isSaving && justSaved && "Saved"}
          </div>
          <textarea
            value={draft}
            onChange={handleChange}
            style={{ width: "100%", marginTop: "6px" }}
          />
        </>
      )}
    </div>
  );
}

export default NoteItem;
