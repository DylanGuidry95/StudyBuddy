import { useAttachmentPreview } from "./AttachmentPreviewContext";
import { useEffect, useState } from "react";

function AttachmentPreviewHost({ attachmentsDb }) {
  const { attachment, closePreview } = useAttachmentPreview();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!attachment) {
      setUrl(null);
      return;
    }

    attachmentsDb.getUrl(attachment.storage_path).then(setUrl);
  }, [attachment, attachmentsDb]);

  if (!attachment || !url) return null;

  return (
    <div className="attachment-preview">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{attachment.name}</strong>
        <button onClick={closePreview}>✕</button>
      </div>

      <iframe
        src={url}
        width="100%"
        height="300"
        title={attachment.name}
      />
    </div>
  );
}

export default AttachmentPreviewHost;
