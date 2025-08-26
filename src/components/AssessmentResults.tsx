import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssessmentResponse } from "./AssessmentFlow";
import { calculateScores } from "@/utils/scoreCalculation";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Target, 
  BookOpen, 
  Users, 
  Lightbulb,
  CheckCircle,
  AlertCircle,
  RotateCcw
} from "lucide-react";

interface AssessmentResultsProps {
  responses: AssessmentResponse[];
  onRestart: () => void;
}

export const AssessmentResults = ({ responses, onRestart }: AssessmentResultsProps) => {
  const scores = calculateScores(responses);

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <TrendingUp className="w-5 h-5 text-success" />;
    if (score >= 60) return <Minus className="w-5 h-5 text-warning" />;
    return <TrendingDown className="w-5 h-5 text-destructive" />;
  };

  const getRecommendation = () => {
    const overallScore = scores.overallScore;
    if (overallScore >= 75) {
      return {
        title: "Highly Recommended",
        description: "You show excellent potential for a career in Soil & Water Auditing. Your psychological profile, technical aptitude, and learning readiness align well with this field.",
        icon: <CheckCircle className="w-6 h-6 text-success" />,
        color: "border-success/20 bg-success/5"
      };
    } else if (overallScore >= 60) {
      return {
        title: "Potentially Suitable",
        description: "You have good potential for this field with some areas for development. Focus on strengthening your weaker areas while building on your strengths.",
        icon: <AlertCircle className="w-6 h-6 text-warning" />,
        color: "border-warning/20 bg-warning/5"
      };
    } else {
      return {
        title: "Consider Alternatives",
        description: "Based on your current profile, you might want to explore related fields or focus on significant skill development before pursuing this career path.",
        icon: <AlertCircle className="w-6 h-6 text-destructive" />,
        color: "border-destructive/20 bg-destructive/5"
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your fit for Soil & Water Auditing
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`p-8 mb-8 shadow-soft border ${recommendation.color}`}>
          <div className="flex items-start gap-4">
            {recommendation.icon}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{recommendation.title}</h2>
              <p className="text-muted-foreground text-lg">{recommendation.description}</p>
              <div className="mt-4 p-4 bg-background/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Overall Compatibility Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(scores.overallScore)}`}>
                    {scores.overallScore}/100
                  </span>
                </div>
                <Progress value={scores.overallScore} className="h-3" />
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Psychometric Analysis */}
          <Card className="p-6 shadow-soft border-0 bg-gradient-to-br from-card to-card/50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Psychometric Fit</h3>
              {getScoreIcon(scores.psychometricScore)}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Interest Level</span>
                <span className={getScoreColor(scores.interestScore)}>{scores.interestScore}/100</span>
              </div>
              <Progress value={scores.interestScore} className="h-2" />
              
              <div className="flex justify-between">
                <span>Personality Compatibility</span>
                <span className={getScoreColor(scores.personalityScore)}>{scores.personalityScore}/100</span>
              </div>
              <Progress value={scores.personalityScore} className="h-2" />
              
              <div className="flex justify-between">
                <span>Motivation Alignment</span>
                <span className={getScoreColor(scores.motivationScore)}>{scores.motivationScore}/100</span>
              </div>
              <Progress value={scores.motivationScore} className="h-2" />
            </div>
          </Card>

          {/* Technical Readiness */}
          <Card className="p-6 shadow-soft border-0 bg-gradient-to-br from-card to-card/50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Technical Readiness</h3>
              {getScoreIcon(scores.technicalScore)}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>General Aptitude</span>
                <span className={getScoreColor(scores.aptitudeScore)}>{scores.aptitudeScore}/100</span>
              </div>
              <Progress value={scores.aptitudeScore} className="h-2" />
              
              <div className="flex justify-between">
                <span>Domain Knowledge</span>
                <span className={getScoreColor(scores.domainScore)}>{scores.domainScore}/100</span>
              </div>
              <Progress value={scores.domainScore} className="h-2" />
              
              <div className="flex justify-between">
                <span>Prerequisites</span>
                <span className={getScoreColor(scores.prerequisiteScore)}>{scores.prerequisiteScore}/100</span>
              </div>
              <Progress value={scores.prerequisiteScore} className="h-2" />
            </div>
          </Card>
        </div>

        {/* WISCAR Analysis */}
        <Card className="p-8 mb-8 shadow-soft border-0 bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-semibold">WISCAR Framework Analysis</h3>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(scores.wiscarScores).map(([key, score]) => (
              <div key={key} className="text-center p-4 bg-background/50 rounded-lg">
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-sm text-muted-foreground capitalize">{key}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Path */}
        <Card className="p-8 mb-8 shadow-soft border-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-semibold">Recommended Learning Path</h3>
          </div>
          
          {scores.overallScore >= 60 ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Immediate Next Steps:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Study fundamentals of soil chemistry and water conservation</li>
                  <li>• Familiarize yourself with environmental regulations and compliance</li>
                  <li>• Practice data collection and analysis techniques</li>
                  <li>• Learn to use soil and water testing equipment</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-lg">Recommended Courses:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Environmental Science Fundamentals</li>
                  <li>• Soil Health Assessment Techniques</li>
                  <li>• Water Quality Management</li>
                  <li>• Environmental Data Analysis with R/Excel</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-lg">Career Development:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Seek internships with environmental consulting firms</li>
                  <li>• Join professional organizations (e.g., Soil and Water Conservation Society)</li>
                  <li>• Attend environmental compliance workshops</li>
                  <li>• Consider certification in environmental auditing</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Consider exploring these related fields that might be a better fit:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Environmental Science</h4>
                  <p className="text-sm text-muted-foreground">Broader environmental research and analysis</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Agricultural Technology</h4>
                  <p className="text-sm text-muted-foreground">Technology-focused agricultural solutions</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Sustainability Consulting</h4>
                  <p className="text-sm text-muted-foreground">Broader sustainability strategy and implementation</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold mb-2">GIS & Remote Sensing</h4>
                  <p className="text-sm text-muted-foreground">Geographic information systems for environmental monitoring</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="text-center">
          <Button onClick={onRestart} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};