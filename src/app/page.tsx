// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import BubbleSort from '@/components/algorithms/sorting/BubbleSort';
import InsertionSort from '@/components/algorithms/sorting/InsertionSort';
import SelectionSort from '@/components/algorithms/sorting/SelectionSort';
import ShellSort from '@/components/algorithms/sorting/ShellSort';
import QuickSort from '@/components/algorithms/sorting/QuickSort';
import OddNumbers from '@/components/algorithms/number-theory/OddNumbers';
import PrimeComposite from '@/components/algorithms/number-theory/PrimeComposite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Box } from "lucide-react";
import '@/styles/custom.css';

type AlgorithmType = 'odd' | 'prime' | 'bubble' | 'insertion' | 'selection' | 'shell' | 'quick';

interface AlgorithmInfo {
  title: string;
  description: string;
  category: 'Number Theory' | 'Sorting';
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
}

const algorithmInfo: Record<AlgorithmType, AlgorithmInfo> = {
  odd: {
    title: "Odd Numbers",
    description: "Find odd numbers in a sequence by checking if each number is not divisible by 2.",
    category: "Number Theory",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1)"
  },
  prime: {
    title: "Prime & Composite",
    description: "Identify prime numbers in a sequence. Prime numbers are only divisible by 1 and themselves.",
    category: "Number Theory",
    timeComplexity: {
      best: "O(n√n)",
      average: "O(n√n)",
      worst: "O(n√n)"
    },
    spaceComplexity: "O(1)"
  },
  bubble: {
    title: "Bubble Sort",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if needed.",
    category: "Sorting",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)"
  },
  insertion: {
    title: "Insertion Sort",
    description: "Builds the sorted array one item at a time, similar to sorting playing cards in hands.",
    category: "Sorting",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)"
  },
  selection: {
    title: "Selection Sort",
    description: "Divides array into sorted and unsorted regions, selects smallest element from unsorted region.",
    category: "Sorting",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)"
  },
  shell: {
    title: "Shell Sort",
    description: "Improves insertion sort by comparing elements separated by a gap, reducing the gap gradually.",
    category: "Sorting",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)"
  },
  quick: {
    title: "Quick Sort",
    description: "Uses divide-and-conquer, picks a pivot element and partitions other elements into subarrays.",
    category: "Sorting",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)"
  }
};

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<AlgorithmType | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Algorithm Vision Lab
          </h1>
          <p className="text-lg text-gray-300">
            Explore and understand algorithms through interactive visualization
          </p>
        </motion.div>

        <Tabs 
          value={selectedTab ?? ""} 
          onValueChange={(value) => setSelectedTab(value as AlgorithmType)}
          className="space-y-8"
        >
          <motion.div 
            layout
            className="bg-[#1a1a3f] p-6 rounded-2xl border border-purple-500/20"
          >
            <p className="text-sm text-gray-300 mb-4 uppercase tracking-widest font-medium">
              Select Algorithm
            </p>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 bg-[#0a0a1f]/50 p-2 rounded-xl">
              {Object.entries(algorithmInfo).map(([key, info]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white
                           data-[state=active]:shadow-purple-500/20 data-[state=active]:border-purple-500/50
                           border border-transparent hover:border-purple-500/30
                           transition-all duration-200 rounded-lg"
                >
                  {info.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {!selectedTab ? (
            <motion.div 
              {...pageTransition}
              className="bg-[#1a1a3f] p-8 rounded-2xl border border-purple-500/20
                        flex items-center justify-center min-h-[300px]"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Welcome to Algorithm Vision Lab!
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Choose an algorithm from above to begin your learning journey. 
                  Watch how algorithms work step by step, control the visualization speed, 
                  and input your own data to test different scenarios.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              {...pageTransition}
              className="space-y-6"
            >
              <div className="bg-[#1a1a3f] p-6 rounded-2xl border border-purple-500/20">
                <div className="text-sm font-medium text-gray-300 mb-2 uppercase tracking-widest">
                  {algorithmInfo[selectedTab].category}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {algorithmInfo[selectedTab].title}
                </h2>
                <Separator className="my-4 bg-purple-500/20" />
                <p className="text-gray-300 leading-relaxed mb-4">
                  {algorithmInfo[selectedTab].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">Time Complexity</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Best: </span>
                        <span className="text-white">{algorithmInfo[selectedTab].timeComplexity.best}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Average: </span>
                        <span className="text-white">{algorithmInfo[selectedTab].timeComplexity.average}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Worst: </span>
                        <span className="text-white">{algorithmInfo[selectedTab].timeComplexity.worst}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">Space Complexity</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Auxiliary Space: </span>
                      <span className="text-white">{algorithmInfo[selectedTab].spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              </div>

              <TabsContent value="odd">
                <OddNumbers />
              </TabsContent>
              <TabsContent value="prime">
                <PrimeComposite />
              </TabsContent>
              <TabsContent value="bubble">
                <BubbleSort />
              </TabsContent>
              <TabsContent value="insertion">
                <InsertionSort />
              </TabsContent>
              <TabsContent value="selection">
                <SelectionSort />
              </TabsContent>
              <TabsContent value="shell">
                <ShellSort />
              </TabsContent>
              <TabsContent value="quick">
                <QuickSort />
              </TabsContent>
            </motion.div>
          )}
        </Tabs>
      </div>
    </div>
  );
}