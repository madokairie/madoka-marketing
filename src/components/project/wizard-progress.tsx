"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  completedSteps: number[];
}

const steps = [
  { label: "商品情報", step: 1 },
  { label: "ペルソナ", step: 2 },
  { label: "オファー", step: 3 },
  { label: "トンマナ", step: 4 },
];

export function WizardProgress({ currentStep, completedSteps }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-center gap-0 py-8">
      {steps.map((s, index) => {
        const isCompleted = completedSteps.includes(s.step);
        const isActive = currentStep === s.step;
        const isUpcoming = !isCompleted && !isActive;

        return (
          <div key={s.step} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
                  isCompleted && "bg-[#1a2332] text-white",
                  isActive && "bg-[#c9a96e] text-white",
                  isUpcoming && "bg-[#e5e5e5] text-[#8a8a8a]"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : s.step}
              </div>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  isCompleted && "text-[#1a2332]",
                  isActive && "text-[#1a2332]",
                  isUpcoming && "text-[#8a8a8a]"
                )}
              >
                {s.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 mt-[-1.5rem] h-[2px] w-16",
                  isCompleted ? "bg-[#1a2332]" : "bg-[#e5e5e5]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
