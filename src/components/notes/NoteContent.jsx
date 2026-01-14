import { parseAttachmentLinks } from "../../utils/parseAttachmentLinks";

export function NoteContent({ text, attachments, onOpenAttachment }) {
  const parts = parseAttachmentLinks(text, attachments);

  return (
    <div>
      {parts.map((part, i) => {
        if (part.type === "text") {
          return <span key={i}>{part.value}</span>;
        }

        if (part.attachment) {
          return (
            <button
              key={i}
              onClick={() => onOpenAttachment(part.attachment)}
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {part.value}
            </button>
          );
        }

        return (
          <span
            key={i}
            style={{ color: "red", fontStyle: "italic" }}
          >
            [[{part.value}]]
          </span>
        );
      })}
    </div>
  );
}
export default NoteContent