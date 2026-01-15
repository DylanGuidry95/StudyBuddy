import { useAttachmentPreview } from "../attachments/AttachmentPreviewContext";

function AttachmentLink({ name, attachments }) {
  const { openPreview } = useAttachmentPreview();
  const attachment = attachments.find(a => a.name === name);

  if (!attachment) {
    return <span style={{ color: "red" }}>[[{name}]]</span>;
  }

  return (
    <span
      onClick={() => openPreview(attachment)}
      style={{
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: 500,
      }}
    >
      [[{name}]]
    </span>
  );
}

export default AttachmentLink