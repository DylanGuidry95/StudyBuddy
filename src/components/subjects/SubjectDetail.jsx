import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubjectSidebar from "./SubjectSidebar";
import GuideEditor from "../guides/GuideEditor";
import CalendarPanel from "../calendar/CalendarPanel";
import AttachmentPreviewPanel from "../attachments/AttachmentPreviewPanel";

import { useSubjectsDb } from "../../hooks/useSubjectsDb";
import { useGuidesDb } from "../../hooks/useGuidesDb";
import { useNotesDb } from "../../hooks/useNoteDb";
import { useAttachmentsDb } from "../../hooks/useAttachmentsDb";
import AttachmentPreviewProvider from "../attachments/AttachmentPreviewContext";

function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const subjectsDb = useSubjectsDb();
  const guidesDb = useGuidesDb(id);

  const [activeGuideId, setActiveGuideId] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const attachmentsDb = useAttachmentsDb(activeGuideId);
  const notesDb = useNotesDb(activeGuideId);

  // Lock scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isNavOpen]);

  if (subjectsDb.loading) {
    return <p>Loading subject…</p>;
  }

  const subject = subjectsDb.subjects.find(
    (s) => String(s.id) === String(id)
  );

  if (!subject) {
    return <p>{id} not found</p>;
  }

  const activeGuide = guidesDb.guides.find(
    (g) => String(g.id) === String(activeGuideId)
  );

  const updateGuideTitle = async (newTitle) => {
    await guidesDb.updateGuideTitle(activeGuideId, newTitle);
  };

  // Sidebar content reused for desktop + mobile
  const SidebarContent = (
    <SubjectSidebar
      subject={subject}
      guidesDb={guidesDb}
      activeGuideId={activeGuideId}
      setActiveGuideId={(id) => {
        setActiveGuideId(id);
        setIsNavOpen(false); // auto-close on mobile
      }}
    />
  );

  return (
    <div className="subject-detail-page">
      {/* MOBILE HEADER */}
      <header className="mobile-header mobile-only">
        <button onClick={() => setIsNavOpen(true)}>☰</button>
        <h1>{subject.name}</h1>
      </header>

      {/* BACK BUTTON (DESKTOP) */}
      <button className="desktop-only" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="subject-layout">
        {/* DESKTOP SIDEBAR */}
        <aside className="sidebar desktop-only">
          {SidebarContent}
        </aside>

        {/* MOBILE SIDEBAR */}
        <aside className={`mobile-sidebar mobile-only ${isNavOpen ? "open" : ""}`}>
          {SidebarContent}
        </aside>

        {/* BACKDROP */}
        {isNavOpen && (
          <div
            className="backdrop mobile-only"
            onClick={() => setIsNavOpen(false)}
          />
        )}

        {/* MAIN CONTENT */}
        <main className="editor">
          {guidesDb.loading ? (
            <p>Loading guides…</p>
          ) : activeGuide ? (
            <>
              <button onClick={() => setActiveGuideId(null)}>
                Close Guide
              </button>

              <AttachmentPreviewProvider>
                <GuideEditor
                  guide={activeGuide}
                  notesDb={notesDb}
                  onUpdateTitle={updateGuideTitle}
                  attachmentsDb={attachmentsDb}
                />
                <AttachmentPreviewPanel attachmentsDb={attachmentsDb} />
              </AttachmentPreviewProvider>
            </>
          ) : (
            <>
              <CalendarPanel subjectId={id} />
              <p>Select or create a study guide</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default SubjectDetail;
