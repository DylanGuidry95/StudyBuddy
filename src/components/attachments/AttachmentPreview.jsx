function AttachmentPreview({ attachment }) {
  if (!attachment) {
    return <p>Select an attachment to preview</p>;
  }

  if (attachment.type === "pdf") {
    return (
      <iframe
        src={attachment.url}
        width="100%"
        height="400"
        title={attachment.name}
      />
    );
  }

  if (attachment.type === "image") {
    return (
      <img
        src={attachment.url}
        alt={attachment.name}
        style={{ maxWidth: "100%" }}
      />
    );
  }

  if (attachment.type === "text") {
    return (
      <iframe
        src={attachment.url}
        width="100%"
        height="200"
        title={attachment.name}
      />
    );
  }

  return null;
}

export default AttachmentPreview;
