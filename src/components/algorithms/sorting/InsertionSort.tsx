// src/components/algorithms/sorting/InsertionSort.tsx
'use client';

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const InsertionSort: React.FC = () => {
  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const sortedIndices = new Set<number>();
    
    // First element is already sorted
    sortedIndices.add(0);
    steps.push({
      type: 'final',
      indices: [0],
      description: `First element ${array[0]} is already sorted`
    });

    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      
      steps.push({
        type: 'comparison',
        indices: [i],
        description: `Selecting ${key} to insert into sorted portion`
      });
      
      while (j >= 0 && array[j] > key) {
        // Add comparison step
        steps.push({
          type: 'comparison',
          indices: [j, j + 1],
          description: `Comparing ${array[j]} with ${key}`
        });
        
        // Add swap step
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          description: `Moving ${array[j]} one position ahead`
        });
        
        array[j + 1] = array[j];
        j = j - 1;
      }
      
      array[j + 1] = key;
      sortedIndices.add(i);
      
      // Show sorted portion
      steps.push({
        type: 'final',
        indices: Array.from(sortedIndices),
        description: `Inserted ${key} into its correct position`
      });
    }

    // Add final completion step
    steps.push({
      type: 'final',
      indices: Array.from({ length: array.length }, (_, i) => i),
      description: 'Insertion Sort Complete!'
    });
    
    return steps;
  };

  return (
    <BaseAlgorithm
      title="Insertion Sort"
      description="Builds the final sorted array one item at a time, by repeatedly inserting a new element into a sorted portion of the array."
      generateSteps={generateSteps}
    />
  );
};

export default InsertionSort;