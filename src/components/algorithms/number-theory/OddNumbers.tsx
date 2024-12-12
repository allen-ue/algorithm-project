// src/components/algorithms/number-theory/OddNumbers.tsx
'use client';

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const OddNumbers: React.FC = () => {
  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const oddIndices = new Set<number>();

    for (let i = 0; i < array.length; i++) {
      const num = array[i];
      
      // Check current number
      steps.push({
        type: 'comparison',
        indices: [i],
        description: `Checking ${num}`
      });

      if (num % 2 !== 0) {
        oddIndices.add(i);
        steps.push({
          type: 'final',
          indices: Array.from(oddIndices),
          description: `${num} is odd`
        });
      } else {
        steps.push({
          type: 'comparison',
          indices: [i],
          description: `${num} is even`
        });
      }
    }

    // Final step - highlight all odd numbers
    if (oddIndices.size > 0) {
      steps.push({
        type: 'final',
        indices: Array.from(oddIndices),
        description: `Found ${oddIndices.size} odd number${oddIndices.size === 1 ? '' : 's'}!`
      });
    } else {
      steps.push({
        type: 'final',
        indices: [],
        description: 'No odd numbers found in the sequence!'
      });
    }

    return steps;
  };

  return (
    <BaseAlgorithm
      title="Odd Numbers"
      description="Identifies odd numbers in a sequence."
      generateSteps={generateSteps}
      initialArray={[1, 4, 7, 2, 9, 6, 5, 8, 3]}
    />
  );
};

export default OddNumbers;