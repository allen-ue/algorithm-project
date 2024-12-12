'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";
import { AlgorithmStep } from '@/types/algorithms';
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BaseAlgorithmProps {
  title: string;
  description: string;
  generateSteps: (arr: number[]) => AlgorithmStep[];
  initialArray?: number[];
  algorithmType?: 'quickSort' | 'default';
}

const numberVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const BaseAlgorithm: React.FC<BaseAlgorithmProps> = ({ 
  title,
  description,
  generateSteps,
  initialArray = [64, 34, 25, 12, 22, 11, 90],
  algorithmType = 'default'
}) => {
  const [array, setArray] = useState<number[]>(initialArray);
  const [lastSetArray, setLastSetArray] = useState<number[]>(initialArray);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [input, setInput] = useState<string>('');
  const [currentArray, setCurrentArray] = useState<number[]>(initialArray);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const newSteps = generateSteps([...array]);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setCurrentArray([...array]);
  }, [array, generateSteps]);

  useEffect(() => {
    if (!steps[currentStep]) return;

    const step = steps[currentStep];
    const newArray = [...currentArray];
    
    if (algorithmType === 'quickSort' && step.type === 'update' && step.updates) {
      step.updates.forEach(({index, value}) => {
        newArray[index] = value;
      });
      setCurrentArray(newArray);
    } else if (step.type === 'swap' && step.indices.length === 2) {
      const [i, j] = step.indices;
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      setCurrentArray(newArray);
    }
  }, [currentStep, steps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const delay = 1100 - (speed * 100);
    
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, delay);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleReset = useCallback(() => {
    setArray(lastSetArray);
    setCurrentArray(lastSetArray);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [lastSetArray]);

  const handleClear = () => {
    setArray(initialArray);
    setLastSetArray(initialArray);
    setCurrentArray(initialArray);
    setCurrentStep(0);
    setIsPlaying(false);
    setInput('');
    setError('');
  };

  const validateInput = (input: string): boolean => {
    if (!input.trim()) {
      setError('Please enter some numbers');
      return false;
    }

    if (!/^-?\d+(?:,-?\d+)*$/.test(input.trim())) {
      setError('Please enter valid numbers separated by commas');
      return false;
    }

    const numbers = input
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));

    if (numbers.length < 2) {
      setError('Please enter at least 2 numbers');
      return false;
    }

    if (numbers.length > 15) {
      setError('Please enter no more than 15 numbers');
      return false;
    }

    if (numbers.some(num => Math.abs(num) > 999)) {
      setError('Numbers must be between -999 and 999');
      return false;
    }

    return true;
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateInput(input)) return;

    const newArray = input
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    setArray(newArray);
    setLastSetArray(newArray);
  };

  const getBoxColor = (index: number): string => {
    if (!steps[currentStep]) return 'bg-[#1a1a3f] border-purple-500/20 text-white';
    
    const step = steps[currentStep];
    if (step.indices.includes(index)) {
      switch (step.type) {
        case 'comparison':
          return 'bg-yellow-500/20 border-yellow-400 text-yellow-100 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
        case 'swap':
        case 'update':
          return 'bg-blue-500/20 border-blue-400 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
        case 'final':
          return 'bg-green-500/20 border-green-400 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
        default:
          return 'bg-[#1a1a3f] border-purple-500/20 text-white';
      }
    }
    return 'bg-[#1a1a3f] border-purple-500/20 text-white';
  };

  return (
    <Card className="bg-[#1a1a3f]/50 border-purple-500/20 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">Speed: {speed}x</span>
            <div className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white">
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={1}
                max={10}
                step={1}
                className="custom-slider"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentStep >= steps.length - 1}
              className="h-8 w-8 border-purple-300/50 bg-purple-500/10 hover:bg-purple-500/30 
                       hover:border-purple-300/70 transition-colors duration-200"
            >
              {isPlaying ? 
                <Pause className="h-4 w-4 text-white" /> : 
                <Play className="h-4 w-4 text-white" />
              }
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="h-8 w-8 border-purple-300/50 bg-purple-500/10 hover:bg-purple-500/30 
                       hover:border-purple-300/70 transition-colors duration-200"
            >
              <RotateCcw className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleInputSubmit} className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Enter numbers separated by commas (e.g., 5,2,8,1)"
              className="flex-1 bg-[#1a1a3f] border-purple-300/50 text-white 
                       placeholder:text-gray-400 focus-visible:ring-purple-500/50"
            />
            <Button 
              type="submit" 
              variant="outline"
              className="border-purple-300/50 bg-purple-500/10 hover:bg-purple-500/30 text-white
                       hover:border-purple-300/70 transition-colors duration-200"
            >
              Set Array
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClear}
              className="border-purple-300/50 bg-purple-500/10 hover:bg-purple-500/30 text-white
                       hover:border-purple-300/70 transition-colors duration-200"
            >
              Clear
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardHeader>

      <Separator className="bg-purple-500/20" />

      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-center items-center min-h-[200px] p-4">
          <AnimatePresence mode="popLayout">
            {currentArray.map((value, index) => (
              <motion.div
                key={index}
                layout
                variants={numberVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`
                  w-12 h-12 
                  flex items-center justify-center 
                  border rounded-lg
                  font-mono text-sm
                  transition-colors duration-300
                  mx-1
                  hover:scale-110
                  transform
                  ${getBoxColor(index)}
                `}
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded border border-yellow-400 bg-yellow-500/20" />
            <span className="text-sm text-gray-300">Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded border border-blue-400 bg-blue-500/20" />
            <span className="text-sm text-gray-300">Swapping/Updating</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded border border-green-400 bg-green-500/20" />
            <span className="text-sm text-gray-300">Final Position</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded border border-purple-500/20 bg-[#1a1a3f]" />
            <span className="text-sm text-gray-300">Unsorted</span>
          </div>
        </div>

        <motion.div 
          className="space-y-2"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-white text-center">
            {steps[currentStep]?.description || description}
          </p>
          <p className="text-sm text-gray-400 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default BaseAlgorithm;