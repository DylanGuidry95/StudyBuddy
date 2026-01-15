import { createContext, useContext, useState } from "react";

const AttachmentPreviewContext = createContext(null);

export function AttachmentPreviewProvider({ children }) {
  const [attachment, setAttachment] = useState(null);

  const openPreview = (attachment) => {
    setAttachment(attachment);
  };

  const closePreview = () => {
    setAttachment(null);
  };

  return (
    <AttachmentPreviewContext.Provider
      value={{
        attachment,
        openPreview,
        closePreview,
      }}
    >
      {children}
    </AttachmentPreviewContext.Provider>
  );
}

export function useAttachmentPreview() {
  const ctx = useContext(AttachmentPreviewContext);
  if (!ctx) {
    throw new Error(
      "useAttachmentPreview must be used inside AttachmentPreviewProvider"
    );
  }
  return ctx;
}

export default AttachmentPreviewProvider
