import { useEffect, useRef, useState } from "react";
import NotePreview from "./NotePreview";

function NoteItem({ note, ui, attachments }) {
  const isCollapsed = ui.collapsed[note.id] !== false;
  const textareaRef = useRef(null);
  const [draft, setDraft] = useState(note.content || "");
  const [caretPos, setCaretPos] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [localContent, setLocalContent] = useState(note.content);
  const debounceRef = useRef(null);
  // Sync external updates
  useEffect(() => {
    setDraft(note.content || "");
  }, [note.content]);

  // Debounced save
  useEffect(() => {
    const t = setTimeout(() => {
      ui.updateContent(note.id, draft);
    }, 1200);

    return () => clearTimeout(t);
  }, [draft, note.id, ui]);

  const handleChange = (e) => {
    setDraft(e.target.value);
    setCaretPos(e.target.selectionStart);
    setLocalContent(note.content);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      ui.updateContent(note.id, e.target.value);
    }, 5000);
  };

  const insertAttachment = (name) => {
    const before = draft.slice(0, caretPos);
    const after = draft.slice(caretPos);

    const nextValue = `${before}[[${name}]]${after}`;
    const nextCaret = before.length + name.length + 4;

    setDraft(nextValue);
    setShowPicker(false);

    // Restore caret safely
    setTimeout(() => {
      if (!textareaRef.current) return;
      textareaRef.current.focus();
      textareaRef.current.selectionStart = nextCaret;
      textareaRef.current.selectionEnd = nextCaret;
    }, 0);
  };

  const collapseWhileEditing = () => {
    ui.toggleCollapse(note.id);
    setShowPicker(false);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        marginBottom: "10px",
      }}
    >
      {!isEditingName && (
        <div>
          <strong>{note.title || "Untitled Note"}</strong>
          <button
            onClick={() => {
              setIsEditingName(true);
              ui.startRename(note);
            }}
          >
            Edit Name
          </button>
          <button
            onClick={() => ui.remove(note.id)}
            style={{ marginLeft: "6px", color: "red" }}
          >
            🗑️
          </button>
        </div>
      )}
      {isEditingName && (
        <div>
          <input
            placeholder={note.title}
            onChange={(e) => ui.setRenameValue(e.target.value)}
          ></input>
          <button
            onClick={() => {
              ui.saveRename();
              setIsEditingName(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditingName(false)}>Close</button>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button onClick={() => collapseWhileEditing()}>
          {isCollapsed ? "▶" : "▼"}
        </button>
      </div>

      {!isCollapsed && (
        <div>
          {isEditing && (
            <div style={{ marginTop: "6px" }}>
              <button onClick={() => setShowPicker((p) => !p)}>
                📎 Insert Attachment
              </button>
            </div>
          )}
          <button onClick={() => setIsEditing((p) => !p)}>
            {isEditing ? "Save" : "Edit"}
          </button>
          {showPicker && (
            <div
              style={{
                marginTop: "6px",
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "#fafafa",
              }}
            >
              {attachments.length === 0 && (
                <p style={{ fontSize: "12px", color: "#777" }}>
                  No attachments available
                </p>
              )}

              {attachments.map((a) => (
                <div key={a.id}>
                  <button
                    onClick={() => insertAttachment(a.name)}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {a.name}
                  </button>
                </div>
              ))}

              <button
                onClick={() => setShowPicker(false)}
                style={{ marginTop: "6px" }}
              >
                Close
              </button>
            </div>
          )}
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "6px" }}
            />
          ) : (
            <NotePreview
              content={draft}
              attachments={attachments}              
            />
          )}
        </div>
      )}
    </div>
  );
}

export default NoteItem;
