import { useState } from "react";
import { AssessmentLanding } from "@/components/AssessmentLanding";
import { AssessmentFlow } from "@/components/AssessmentFlow";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <>
      {!showAssessment ? (
        <AssessmentLanding onStartAssessment={() => setShowAssessment(true)} />
      ) : (
        <AssessmentFlow onBack={() => setShowAssessment(false)} />
      )}
    </>
  );
};

export default Index;