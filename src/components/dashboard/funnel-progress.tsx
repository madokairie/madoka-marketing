"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils/format";
import type { FunnelStep } from "@/lib/types";

interface FunnelProgressProps {
  steps: FunnelStep[];
}

function getStatusColor(ratio: number): string {
  if (ratio >= 1) return "#2d6a4f";
  if (ratio >= 0.8) return "#d4a843";
  return "#a3333d";
}

function getStatusIcon(ratio: number): string {
  if (ratio >= 1) return "\u2705";
  if (ratio >= 0.8) return "\u26a0\ufe0f";
  return "\ud83d\udd34";
}

function getStatusBg(ratio: number): string {
  if (ratio >= 1) return "rgba(45, 106, 79, 0.08)";
  if (ratio >= 0.8) return "rgba(212, 168, 67, 0.08)";
  return "rgba(163, 51, 61, 0.08)";
}

export function FunnelProgress({ steps }: FunnelProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold" style={{ color: "#1a2332" }}>
          ファネル進捗
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {steps.map((step, index) => {
          const actual = step.actual_count ?? 0;
          const ratio = step.target_count > 0 ? actual / step.target_count : 0;
          const percentage = ratio * 100;
          const statusColor = getStatusColor(ratio);
          const statusIcon = getStatusIcon(ratio);
          const statusBg = getStatusBg(ratio);

          const nextStep = index < steps.length - 1 ? steps[index + 1] : null;
          const actualCvr =
            nextStep && actual > 0
              ? ((nextStep.actual_count ?? 0) / actual) * 100
              : null;
          const targetCvr = nextStep ? nextStep.target_cvr : null;

          return (
            <div key={step.id}>
              {/* Step row */}
              <div
                className="flex items-center gap-4 rounded-lg px-4 py-3 transition-colors"
                style={{ backgroundColor: statusBg }}
              >
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: statusColor }}
                  >
                    {step.step_order}
                  </div>
                </div>

                {/* Step info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
                      {step.name}
                    </span>
                    <span className="text-sm">{statusIcon}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: statusColor,
                      }}
                    />
                  </div>
                </div>

                {/* Numbers */}
                <div className="text-right shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold" style={{ color: statusColor }}>
                      {formatNumber(actual)}
                    </span>
                    <span className="text-xs" style={{ color: "#8a8a8a" }}>
                      / {formatNumber(step.target_count)}
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: statusColor }}
                  >
                    {formatPercent(percentage, 0)}
                  </span>
                </div>
              </div>

              {/* CVR connector between steps */}
              {nextStep && (
                <div className="flex items-center py-2 pl-8">
                  <div className="flex items-center gap-3 ml-4">
                    <div
                      className="h-6 w-px"
                      style={{ backgroundColor: "#e5e5e5" }}
                    />
                    <div className="flex items-center gap-2 text-xs">
                      <span style={{ color: "#8a8a8a" }}>CVR:</span>
                      {actualCvr !== null && (
                        <span
                          className="font-semibold"
                          style={{
                            color: getStatusColor(
                              targetCvr && targetCvr > 0 ? actualCvr / targetCvr : 0
                            ),
                          }}
                        >
                          {formatPercent(actualCvr)}
                        </span>
                      )}
                      {targetCvr !== null && (
                        <span style={{ color: "#8a8a8a" }}>
                          (目標 {formatPercent(targetCvr)})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
