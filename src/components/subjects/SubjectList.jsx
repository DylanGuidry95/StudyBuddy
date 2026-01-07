import { useState } from "react";
import { useSubjects } from "../../hooks/useSubjects";

function SubjectList({ subjects, setSubjects, onSelect }) {
  const {
    addSubject,
    deleteSubject,
    groupedSubjects,
    sortedGroups,
    openGroups,
    toggleGroup,
  } = useSubjects(subjects, setSubjects);

  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  const submit = () => {
    addSubject({ name, instructor, semester, year });
    setName("");
    setInstructor("");
    setSemester("");
    setYear("");
  };

  return (
    <div>
      <h2>Classes & Subjects</h2>

      <h3>Add Subject</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Subject name"
      />
      <input
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        placeholder="Instructor"
      />

      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="">Semester</option>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
        <option value="Fall">Fall</option>
      </select>

      <input
        type="number"
        value={year ? year : new Date().getFullYear()}
        onChange={(e) => setYear(e.target.value)}
        placeholder={new Date().getFullYear()}
      />

      <button onClick={submit}>Add</button>

      <hr />

      <h3>Your Subjects</h3>

      {sortedGroups.map((group) => {
        const isOpen = openGroups[group] !== false;

        return (
          <div key={group}>
            <button onClick={() => toggleGroup(group)}>
              {isOpen ? "▼" : "▶"}
            </button> {group}

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
