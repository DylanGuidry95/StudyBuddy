import { useAttachments } from "../../hooks/useAttachments";
import AttachmentList from "./AttachmentList";
import AttachmentPreview from "./AttachmentPreview";

function AttachmentPanel({ attachments = [], updateGuide }) {
  const {
    activeAttachment,
    activeAttachmentId,
    setActiveAttachmentId,
    renamingId,
    renameValue,
    setRenameValue,
    upload,
    startRename,
    saveRename,
    remove,
  } = useAttachments(attachments, updateGuide);

  return (
    <>
      <h3>Attachments</h3>

      <input
        type="file"
        accept=".pdf,image/*,.txt"
        onChange={(e) => upload(e.target.files[0])}
      />

      <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
        <AttachmentList
          attachments={attachments}
          activeId={activeAttachmentId}
          setActiveId={setActiveAttachmentId}
          renamingId={renamingId}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          startRename={startRename}
          saveRename={saveRename}
          deleteAttachment={remove}
        />

        <AttachmentPreview attachment={activeAttachment} />
      </div>
    </>
  );
}

export default AttachmentPanel;
