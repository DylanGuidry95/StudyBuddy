import { useState } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { getCurrentSemester } from "../../utils/semester";
import SemesterSelect from "../form/SemesterSelect";
import YearInput from "../form/YearInput";
import HomeLayout from "../home/HomeSidebar";
import CalendarPanel from "../home/CalendarPanel";
import  AuthTests  from "../../tests/authTests";

function SubjectList({ subjects, setSubjects, onSelect }) {
  const {} = useSubjects(subjects, setSubjects);

  return (
    <div className="home-layout">
      <HomeLayout subjects={subjects} setSubjects={setSubjects} onSelect={onSelect} />
      <CalendarPanel/>
      <AuthTests></AuthTests>
    </div>    
  );
}

export default SubjectList;
