import { useState, useEffect } from "react";

const SEMESTER_ORDER = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

function getCurrentSemesterKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let semester;
  if (month <= 4) semester = "Spring";
  else if (month <= 7) semester = "Summer";
  else semester = "Fall";

  return `${semester} ${year}`;
}

export function useSubjects(subjects, setSubjects) {
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [openGroups, setOpenGroups] = useState(() => {
    const saved = localStorage.getItem("openSubjectGroups");
    return saved ? JSON.parse(saved) : {};
  });

  const currentSemesterKey = getCurrentSemesterKey();

  /* ---------- CRUD ---------- */

  const addSubject = ({ name, instructor, semester, year }) => {
    if (!name || !semester || !year || !instructor) return;

    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        name,
        instructor,
        semester,
        year,
        guides: [],
      },
    ]);
  };

  const deleteSubject = (id) => {
    if (!window.confirm("Delete this subject?")) return;

    setSubjects(subjects.filter((s) => s.id !== id));

    if (id === activeSubjectId) {
      setActiveSubjectId(null);
    }
  };

  /* ---------- GROUPING ---------- */

  const groupedSubjects = subjects.reduce((groups, subject) => {
    const key = `${subject.semester} ${subject.year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(subject);
    return groups;
  }, {});

  const sortedGroups = Object.keys(groupedSubjects).sort((a, b) => {
    if (a === currentSemesterKey) return -1;
    if (b === currentSemesterKey) return 1;

    const [semA, yearA] = a.split(" ");
    const [semB, yearB] = b.split(" ");

    if (yearA !== yearB) return yearB - yearA;
    return SEMESTER_ORDER[semB] - SEMESTER_ORDER[semA];
  });

  /* ---------- ACCORDION ---------- */

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  useEffect(() => {
    localStorage.setItem(
      "openSubjectGroups",
      JSON.stringify(openGroups)
    );
  }, [openGroups]);

  return {
    activeSubjectId,
    setActiveSubjectId,
    addSubject,
    deleteSubject,
    groupedSubjects,
    sortedGroups,
    openGroups,
    toggleGroup,
    currentSemesterKey,
  };
}
