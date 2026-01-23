import { useSubjectsDb } from "../../hooks/useSubjectsDb";
import { useSubjects } from "../../hooks/useSubjects";
import { useAuthContext } from "../auth/AuthProvider";

import SubjectCreator from "../form/SubjectCreator";
import SubjectViewer from "../form/SubjectViewer";
import CalendarPanel from "../calendar/CalendarPanel";
import { useEffect, useState } from "react";

export function HomeLayout() {
  const subjectsDb = useSubjectsDb();
  const subjectsUi = useSubjects(subjectsDb);
  const { user } = useAuthContext();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isNavOpen]);

  if (!user) return <p>Please log in to view your subjects.</p>;
  if (subjectsUi.loading) return <p>Loading subjects…</p>;

  const SidebarContent = (
    <>
      <SubjectCreator addSubject={subjectsUi.addSubject} />
      <br />
      <SubjectViewer subjectsUi={subjectsUi} />
    </>
  );

  return (
    <div className="home-layout">
      {/* MOBILE HEADER */}
      <header className="mobile-header mobile-only">
        <button onClick={() => setIsNavOpen(true)}>☰</button>        
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="sidebar desktop-only">
        {SidebarContent}
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside className={`mobile-sidebar mobile-only ${isNavOpen ? "open" : ""}`}>
        {SidebarContent}
      </aside>

      {/* BACKDROP (MOBILE ONLY) */}
      {isNavOpen && (
        <div
          className="backdrop mobile-only"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="calendar-panel">
        <CalendarPanel subjectId={null} />
      </main>
    </div>
  );
}

export default HomeLayout;
