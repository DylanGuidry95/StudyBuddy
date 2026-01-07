import GuideTitle from "./GuideTitle";
import NotesPanel from "../notes/NotesPanel";
import AttachmentPanel from "../attachments/AttachmentPanel";

function GuideEditor({ guide, updateGuide }) {
  return (
    <>
      <GuideTitle guide={guide} updateGuide={updateGuide} />

      <NotesPanel
        notes={guide.notes}
        updateGuide={updateGuide}
      />

      <AttachmentPanel
        attachments={guide.attachments}
        updateGuide={updateGuide}
      />
    </>
  );
}

export default GuideEditor;
