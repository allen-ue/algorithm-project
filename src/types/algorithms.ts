// src/types/algorithms.ts

// src/types/algorithms.ts
export interface AlgorithmStep {
  type: 'comparison' | 'swap' | 'final' | 'update';
  indices: number[];
  description: string;
  updates?: {index: number, value: number}[];
}

export interface AlgorithmState {
  array: number[];
  currentStep: number;
  steps: AlgorithmStep[];
  isPlaying: boolean;
  speed: number;
}

export interface AlgorithmVisualizerProps {
  initialArray?: number[];
  onComplete?: () => void;
  speed?: number;
}