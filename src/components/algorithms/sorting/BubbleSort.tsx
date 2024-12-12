// src/components/algorithms/sorting/BubbleSort.tsx
'use client';

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const BubbleSort: React.FC = () => {
  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const sortedIndices = new Set<number>();
    
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        // Add comparison step
        steps.push({
          type: 'comparison',
          indices: [j, j + 1],
          description: `Comparing ${array[j]} and ${array[j + 1]}`
        });
        
        if (array[j] > array[j + 1]) {
          // Add swap step
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
            description: `Swapping ${array[j]} and ${array[j + 1]}`
          });
          
          // Perform swap
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
      
      // Add current index to sorted set
      sortedIndices.add(array.length - i - 1);
      
      // Mark the last element in this pass as final
      steps.push({
        type: 'final',
        indices: Array.from(sortedIndices),
        description: `Element ${array[array.length - i - 1]} is in its final position`
      });
    }

    // Add final step to show completion
    steps.push({
      type: 'final',
      indices: Array.from({ length: array.length }, (_, i) => i),
      description: 'Bubble Sort Complete!'
    });
    
    return steps;
  };

  return (
    <BaseAlgorithm
      title="Bubble Sort"
      description="Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
      generateSteps={generateSteps}
    />
  );
};

export default BubbleSort;