"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, TrendingDown, Lightbulb, Trophy } from "lucide-react";

export function ReportTab() {
  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a2332]">ローンチレポート</h2>
        <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">
          <Download className="h-4 w-4 mr-2" />
          PDF出力
        </Button>
      </div>

      {/* Summary */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#c9a96e]" />
            <CardTitle className="text-base">結果サマリー</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#faf9f7] rounded-lg">
              <p className="text-sm text-[#8a8a8a]">売上</p>
              <p className="text-3xl font-bold text-[#1a2332] font-[family-name:var(--font-inter)]">¥5,500,000</p>
              <Badge variant="outline" className="text-xs mt-1 border-[#d4a843] text-[#d4a843]">目標比 55%</Badge>
            </div>
            <div className="text-center p-4 bg-[#faf9f7] rounded-lg">
              <p className="text-sm text-[#8a8a8a]">成約数</p>
              <p className="text-3xl font-bold text-[#1a2332] font-[family-name:var(--font-inter)]">11件</p>
              <Badge variant="outline" className="text-xs mt-1 border-[#d4a843] text-[#d4a843]">目標 20件</Badge>
            </div>
            <div className="text-center p-4 bg-[#faf9f7] rounded-lg">
              <p className="text-sm text-[#8a8a8a]">ローンチ進捗</p>
              <p className="text-3xl font-bold text-[#4a6fa5] font-[family-name:var(--font-inter)]">Day 5/14</p>
              <Badge variant="outline" className="text-xs mt-1 border-[#4a6fa5] text-[#4a6fa5]">進行中</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funnel Performance */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-base">ファネル実績 vs 目標</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "LP流入", target: 3000, actual: 1820 },
              { name: "オプトイン登録", target: 600, actual: 412 },
              { name: "セミナー申込", target: 300, actual: 289 },
              { name: "セミナー着席", target: 210, actual: 195 },
              { name: "個別相談申込", target: 42, actual: 28 },
              { name: "成約", target: 20, actual: 11 },
            ].map((step) => {
              const ratio = step.target > 0 ? step.actual / step.target : 0;
              const color = ratio >= 1 ? "text-[#2d6a4f]" : ratio >= 0.8 ? "text-[#d4a843]" : "text-[#a3333d]";
              const bgColor = ratio >= 1 ? "bg-[#2d6a4f]" : ratio >= 0.8 ? "bg-[#d4a843]" : "bg-[#a3333d]";
              return (
                <div key={step.name} className="flex items-center gap-4">
                  <span className="text-sm text-[#2d2d2d] w-32 shrink-0">{step.name}</span>
                  <div className="flex-1 h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${bgColor}`}
                      style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium font-[family-name:var(--font-inter)] w-24 text-right ${color}`}>
                    {step.actual.toLocaleString()} / {step.target.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium font-[family-name:var(--font-inter)] w-12 text-right ${color}`}>
                    {(ratio * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Wins & Improvements */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#2d6a4f]" />
              <CardTitle className="text-base">勝因分析</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm text-[#2d2d2d] flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">+</span>
                オプトイン→セミナー申込のCVRが70.1%と高い（目標50%）
              </li>
              <li className="text-sm text-[#2d2d2d] flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">+</span>
                セミナー着席率93%でリマインド配信が効果的
              </li>
              <li className="text-sm text-[#2d2d2d] flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">+</span>
                Day4の配信後に成約が急増（効果的な配信パターン）
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-[#a3333d]" />
              <CardTitle className="text-base">改善ポイント</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm text-[#2d2d2d] flex items-start gap-2">
                <span className="text-[#a3333d] mt-0.5">-</span>
                LP流入数が目標未達（61%）→ 広告/SNS集客の強化が必要
              </li>
              <li className="text-sm text-[#2d2d2d] flex items-start gap-2">
                <span className="text-[#a3333d] mt-0.5">-</span>
                着席→個別相談のCVRが14.4%（目標20%）→ オファー提示の改善
              </li>
              <li className="text-sm text-[#2d2d2d] flex items-start gap-2">
                <span className="text-[#a3333d] mt-0.5">-</span>
                個別相談→成約率39.3%（目標50%）→ クロージングの改善
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#c9a96e]" />
            <CardTitle className="text-base">次回ローンチへの提言</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="text-sm text-[#2d2d2d]">
              <span className="font-medium">1.</span> LP流入の増加施策：Instagram広告の追加、リール投稿の頻度アップ
            </li>
            <li className="text-sm text-[#2d2d2d]">
              <span className="font-medium">2.</span> セミナー内のオファーパートを強化：個別相談の価値をより具体的に伝える
            </li>
            <li className="text-sm text-[#2d2d2d]">
              <span className="font-medium">3.</span> セミナー後フォロー配信に成功事例を追加し、個別相談への心理的ハードルを下げる
            </li>
            <li className="text-sm text-[#2d2d2d]">
              <span className="font-medium">4.</span> リードマグネットの質をさらに上げ、教育済みリストの獲得を強化
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
