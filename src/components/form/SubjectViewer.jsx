import { useState } from "react";
import { useSubjects } from "../../hooks/useSubjects";

function SubjectViewer({ subjects, setSubjects, onSelect }) {  
  const {    
    deleteSubject,
    groupedSubjects,
    sortedGroups,
    openGroups,
    toggleGroup,
    searchTerm,
    setSearchTerm,
  } = useSubjects(subjects, setSubjects);

    return (
        <div>
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

                  <button 
                    type="button"
                    onClick={() => onSelect(subject)}>
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
      } )}
        </div>
    );
}

export default SubjectViewer;