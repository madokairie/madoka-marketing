"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  target?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "flat";
  color?: string;
}

export function KPICard({ label, value, target, icon, trend, color }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: "#8a8a8a" }}>
              {label}
            </p>
            <p className="text-2xl font-bold tracking-tight" style={{ color: color || "#2d2d2d" }}>
              {value}
            </p>
            {target && (
              <p className="text-xs" style={{ color: "#8a8a8a" }}>
                目標: {target}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color || "#c9a96e"}15`, color: color || "#c9a96e" }}
            >
              {icon}
            </div>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  trend === "up" && "text-[#2d6a4f]",
                  trend === "down" && "text-[#a3333d]",
                  trend === "flat" && "text-[#8a8a8a]"
                )}
              >
                {trend === "up" && <TrendingUp className="h-3 w-3" />}
                {trend === "down" && <TrendingDown className="h-3 w-3" />}
                {trend === "flat" && <Minus className="h-3 w-3" />}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
