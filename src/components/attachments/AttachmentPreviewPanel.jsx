import { useAttachmentPreview } from "./AttachmentPreviewContext";
import { useEffect, useState } from "react";

function AttachmentPreviewPanel({ attachmentsDb }) {
  const { attachment, closePreview } = useAttachmentPreview();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!attachment) {
      setUrl(null);
      return;
    }

    attachmentsDb
      .getUrl(attachment.storage_path)
      .then(setUrl);
  }, [attachment, attachmentsDb]);

  return (
    <div
      className={`attachment-preview-panel ${
        attachment ? "open" : ""
      }`}
    >
      <div className="header">
        <strong>{attachment?.name}</strong>
        <button onClick={closePreview}>✕</button>
      </div>

      <div className="content">
        {url ? (
          attachment.type === "image" ? (
            <img src={url} alt={attachment.name} />
          ) : (
            <iframe
              src={url}
              title={attachment.name}
            />
          )
        ) : (
          <p>Select an attachment to preview</p>
        )}
      </div>
    </div>
  );
}

export default AttachmentPreviewPanel;
