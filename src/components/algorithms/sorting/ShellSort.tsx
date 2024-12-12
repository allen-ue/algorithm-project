// src/components/algorithms/sorting/ShellSort.tsx

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const ShellSort: React.FC = () => {
  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const n = array.length;
    
    // Generate gaps using the sequence h = n/2, n/4, n/8, ..., 1
    const gaps: number[] = [];
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
      gaps.push(gap);
    }
    
    for (let gap of gaps) {
      steps.push({
        type: 'select',
        indices: [],
        description: `Starting pass with gap of ${gap}`
      });
      
      for (let i = gap; i < n; i++) {
        const temp = array[i];
        let j = i;
        
        steps.push({
          type: 'select',
          indices: [i],
          description: `Selected ${temp} to compare with elements at gap ${gap}`
        });
        
        while (j >= gap && array[j - gap] > temp) {
          steps.push({
            type: 'comparison',
            indices: [j - gap, j],
            description: `Comparing ${array[j - gap]} with ${temp}`
          });
          
          steps.push({
            type: 'swap',
            indices: [j - gap, j],
            description: `Moving ${array[j - gap]} forward by gap ${gap}`
          });
          
          array[j] = array[j - gap];
          j -= gap;
        }
        
        array[j] = temp;
        steps.push({
          type: 'final',
          indices: [j],
          description: `Placed ${temp} at position ${j}`
        });
      }
    }
    
    // Mark completion
    steps.push({
      type: 'final',
      indices: Array.from({length: n}, (_, i) => i),
      description: 'Shell Sort Complete!'
    });
    
    return steps;
  };

  return (
    <BaseAlgorithm
      title="Shell Sort"
      description="An optimization of insertion sort that allows the exchange of items that are far apart, progressively reducing the gap between elements to be compared."
      generateSteps={generateSteps}
    />
  );
};

export default ShellSort;