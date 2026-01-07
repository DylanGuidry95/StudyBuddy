function NoteItem({ note, notes, api }) {
  const isCollapsed = api.collapsed[note.id];

  return (
    <div>
      <button onClick={() => api.toggleCollapse(note.id)}>
        {isCollapsed ? "▶" : "▼"}
      </button>

      {api.renamingId === note.id ? (
        <>
          <input
            value={api.renameValue}
            onChange={(e) => api.setRenameValue(e.target.value)}
          />
          <button onClick={api.saveRename}>Save</button>
        </>
      ) : (
        <>
          <strong>{note.title}</strong>
          <button onClick={() => api.startRename(note)}>✏️</button>
        </>
      )}

      {!isCollapsed && (
        <textarea
          value={note.content}
          onChange={(e) =>
            api.updateContent(note.id, e.target.value)
          }
        />
      )}

      <button onClick={() => api.remove(note.id)}>🗑️</button>
    </div>
  );
}

export default NoteItem;
