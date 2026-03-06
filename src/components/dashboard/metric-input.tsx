"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatNumber, formatCurrency } from "@/lib/utils/format";
import { Save, Play, Calendar } from "lucide-react";
import type { FunnelStep } from "@/lib/types";

interface MetricInputProps {
  day: number;
  date: string;
  steps: FunnelStep[];
  onSave?: (data: {
    increments: Record<string, number>;
    revenue: number;
    memo: string;
  }) => void;
}

export function MetricInput({ day, date, steps, onSave }: MetricInputProps) {
  const [increments, setIncrements] = useState<Record<string, number>>(
    Object.fromEntries(steps.map((s) => [s.id, 0]))
  );
  const [revenue, setRevenue] = useState(0);
  const [memo, setMemo] = useState("");

  const handleIncrementChange = (stepId: string, value: number) => {
    setIncrements((prev) => ({ ...prev, [stepId]: value }));
  };

  const handleSubmit = () => {
    onSave?.({ increments, revenue, memo });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-base font-semibold" style={{ color: "#1a2332" }}>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: "#1a2332" }}
          >
            {day}
          </div>
          <div>
            <div>Day {day} 実績入力</div>
            <div className="flex items-center gap-1 text-xs font-normal" style={{ color: "#8a8a8a" }}>
              <Calendar className="h-3 w-3" />
              {date}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Funnel step inputs */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8a8a8a" }}>
            ファネル指標
          </h4>
          <div className="space-y-2">
            {steps.map((step) => {
              const currentTotal = step.actual_count ?? 0;
              const increment = increments[step.id] ?? 0;
              const newTotal = currentTotal + increment;
              return (
                <div
                  key={step.id}
                  className="grid grid-cols-[1fr_auto_80px_auto_auto] items-center gap-3 rounded-lg px-3 py-2"
                  style={{ backgroundColor: "#faf9f7" }}
                >
                  <Label className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
                    {step.name}
                  </Label>
                  <span className="text-sm tabular-nums" style={{ color: "#8a8a8a" }}>
                    {formatNumber(currentTotal)}
                  </span>
                  <div className="relative">
                    <span
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-xs"
                      style={{ color: "#8a8a8a" }}
                    >
                      +
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={increment || ""}
                      onChange={(e) =>
                        handleIncrementChange(step.id, parseInt(e.target.value) || 0)
                      }
                      className="h-8 pl-6 text-right text-sm tabular-nums"
                      style={{ borderColor: "#e5e5e5" }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: "#8a8a8a" }}>
                    =
                  </span>
                  <span className="text-sm font-semibold tabular-nums min-w-[60px] text-right" style={{ color: "#2d2d2d" }}>
                    {formatNumber(newTotal)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue input */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8a8a8a" }}>
            売上
          </h4>
          <div
            className="flex items-center gap-3 rounded-lg px-3 py-2"
            style={{ backgroundColor: "#faf9f7" }}
          >
            <Label className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
              本日の売上
            </Label>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                step={10000}
                value={revenue || ""}
                onChange={(e) => setRevenue(parseInt(e.target.value) || 0)}
                className="h-8 text-right text-sm tabular-nums"
                style={{ borderColor: "#e5e5e5" }}
                placeholder="0"
              />
            </div>
            <span className="text-sm" style={{ color: "#8a8a8a" }}>
              {formatCurrency(revenue)}
            </span>
          </div>
        </div>

        {/* Memo */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8a8a8a" }}>
            メモ
          </h4>
          <Textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="今日の所感、施策変更の記録など..."
            rows={3}
            className="text-sm resize-none"
            style={{ borderColor: "#e5e5e5" }}
          />
        </div>

        {/* Submit */}
        <Button
          className="w-full font-semibold"
          style={{ backgroundColor: "#c9a96e", color: "#fff" }}
          onClick={handleSubmit}
        >
          <Save className="h-4 w-4 mr-2" />
          保存して診断実行
          <Play className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
