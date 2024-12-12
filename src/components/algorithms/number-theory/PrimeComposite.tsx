// src/components/algorithms/number-theory/PrimeComposite.tsx
'use client';

import React from 'react';
import BaseAlgorithm from '@/components/algorithms/BaseAlgorithm';
import { AlgorithmStep } from '@/types/algorithms';

const PrimeComposite: React.FC = () => {
  const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const generateSteps = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    const primeIndices = new Set<number>();

    for (let i = 0; i < array.length; i++) {
      const num = array[i];
      
      // Initial check step - only highlight current number
      steps.push({
        type: 'comparison',
        indices: [i],
        description: `Checking ${num}`
      });

      if (num <= 1) {
        steps.push({
          type: 'comparison',
          indices: [i],  // Only highlight current number
          description: `${num} is neither prime nor composite`
        });
      } else if (isPrime(num)) {
        primeIndices.add(i);
        steps.push({
          type: 'final',
          indices: Array.from(primeIndices),  // Show all prime numbers found so far
          description: `${num} is prime`
        });
      } else {
        steps.push({
          type: 'comparison',
          indices: [i],  // Only highlight current number
          description: `${num} is composite`
        });
      }
    }

    // Final step - highlight all prime numbers
    if (primeIndices.size > 0) {
      steps.push({
        type: 'final',
        indices: Array.from(primeIndices),
        description: `Found ${primeIndices.size} prime number${primeIndices.size === 1 ? '' : 's'}!`
      });
    } else {
      steps.push({
        type: 'final',
        indices: [],
        description: 'No prime numbers found in the sequence!'
      });
    }

    return steps;
  };

  return (
    <BaseAlgorithm
      title="Prime and Composite Numbers"
      description="Identifies prime and composite numbers in a sequence."
      generateSteps={generateSteps}
      initialArray={[1, 2, 4, 7, 8, 11, 6, 13, 9, 17]}
    />
  );
};

export default PrimeComposite;