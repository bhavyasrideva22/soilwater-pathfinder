import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assessmentQuestions } from "@/data/assessmentQuestions";
import { AssessmentResults } from "./AssessmentResults";

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  category: string;
  subcategory: string;
}

interface AssessmentFlowProps {
  onBack: () => void;
}

export const AssessmentFlow = ({ onBack }: AssessmentFlowProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const sections = assessmentQuestions;
  const currentSectionData = sections[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];
  
  const totalQuestions = sections.reduce((total, section) => total + section.questions.length, 0);
  const completedQuestions = responses.length;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  const handleAnswer = (answer: string | number) => {
    const response: AssessmentResponse = {
      questionId: currentQuestionData.id,
      answer,
      category: currentSectionData.category,
      subcategory: currentQuestionData.subcategory
    };

    setResponses(prev => {
      const existing = prev.findIndex(r => r.questionId === currentQuestionData.id);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = response;
        return updated;
      }
      return [...prev, response];
    });
  };

  const getCurrentAnswer = () => {
    const existing = responses.find(r => r.questionId === currentQuestionData.id);
    return existing?.answer;
  };

  const canProceed = () => {
    return getCurrentAnswer() !== undefined;
  };

  const nextQuestion = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  if (showResults) {
    return <AssessmentResults responses={responses} onRestart={() => {
      setCurrentSection(0);
      setCurrentQuestion(0);
      setResponses([]);
      setShowResults(false);
    }} />;
  }

  if (!currentQuestionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Overview
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {completedQuestions + 1} of {totalQuestions}
            </div>
          </div>
          <Progress value={progressPercentage} className="mb-4" />
          <h2 className="text-2xl font-semibold text-primary">
            {currentSectionData.title}
          </h2>
          <p className="text-muted-foreground">
            {currentSectionData.description}
          </p>
        </div>

        {/* Question */}
        <Card className="p-8 shadow-soft border-0 bg-gradient-to-br from-card to-card/50 mb-8">
          <h3 className="text-xl font-medium mb-6 text-foreground">
            {currentQuestionData.question}
          </h3>

          {currentQuestionData.type === 'multiple_choice' && (
            <RadioGroup
              value={getCurrentAnswer()?.toString() || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQuestionData.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestionData.type === 'scale' && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Strongly Disagree</span>
                <span>Neutral</span>
                <span>Strongly Agree</span>
              </div>
              <RadioGroup
                value={getCurrentAnswer()?.toString() || ""}
                onValueChange={(value) => handleAnswer(parseInt(value))}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value={value.toString()} id={`scale-${value}`} />
                    <Label htmlFor={`scale-${value}`} className="text-xs cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentQuestionData.type === 'boolean' && (
            <RadioGroup
              value={getCurrentAnswer()?.toString() || ""}
              onValueChange={handleAnswer}
              className="flex gap-8"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentSection === 0 && currentQuestion === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!canProceed()}
            className="gap-2"
          >
            {currentSection === sections.length - 1 && currentQuestion === currentSectionData.questions.length - 1 
              ? "View Results" 
              : "Next"
            }
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};