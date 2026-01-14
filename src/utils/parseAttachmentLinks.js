export function parseAttachmentLinks(text, attachments) {
  if (!text) return [];

  const regex = /\[\[([^\]]+)\]\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    const start = match.index;
    const end = regex.lastIndex;

    if (start > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, start),
      });
    }

    const attachment = attachments.find((a) => a.name === name);

    parts.push({
      type: "attachment",
      value: name,
      attachment,
    });

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  return parts;
}