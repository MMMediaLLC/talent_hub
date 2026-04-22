"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  completedSteps: number[]; // Array of step numbers that are fully completed
  onStepClick: (step: number) => void;
}

export function ProgressIndicator({ currentStep, completedSteps, onStepClick }: ProgressIndicatorProps) {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="w-full max-w-3xl mx-auto mb-12 py-4">
      <div className="flex items-center justify-between relative px-2">
        {/* Background track */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0" />
        
        {/* Active track filling */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const isActive = step === currentStep;
          const isCompleted = completedSteps.includes(step);
          
          return (
            <button
              key={step}
              onClick={() => {
                // Allow clicking completed steps or the immediate next step if previous is completed
                if (isCompleted || step <= currentStep + 1) {
                  onStepClick(step);
                }
              }}
              className={`relative z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isActive 
                  ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
                  : isCompleted 
                    ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-[#1E1E2E] border border-white/20 text-white/50"
              }`}
            >
              {isCompleted && !isActive ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className="font-mono font-bold text-sm">{step}</span>
              )}
              
              {isActive && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-white/50"
                  animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
