import { useEffect, useRef, useState } from "react";

function NoteItem({ note, api }) {
  const isCollapsed = api.collapsed[note.id];

  const [localContent, setLocalContent] = useState(note.content);
  const debounceRef = useRef(null);

  // Keep local state in sync if note changes externally
  useEffect(() => {
    setLocalContent(note.content);
  }, [note.content]);

  const handleChange = (value) => {
    setLocalContent(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      api.updateContent(note.id, value);
    }, 5000); // ⏱ 1 second (adjust as needed)
  };

  return (
    <div>
      <button onClick={() => api.toggleCollapse(note.id)}>
        {isCollapsed ? "▶" : "▼"}
      </button>

      {!isCollapsed && (
        <textarea
          value={localContent}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default NoteItem;
