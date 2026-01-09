import GuideTitle from "./GuideTitle";
import CalendarPanel from "../home/CalendarPanel";
import NotesPanel from "../notes/NotesPanel";

function GuideEditor({ guide, onUpdateTitle, notesDb }) {
  if (!guide) {
    return <p>No guide selected</p>;
  }

  return (
    <>
      <GuideTitle
        guide={guide}                
        updateGuide={onUpdateTitle}
      />      
      {/* Notes & attachments come back after DB migration */}      
      <CalendarPanel />
      <NotesPanel notesDb={notesDb} />
    </>
  );
}

export default GuideEditor;
