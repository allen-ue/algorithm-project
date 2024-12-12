// src/components/algorithms/sorting/SelectionSort.tsx
'use client';

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const SelectionSort: React.FC = () => {
  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const sortedIndices = new Set<number>();

    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;

      // Start looking for minimum
      steps.push({
        type: 'comparison',
        indices: [i],
        description: `Finding minimum element from position ${i}`
      });

      for (let j = i + 1; j < array.length; j++) {
        // Compare with current minimum
        steps.push({
          type: 'comparison',
          indices: [minIdx, j],
          description: `Comparing minimum (${array[minIdx]}) with ${array[j]}`
        });

        if (array[j] < array[minIdx]) {
          minIdx = j;
          steps.push({
            type: 'comparison',
            indices: [j],
            description: `Found new minimum: ${array[j]}`
          });
        }
      }

      if (minIdx !== i) {
        // Swap step
        steps.push({
          type: 'swap',
          indices: [i, minIdx],
          description: `Swapping ${array[i]} with minimum ${array[minIdx]}`
        });
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }

      // Add to sorted portion
      sortedIndices.add(i);
      steps.push({
        type: 'final',
        indices: Array.from(sortedIndices),
        description: `${array[i]} is now in its final position`
      });
    }

    // Add last element to sorted portion
    sortedIndices.add(array.length - 1);
    
    // Add final completion step
    steps.push({
      type: 'final',
      indices: Array.from(sortedIndices),
      description: 'Selection Sort Complete!'
    });

    return steps;
  };

  return (
    <BaseAlgorithm
      title="Selection Sort"
      description="Repeatedly selects the minimum element from the unsorted portion and places it at the beginning."
      generateSteps={generateSteps}
    />
  );
};

export default SelectionSort;