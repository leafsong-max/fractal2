export type EducationLevel = 'elementary' | 'middle';

export type ThemeColor = 'indigo' | 'emerald' | 'amber' | 'violet';

export interface Point {
  x: number;
  y: number;
}

export interface Triangle {
  p1: Point;
  p2: Point;
  p3: Point;
  depth: number;
  id: string;
}

export interface StepExplanation {
  depth: number;
  elementary: {
    title: string;
    subTitle: string;
    description: string;
    countText: string;
    triangleCountText: string;
    perimeterText: string;
    areaText: string;
    analogy: string;
    badge: string;
  };
  middle: {
    title: string;
    subTitle: string;
    description: string;
    triangleCountFormula: string;
    triangleCountFormulaLatex?: string;
    triangleCountVal: number;
    sideLengthFormula: string;
    sideLengthFormulaLatex?: string;
    sideLengthVal: number;
    areaFormula: string;
    areaFormulaLatex?: string;
    areaValPercent: string;
    perimeterFormula: string;
    perimeterFormulaLatex?: string;
    perimeterVal: number;
    mathInsight: string;
  };
}

export interface NatureFractal {
  id: string;
  name: string;
  koreanName: string;
  descriptionElementary: string;
  descriptionMiddle: string;
  iconName: string;
  accentColor: string;
  fact: string;
  imageUrl: string;
  imageSource: string;
  propertyTitle: string;
  propertyDesc: string;
}

export interface QuizQuestion {
  id: number;
  level: EducationLevel;
  category: 'fractal' | 'sierpinski';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export type RouletteReward = '3장 도움' | '4장 도움' | '5장 도움' | '6장 도움';

export interface RouletteOption {
  id: RouletteReward;
  label: string;
  elementaryProb: number; // 0.05, 0.10, 0.50, 0.35
  middleProb: number;     // 0.20, 0.30, 0.30, 0.20
  color: string;
  textColor: string;
  accentBg: string;
  description: string;
}

