function AttachmentList({
  attachments,
  activeId,
  setActiveId,
  renamingId,
  setRenamingId,
  renameValue,
  setRenameValue,
  saveRename,
  deleteAttachment,
}) {
  return (
    <ul style={{ minWidth: "180px" }}>
      {attachments.map((file) => (
        <li key={file.id} style={{ marginBottom: "8px" }}>
          {renamingId === file.id ? (
            <>
              <input
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
              />
              <button onClick={saveRename}>Save</button>
              <button onClick={() => setRenamingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveId(file.id)}
                style={{
                  fontWeight:
                    file.id === activeId ? "bold" : "normal",
                }}
              >
                {file.name}
              </button>

              <button
                onClick={() => {
                  setRenamingId(file.id);
                  setRenameValue(file.name);
                }}
                style={{ marginLeft: "6px" }}
              >
                ✏️
              </button>

              <button
                onClick={() => deleteAttachment(file.id)}
                style={{ marginLeft: "6px", color: "red" }}
              >
                🗑️
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default AttachmentList;
