import { useState, useEffect } from "react";
import { getCurrentSemesterKey } from "../utils/semester";

const SEMESTER_ORDER = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

export function useSubjects(subjects, setSubjects) {
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [openGroups, setOpenGroups] = useState(() => {
    const saved = localStorage.getItem("openSubjectGroups");
    return saved ? JSON.parse(saved) : {};
  });
  const [searchTerm, setSearchTerm] = useState("");
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

  const matchSearch = (subject) => {
    if (!searchTerm.trim()) return true;

    const searchLowered = searchTerm.toLowerCase();

    return (
      subject.name.toLowerCase().includes(searchLowered) ||
      subject.instructor.toLowerCase().includes(searchLowered)
    );
  };

  /* ---------- GROUPING ---------- */

  const groupedSubjects = subjects.reduce((groups, subject) => {
    if (!matchSearch(subject)) return groups;
    const key = `${subject.semester} ${subject.year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(subject);
    return groups;
  }, {});

  useEffect(() => {
    if (!searchTerm) return;
    setOpenGroups((prev) => {
      const updated = { ...prev };
      Object.keys(groupedSubjects).forEach((group) => {
        updated[group] = true;
      });

      return updated;
    }, {});
  }, [searchTerm]);
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
      [group]: prev[group] === undefined ? false : !prev[group],
    }));
  };

  useEffect(() => {
    setOpenGroups((prev) => {
      const updated = { ...prev };
      sortedGroups.forEach((group) => {
        if (updated[group] === undefined) {
          updated[group] = true;
        }
      });
      return updated;
    });
  }, [sortedGroups]);

  useEffect(() => {
    localStorage.setItem("openSubjectGroups", JSON.stringify(openGroups));
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
    searchTerm,
    setSearchTerm,
  };
}
