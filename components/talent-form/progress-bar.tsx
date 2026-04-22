"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
}

const sectionLabels = [
  "Основно",
  "Интерес",
  "Искуство",
  "Фокус",
  "Испрати",
];

export function ProgressBar({
  currentSection,
  totalSections,
}: ProgressBarProps) {
  return (
    <div className="w-full mb-10">
      {/* Desktop: Step indicators */}
      <div className="hidden sm:block">
        <div className="flex justify-between relative">
          {/* Connection line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border">
            <div 
              className="h-full bg-success transition-all duration-500 ease-out"
              style={{ width: `${((currentSection - 1) / (totalSections - 1)) * 100}%` }}
            />
          </div>
          
          {sectionLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentSection;
            const isCurrent = stepNumber === currentSection;
            const isUpcoming = stepNumber > currentSection;
            
            return (
              <div key={label} className="flex flex-col items-center relative z-10">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300
                    ${isCompleted 
                      ? "bg-success text-success-foreground" 
                      : isCurrent 
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20" 
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span 
                  className={`
                    mt-2 text-xs font-medium transition-colors
                    ${isUpcoming ? "text-muted-foreground" : "text-foreground"}
                  `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Simplified progress */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">
            {sectionLabels[currentSection - 1]}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentSection} од {totalSections}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentSection / totalSections) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
