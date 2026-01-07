import { useNotes } from "../../hooks/useNotes";
import NoteItem from "./NoteItem";

function NotesPanel({ notes, updateGuide }) {
  const noteApi = useNotes(notes, updateGuide);

  return (
    <>
      <h3>Notes</h3>
      <button onClick={noteApi.add}>Add Note</button>

      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          notes={notes}
          api={noteApi}
        />
      ))}
    </>
  );
}

export default NotesPanel;
