import { useState } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { getCurrentSemester } from "../../utils/semester";
import SemesterSelect from "../form/SemesterSelect";
import YearInput from "../form/YearInput";

function SubjectList({ subjects, setSubjects, onSelect }) {
  const {
    addSubject,
    deleteSubject,
    groupedSubjects,
    sortedGroups,
    openGroups,
    toggleGroup,
    searchTerm,
    setSearchTerm,
  } = useSubjects(subjects, setSubjects);

  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [semester, setSemester] = useState(() => getCurrentSemester());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const submit = () => {
    if (!validate()) return;
    addSubject({ name, instructor, semester, year });
    setName("");
    setInstructor("");
    setSemester(() => getCurrentSemester());
    setYear(() => new Date().getFullYear());
  };

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = true;
    if (!instructor.trim()) newErrors.instructor = true;
    if (!semester) newErrors.semester = true;
    if (!year) newErrors.year = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitError(
        "Failed to create subject. Please fill out all required fields."
      );
      return false;
    }

    setSubmitError("");
    return true;
  };

  return (
    <div>
      <h2>Classes & Subjects</h2>

      <h3>Add Subject</h3>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((prev) => ({ ...prev, name: false }));
        }}
        placeholder="Subject name"
        style={{ border: errors.name ? "2px solid red" : undefined }}
      />
      <input
        value={instructor}
        onChange={(e) => {
          setInstructor(e.target.value);
          setErrors((prev) => ({ ...prev, instructor: false }));
        }}
        placeholder="Instructor"
        style={{ border: errors.instructor ? "2px solid red" : undefined }}
      />

      <SemesterSelect
        value={semester}
        onChange={(val) => {
          setSemester(val);
          setErrors((prev) => ({ ...prev, semester: false }));
        }}
        error={errors.semester}
      />

      <YearInput
        value={year}
        onChange={(val) => {
          setYear(val);
          setErrors((prev) => ({ ...prev, year: false }));
        }}
        error={errors.year}
      />

      <button onClick={submit}>Add</button>
      {submitError && <div style={{ color: "red" }}>{submitError}</div>}

      <hr />

      <h3>Your Subjects</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search subjects or instructors..."
        style={{ width: "100%", marginBottom: "12px" }}
      />
      {sortedGroups.map((group) => {
        const isOpen = openGroups[group] !== false;

        return (
          <div key={group}>
            <button onClick={() => toggleGroup(group)}>
              {isOpen ? "▼" : "▶"}
            </button>{" "}
            {group}
            {isOpen &&
              groupedSubjects[group].map((subject) => (
                <div key={subject.id}>
                  <strong>{subject.name}</strong>
                  <div>{subject.instructor}</div>

                  <button onClick={() => onSelect(subject)}>
                    View Study Guides
                  </button>

                  <button
                    onClick={() => deleteSubject(subject.id)}
                    style={{ color: "red" }}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}

export default SubjectList;
