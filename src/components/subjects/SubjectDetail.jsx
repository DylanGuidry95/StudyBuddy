import SubjectSidebar from "./SubjectSidebar";
import GuideEditor from "../guides/GuideEditor";
import { useGuides } from "../../hooks/useGuides";

function SubjectDetail({ subject, onBack, updateSubject }) {
  const guideApi = useGuides(subject, updateSubject);

  return (
    <div className="subject-layout">
      <SubjectSidebar
        subject={subject}
        onBack={onBack}
        guideApi={guideApi}
      />

      <div className="editor">
        {guideApi.activeGuide ? (
          <GuideEditor
            guide={guideApi.activeGuide}
            updateGuide={guideApi.updateActiveGuide}
          />
        ) : (
          <p>Select or create a study guide</p>
        )}
      </div>
    </div>
  );
}

export default SubjectDetail;
