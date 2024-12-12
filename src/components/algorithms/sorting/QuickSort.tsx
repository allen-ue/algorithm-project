'use client';

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const QuickSort: React.FC = () => {
  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const sortedIndices = new Set<number>();

    const getPivotIndex = (low: number, high: number): number => {
      const length = high - low + 1;
      return low + Math.floor(length / 2);
    };

    const partition = (low: number, high: number): number => {
      const pivotIndex = getPivotIndex(low, high);
      const pivot = array[pivotIndex];
      
      steps.push({
        type: 'comparison',
        indices: [pivotIndex],
        description: `Selected ${pivot} as pivot (middle element)`
      });

      // Create temporary arrays for partitioning
      const left: number[] = [];
      const right: number[] = [];

      // Collect elements for left and right partitions
      for (let i = low; i <= high; i++) {
        if (i !== pivotIndex) {
          steps.push({
            type: 'comparison',
            indices: [i, pivotIndex],
            description: `Comparing ${array[i]} with pivot ${pivot}`
          });

          if (array[i] <= pivot) {
            left.push(array[i]);
          } else {
            right.push(array[i]);
          }
        }
      }

      // Calculate new pivot position and update array
      const newPivotIndex = low + left.length;
      const updates: {index: number, value: number}[] = [];
      let k = low;

      // Update left partition
      for (const num of left) {
        updates.push({index: k, value: num});
        array[k] = num;
        k++;
      }

      // Update pivot position
      updates.push({index: k, value: pivot});
      array[k] = pivot;
      k++;

      // Update right partition
      for (const num of right) {
        updates.push({index: k, value: num});
        array[k] = num;
        k++;
      }

      // Push the bulk update step
      steps.push({
        type: 'update',
        updates,
        indices: updates.map(u => u.index),
        description: 'Partitioning elements around pivot'
      });

      sortedIndices.add(newPivotIndex);
      steps.push({
        type: 'final',
        indices: Array.from(sortedIndices),
        description: `Pivot ${pivot} is now in its correct position`
      });

      return newPivotIndex;
    };

    const quickSort = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        if (low < pi - 1) {
          quickSort(low, pi - 1);
        }
        if (pi + 1 < high) {
          quickSort(pi + 1, high);
        }
      } else if (low === high) {
        sortedIndices.add(low);
        steps.push({
          type: 'final',
          indices: Array.from(sortedIndices),
          description: `Element ${array[low]} is in position`
        });
      }
    };

    quickSort(0, array.length - 1);

    steps.push({
      type: 'final',
      indices: Array.from({ length: array.length }, (_, i) => i),
      description: 'Quick Sort Complete!'
    });

    return steps;
  };

  return (
    <BaseAlgorithm
      title="Quick Sort"
      description="A divide-and-conquer algorithm that selects a pivot element and partitions the array around it, recursively sorting the sub-arrays."
      generateSteps={generateSteps}
      algorithmType="quickSort"
    />
  );
};

export default QuickSort;