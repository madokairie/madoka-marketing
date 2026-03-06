"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPercent } from "@/lib/utils/format";
import { AlertTriangle, Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import type { AIDiagnosis } from "@/lib/types";

interface DiagnosisPanelProps {
  diagnosis: AIDiagnosis;
  onAction?: (action: { title: string; content_type: string }) => void;
}

function getSeverityStyle(severity: "critical" | "warning" | "ok") {
  switch (severity) {
    case "critical":
      return { color: "#a3333d", bg: "rgba(163, 51, 61, 0.1)", label: "Critical" };
    case "warning":
      return { color: "#d4a843", bg: "rgba(212, 168, 67, 0.1)", label: "Warning" };
    case "ok":
      return { color: "#2d6a4f", bg: "rgba(45, 106, 79, 0.1)", label: "OK" };
  }
}

export function DiagnosisPanel({ diagnosis, onAction }: DiagnosisPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold" style={{ color: "#1a2332" }}>
          <Sparkles className="h-4 w-4" style={{ color: "#c9a96e" }} />
          AI診断レポート
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Overall assessment */}
        <div
          className="rounded-lg p-4 text-sm leading-relaxed"
          style={{ backgroundColor: "#faf9f7", border: "1px solid #e5e5e5", color: "#2d2d2d" }}
        >
          {diagnosis.overall_assessment}
        </div>

        {/* Bottlenecks */}
        {diagnosis.bottlenecks.map((bottleneck, i) => {
          const style = getSeverityStyle(bottleneck.severity);
          return (
            <div
              key={i}
              className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: style.color + "40" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: style.color }}
                  />
                  <AlertTriangle className="h-4 w-4" style={{ color: style.color }} />
                  <span className="text-sm font-semibold" style={{ color: "#2d2d2d" }}>
                    ボトルネック: {bottleneck.step_name}
                  </span>
                </div>
                <Badge
                  className="text-xs"
                  style={{ backgroundColor: style.bg, color: style.color, border: "none" }}
                >
                  {style.label}
                </Badge>
              </div>

              {/* CVR comparison */}
              <div
                className="flex items-center gap-4 rounded-md px-3 py-2 text-sm"
                style={{ backgroundColor: style.bg }}
              >
                <span style={{ color: "#8a8a8a" }}>実績CVR:</span>
                <span className="font-bold" style={{ color: style.color }}>
                  {formatPercent(bottleneck.actual_cvr)}
                </span>
                <ArrowRight className="h-3 w-3" style={{ color: "#8a8a8a" }} />
                <span style={{ color: "#8a8a8a" }}>目標CVR:</span>
                <span className="font-semibold" style={{ color: "#2d2d2d" }}>
                  {formatPercent(bottleneck.target_cvr)}
                </span>
              </div>

              {/* Hypotheses */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#8a8a8a" }}>
                  <Lightbulb className="h-3 w-3" />
                  仮説
                </div>
                <ul className="space-y-1 pl-4">
                  {bottleneck.hypotheses.map((h, j) => (
                    <li
                      key={j}
                      className="text-sm list-disc"
                      style={{ color: "#2d2d2d" }}
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              {bottleneck.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {bottleneck.actions.map((action, k) => (
                    <Button
                      key={k}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      style={{
                        borderColor: "#c9a96e",
                        color: "#c9a96e",
                      }}
                      onClick={() => onAction?.({ title: action.title, content_type: action.content_type })}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {action.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Wins */}
        {diagnosis.wins.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#2d6a4f" }}>
              Good Performance
            </h4>
            {diagnosis.wins.map((win, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm"
                style={{ backgroundColor: "rgba(45, 106, 79, 0.06)" }}
              >
                <span style={{ color: "#2d2d2d" }}>{win.step_name}</span>
                <span className="font-semibold" style={{ color: "#2d6a4f" }}>
                  CVR {formatPercent(win.actual_cvr)} (目標 {formatPercent(win.target_cvr)})
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
