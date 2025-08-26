export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scale' | 'boolean';
  options?: string[];
  subcategory: string;
}

export interface AssessmentSection {
  category: string;
  title: string;
  description: string;
  questions: Question[];
}

export const assessmentQuestions: AssessmentSection[] = [
  {
    category: "psychometric",
    title: "Interest & Motivation Assessment",
    description: "Understanding your interest in environmental conservation and related activities.",
    questions: [
      {
        id: "interest_1",
        question: "How interested are you in environmental conservation and sustainability?",
        type: "scale",
        subcategory: "interest"
      },
      {
        id: "interest_2", 
        question: "How do you feel about working outdoors and collecting field data?",
        type: "scale",
        subcategory: "interest"
      },
      {
        id: "interest_3",
        question: "Would you prefer working in a structured, regulated environment with clear procedures?",
        type: "scale",
        subcategory: "interest"
      },
      {
        id: "motivation_1",
        question: "What primarily motivates your interest in environmental work?",
        type: "multiple_choice",
        options: [
          "Passion for protecting the environment",
          "Career stability and growth prospects", 
          "Opportunity to make a measurable impact",
          "Interest in scientific analysis and data",
          "Combination of outdoor and analytical work"
        ],
        subcategory: "motivation"
      },
      {
        id: "motivation_2",
        question: "How important is it for you to see direct, tangible results from your work?",
        type: "scale",
        subcategory: "motivation"
      }
    ]
  },
  {
    category: "psychometric",
    title: "Personality & Working Style",
    description: "Evaluating your personality traits and preferred working methods.",
    questions: [
      {
        id: "personality_1",
        question: "When solving problems, do you prefer logical, step-by-step analysis or creative, innovative approaches?",
        type: "multiple_choice",
        options: [
          "Strongly prefer logical, systematic approaches",
          "Prefer logical approaches with some creativity",
          "Balanced approach using both methods",
          "Prefer creative approaches with some structure", 
          "Strongly prefer creative, innovative approaches"
        ],
        subcategory: "cognitive_style"
      },
      {
        id: "personality_2",
        question: "Do you find satisfaction in following well-defined processes and procedures?",
        type: "scale",
        subcategory: "cognitive_style"
      },
      {
        id: "personality_3",
        question: "How do you typically react when working under pressure or tight deadlines?",
        type: "multiple_choice",
        options: [
          "I work methodically and stick to established procedures",
          "I prioritize tasks and focus on the most critical items",
          "I seek help or guidance when needed",
          "I tend to feel overwhelmed and may make mistakes",
          "I work best under pressure and become more focused"
        ],
        subcategory: "stress_management"
      },
      {
        id: "personality_4",
        question: "Do you prefer working independently or as part of a team?",
        type: "multiple_choice",
        options: [
          "Strongly prefer working independently",
          "Prefer independent work with occasional collaboration",
          "Enjoy both equally depending on the task",
          "Prefer team work with some independent tasks",
          "Strongly prefer collaborative team environments"
        ],
        subcategory: "work_preference"
      }
    ]
  },
  {
    category: "technical",
    title: "General Aptitude Assessment", 
    description: "Testing your logical reasoning and numerical abilities.",
    questions: [
      {
        id: "aptitude_1",
        question: "A soil sample shows pH levels of 6.8, 7.2, 6.9, and 7.1. What is the average pH?",
        type: "multiple_choice",
        options: ["6.95", "7.0", "7.05", "7.1", "6.9"],
        subcategory: "numerical"
      },
      {
        id: "aptitude_2",
        question: "If water quality testing requires samples every 100 meters along a 2.5 km stream, how many samples are needed?",
        type: "multiple_choice", 
        options: ["24", "25", "26", "27", "30"],
        subcategory: "numerical"
      },
      {
        id: "aptitude_3",
        question: "Which sequence logically completes this pattern: Monitor → Analyze → Report → ?",
        type: "multiple_choice",
        options: ["Review", "Recommend", "Repeat", "Record", "Respond"],
        subcategory: "logical"
      },
      {
        id: "aptitude_4",
        question: "A farm's soil erosion rate decreased from 15 tons/acre/year to 9 tons/acre/year. What percentage reduction is this?",
        type: "multiple_choice",
        options: ["30%", "40%", "50%", "60%", "33%"],
        subcategory: "numerical"
      }
    ]
  },
  {
    category: "technical",
    title: "Domain Knowledge Assessment",
    description: "Testing your understanding of soil and water conservation concepts.",
    questions: [
      {
        id: "domain_1",
        question: "What does pH measure in soil?",
        type: "multiple_choice",
        options: [
          "Acidity or alkalinity levels",
          "Nutrient content",
          "Moisture levels", 
          "Organic matter percentage",
          "Soil temperature"
        ],
        subcategory: "soil_knowledge"
      },
      {
        id: "domain_2",
        question: "Which of the following is a key parameter in assessing water quality?",
        type: "multiple_choice",
        options: [
          "Dissolved oxygen levels",
          "Water temperature only",
          "Visual clarity",
          "Flow rate",
          "Container material"
        ],
        subcategory: "water_knowledge"
      },
      {
        id: "domain_3",
        question: "What is a common method to assess soil erosion risk?",
        type: "multiple_choice",
        options: [
          "Universal Soil Loss Equation (USLE)",
          "pH testing only",
          "Visual inspection",
          "Weather forecasting",
          "Plant growth measurement"
        ],
        subcategory: "assessment_methods"
      },
      {
        id: "domain_4",
        question: "What is the maximum allowable nitrate concentration in drinking water according to EPA standards?",
        type: "multiple_choice",
        options: ["10 mg/L", "5 mg/L", "15 mg/L", "20 mg/L", "25 mg/L"],
        subcategory: "regulations"
      },
      {
        id: "domain_5",
        question: "Which practice is most effective for preventing agricultural runoff?",
        type: "multiple_choice",
        options: [
          "Buffer strips along waterways",
          "Increased fertilizer application",
          "Daily soil testing",
          "Removing all vegetation",
          "Constant irrigation"
        ],
        subcategory: "conservation_practices"
      }
    ]
  },
  {
    category: "wiscar", 
    title: "WISCAR Framework - Will & Consistency",
    description: "Assessing your commitment and consistency of interest over time.",
    questions: [
      {
        id: "will_1",
        question: "Have you maintained interest in environmental conservation for an extended period (6+ months)?",
        type: "boolean",
        subcategory: "will"
      },
      {
        id: "will_2",
        question: "How consistent has your interest in environmental topics been over time?",
        type: "scale", 
        subcategory: "will"
      },
      {
        id: "skill_1",
        question: "How would you rate your current knowledge of environmental science principles?", 
        type: "scale",
        subcategory: "skill"
      },
      {
        id: "skill_2",
        question: "Do you have experience with data collection or analysis tools (Excel, statistical software)?",
        type: "boolean",
        subcategory: "skill"
      }
    ]
  },
  {
    category: "wiscar",
    title: "WISCAR Framework - Learning & Alignment", 
    description: "Evaluating your learning capacity and real-world job alignment.",
    questions: [
      {
        id: "cognitive_1",
        question: "How comfortable are you with approaching complex environmental problems systematically?",
        type: "scale",
        subcategory: "cognitive"
      },
      {
        id: "cognitive_2", 
        question: "Do you prefer making decisions based on data and evidence rather than intuition?",
        type: "scale",
        subcategory: "cognitive"
      },
      {
        id: "ability_1",
        question: "How open are you to receiving feedback on your analysis and recommendations?",
        type: "scale",
        subcategory: "ability"
      },
      {
        id: "ability_2",
        question: "How well can you identify your own knowledge gaps and learning needs?",
        type: "scale", 
        subcategory: "ability"
      },
      {
        id: "reality_1",
        question: "Are you comfortable with the practical aspects of the role (site visits, client reporting, regulatory compliance)?",
        type: "scale",
        subcategory: "reality"
      },
      {
        id: "reality_2",
        question: "How aligned do you feel this career is with real-world environmental challenges you care about?",
        type: "scale",
        subcategory: "reality"
      }
    ]
  }
];