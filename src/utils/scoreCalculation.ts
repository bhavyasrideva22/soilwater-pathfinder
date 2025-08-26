import { AssessmentResponse } from "@/components/AssessmentFlow";

export interface ScoreBreakdown {
  overallScore: number;
  psychometricScore: number;
  technicalScore: number;
  
  // Psychometric sub-scores
  interestScore: number;
  personalityScore: number;
  motivationScore: number;
  
  // Technical sub-scores
  aptitudeScore: number;
  domainScore: number;
  prerequisiteScore: number;
  
  // WISCAR scores
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    reality: number;
  };
}

export const calculateScores = (responses: AssessmentResponse[]): ScoreBreakdown => {
  // Helper function to get responses by subcategory
  const getResponsesBySubcategory = (subcategory: string) => {
    return responses.filter(r => r.subcategory === subcategory);
  };

  // Helper function to calculate average score from responses
  const calculateAverage = (responses: AssessmentResponse[], maxScale: number = 7) => {
    if (responses.length === 0) return 0;
    
    const total = responses.reduce((sum, response) => {
      let score = 0;
      
      if (typeof response.answer === 'number') {
        score = response.answer;
      } else if (response.answer === 'true') {
        score = maxScale;
      } else if (response.answer === 'false') {
        score = 1;
      } else {
        // For multiple choice, we need to map to scores
        score = mapMultipleChoiceToScore(response);
      }
      
      return sum + score;
    }, 0);
    
    const average = total / responses.length;
    return Math.round((average / maxScale) * 100);
  };

  // Map multiple choice answers to numerical scores
  const mapMultipleChoiceToScore = (response: AssessmentResponse): number => {
    const { questionId, answer } = response;
    
    // Domain knowledge questions (correct answers get full score)
    const correctAnswers: { [key: string]: string } = {
      'aptitude_1': '7.0',
      'aptitude_2': '26',
      'aptitude_3': 'Recommend',
      'aptitude_4': '40%',
      'domain_1': 'Acidity or alkalinity levels',
      'domain_2': 'Dissolved oxygen levels', 
      'domain_3': 'Universal Soil Loss Equation (USLE)',
      'domain_4': '10 mg/L',
      'domain_5': 'Buffer strips along waterways'
    };

    if (correctAnswers[questionId]) {
      return answer === correctAnswers[questionId] ? 7 : 2;
    }

    // For other multiple choice questions, map based on position and context
    if (questionId === 'motivation_1') {
      const motivationScores: { [key: string]: number } = {
        'Passion for protecting the environment': 7,
        'Opportunity to make a measurable impact': 6,
        'Combination of outdoor and analytical work': 6,
        'Interest in scientific analysis and data': 5,
        'Career stability and growth prospects': 4
      };
      return motivationScores[answer as string] || 4;
    }

    if (questionId === 'personality_1') {
      const logicalScores: { [key: string]: number } = {
        'Strongly prefer logical, systematic approaches': 7,
        'Prefer logical approaches with some creativity': 6,
        'Balanced approach using both methods': 5,
        'Prefer creative approaches with some structure': 4,
        'Strongly prefer creative, innovative approaches': 3
      };
      return logicalScores[answer as string] || 4;
    }

    if (questionId === 'personality_3') {
      const pressureScores: { [key: string]: number } = {
        'I work methodically and stick to established procedures': 7,
        'I prioritize tasks and focus on the most critical items': 6,
        'I work best under pressure and become more focused': 5,
        'I seek help or guidance when needed': 4,
        'I tend to feel overwhelmed and may make mistakes': 2
      };
      return pressureScores[answer as string] || 4;
    }

    if (questionId === 'personality_4') {
      const teamScores: { [key: string]: number } = {
        'Enjoy both equally depending on the task': 7,
        'Prefer independent work with occasional collaboration': 6,
        'Prefer team work with some independent tasks': 5,
        'Strongly prefer working independently': 4,
        'Strongly prefer collaborative team environments': 4
      };
      return teamScores[answer as string] || 4;
    }

    return 4; // Default middle score
  };

  // Calculate individual sub-scores
  const interestScore = calculateAverage(getResponsesBySubcategory('interest'));
  const motivationScore = calculateAverage(getResponsesBySubcategory('motivation'));
  const personalityScore = calculateAverage([
    ...getResponsesBySubcategory('cognitive_style'),
    ...getResponsesBySubcategory('stress_management'),
    ...getResponsesBySubcategory('work_preference')
  ]);
  
  const aptitudeScore = calculateAverage([
    ...getResponsesBySubcategory('numerical'),
    ...getResponsesBySubcategory('logical')
  ]);
  
  const domainScore = calculateAverage([
    ...getResponsesBySubcategory('soil_knowledge'),
    ...getResponsesBySubcategory('water_knowledge'),
    ...getResponsesBySubcategory('assessment_methods'),
    ...getResponsesBySubcategory('regulations'),
    ...getResponsesBySubcategory('conservation_practices')
  ]);

  // WISCAR scores
  const wiscarScores = {
    will: calculateAverage(getResponsesBySubcategory('will')),
    interest: interestScore, // Reuse calculated interest score
    skill: calculateAverage(getResponsesBySubcategory('skill')),
    cognitive: calculateAverage(getResponsesBySubcategory('cognitive')),
    ability: calculateAverage(getResponsesBySubcategory('ability')),
    reality: calculateAverage(getResponsesBySubcategory('reality'))
  };

  // Calculate composite scores
  const psychometricScore = Math.round((interestScore + personalityScore + motivationScore) / 3);
  const technicalScore = Math.round((aptitudeScore + domainScore) / 2);
  const prerequisiteScore = Math.round((aptitudeScore + wiscarScores.skill) / 2);

  // Calculate overall score with weighted components
  const overallScore = Math.round(
    (psychometricScore * 0.4) + 
    (technicalScore * 0.35) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.25)
  );

  return {
    overallScore,
    psychometricScore,
    technicalScore,
    interestScore,
    personalityScore,
    motivationScore,
    aptitudeScore,
    domainScore,
    prerequisiteScore,
    wiscarScores
  };
};