
export interface BusinessMetric {
  label: string;
  score: number;
  description: string;
}

export interface AnalysisResponse {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  marketFit: string;
  feasibilityScore: number;
  economicReality: string;
  techSolutions: {
    title: string;
    description: string;
  }[];
  categoryContext: string;
}

export interface AnalysisRecord {
  id: string;
  timestamp: number;
  idea: string;
  category: string;
  analysis: AnalysisResponse;
}
