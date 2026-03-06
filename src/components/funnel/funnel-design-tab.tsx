"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, Target, Calculator, Settings2 } from "lucide-react";

const mockSteps = [
  { name: "LP流入", target_count: 2860, target_cvr: 100, default_cvr: 100 },
  { name: "オプトイン登録", target_count: 572, target_cvr: 20, default_cvr: 20 },
  { name: "セミナー申込", target_count: 286, target_cvr: 50, default_cvr: 50 },
  { name: "セミナー着席", target_count: 200, target_cvr: 70, default_cvr: 70 },
  { name: "個別相談申込", target_count: 40, target_cvr: 20, default_cvr: 20 },
  { name: "成約", target_count: 20, target_cvr: 50, default_cvr: 50 },
];

export function FunnelDesignTab() {
  const [revenueTarget] = useState(10000000);
  const [productPrice] = useState(500000);

  return (
    <div className="space-y-6">
      {/* KPI Calculator */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[#c9a96e]" />
            <CardTitle className="text-base">KPI逆算</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <Label className="text-[#8a8a8a]">売上目標</Label>
              <p className="text-2xl font-bold text-[#1a2332] font-[family-name:var(--font-inter)]">
                {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(revenueTarget)}
              </p>
            </div>
            <div>
              <Label className="text-[#8a8a8a]">商品単価</Label>
              <p className="text-2xl font-bold text-[#1a2332] font-[family-name:var(--font-inter)]">
                {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(productPrice)}
              </p>
            </div>
            <div>
              <Label className="text-[#8a8a8a]">必要成約数</Label>
              <p className="text-2xl font-bold text-[#c9a96e] font-[family-name:var(--font-inter)]">
                {Math.ceil(revenueTarget / productPrice)}件
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funnel Visualizer */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#1a2332]" />
              <CardTitle className="text-base">ファネル設計</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">テンプレート A: セミナー型</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            {mockSteps.map((step, i) => (
              <div key={step.name} className="w-full max-w-md">
                {/* Step */}
                <div
                  className="mx-auto rounded-lg border border-[#e5e5e5] bg-white p-4 hover:shadow-md transition-shadow cursor-pointer"
                  style={{
                    width: `${100 - i * 10}%`,
                    minWidth: "260px",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#1a2332]">{step.name}</p>
                      <p className="text-xs text-[#8a8a8a] mt-0.5">
                        目標: <span className="font-medium font-[family-name:var(--font-inter)] text-[#2d2d2d]">{step.target_count.toLocaleString()}</span>
                      </p>
                    </div>
                    <Settings2 className="h-4 w-4 text-[#e5e5e5]" />
                  </div>
                </div>

                {/* CVR Arrow */}
                {i < mockSteps.length - 1 && (
                  <div className="flex flex-col items-center py-2">
                    <ArrowDown className="h-4 w-4 text-[#8a8a8a]" />
                    <span className="text-xs font-medium text-[#4a6fa5] font-[family-name:var(--font-inter)]">
                      CVR {mockSteps[i + 1].target_cvr}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-3">
            <Button variant="outline" className="border-[#e5e5e5] text-[#8a8a8a]">
              ステップを追加
            </Button>
            <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">
              KPIを再計算
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
