import { useState } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { getCurrentSemester } from "../../utils/semester";
import SemesterSelect from "../form/SemesterSelect";
import YearInput from "../form/YearInput";
import SubjectViewer from "../form/SubjectViewer";
import CalendarPanel from "./CalendarPanel";

function SubjectList({ subjects, setSubjects, onSelect }) {
  const {
    addSubject,    
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
    <div className="sidebar">
      <h2>Classes & Subjects</h2>
      {/* Form to add new subject */}
      <h3>Add New Subject</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((prev) => ({ ...prev, name: false }));
        }}
        placeholder="Subject Name"
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

       <SubjectViewer subjects={subjects} setSubjects={setSubjects} onSelect={onSelect}></SubjectViewer> 
    </div>        
  );
}

export default SubjectList;
