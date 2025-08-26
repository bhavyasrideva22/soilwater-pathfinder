import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/assessment-hero.jpg";

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

export const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="Soil and Water Auditing Assessment"
              className="w-full max-w-4xl mx-auto rounded-xl shadow-elevation"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Soil & Water Auditor Career Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover if environmental auditing is the right career path for you. 
            Our comprehensive assessment evaluates your fit across multiple dimensions.
          </p>
        </div>

        {/* Assessment Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 shadow-soft border-0 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-2xl font-semibold mb-4 text-primary">What You'll Discover</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Your psychological fit for environmental auditing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Technical readiness and skill gaps</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Career alignment and learning potential</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Personalized learning recommendations</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-soft border-0 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Assessment Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium">Duration: 20-25 minutes</div>
                  <div className="text-sm text-muted-foreground">Comprehensive yet efficient</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium">Multi-dimensional Analysis</div>
                  <div className="text-sm text-muted-foreground">Psychometric + Technical + WISCAR</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium">Actionable Results</div>
                  <div className="text-sm text-muted-foreground">Clear next steps and learning paths</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Career Overview */}
        <Card className="p-8 mb-12 shadow-soft border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-2xl font-semibold mb-4 text-primary">About Soil & Water Auditing</h2>
          <p className="text-muted-foreground mb-6">
            Soil & Water Auditors play a crucial role in environmental conservation, assessing and managing 
            practices related to soil health, water conservation, and agricultural sustainability. They gather 
            data on soil and water quality, analyze environmental impact, and provide recommendations for improvements.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Typical Careers</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Environmental Consultant</li>
                <li>• Agricultural Sustainability Officer</li>
                <li>• Water Resources Manager</li>
                <li>• Environmental Compliance Officer</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Key Skills</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Analytical thinking</li>
                <li>• Environmental science knowledge</li>
                <li>• Data analysis & interpretation</li>
                <li>• Technical equipment proficiency</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Work Environment</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Field work & data collection</li>
                <li>• Laboratory analysis</li>
                <li>• Client consultation</li>
                <li>• Regulatory compliance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-elevation transition-all duration-300"
          >
            Start Your Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No registration required • Instant results • Completely confidential
          </p>
        </div>
      </div>
    </div>
  );
};