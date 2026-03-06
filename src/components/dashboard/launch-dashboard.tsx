"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "./kpi-card";
import { FunnelProgress } from "./funnel-progress";
import { DiagnosisPanel } from "./diagnosis-panel";
import { formatCurrency, formatPercent } from "@/lib/utils/format";
import {
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import type { FunnelStep, AIDiagnosis } from "@/lib/types";

// --- Mock Data ---

const mockFunnelSteps: FunnelStep[] = [
  {
    id: "s1",
    funnel_id: "f1",
    step_order: 1,
    step_type: "lp_visit",
    name: "LP流入",
    target_count: 3000,
    target_cvr: 20,
    default_cvr: 20,
    actual_count: 1820,
    actual_cvr: 22.6,
  },
  {
    id: "s2",
    funnel_id: "f1",
    step_order: 2,
    step_type: "optin",
    name: "オプトイン",
    target_count: 600,
    target_cvr: 50,
    default_cvr: 50,
    actual_count: 412,
    actual_cvr: 70.1,
  },
  {
    id: "s3",
    funnel_id: "f1",
    step_order: 3,
    step_type: "seminar_register",
    name: "セミナー申込",
    target_count: 300,
    target_cvr: 70,
    default_cvr: 70,
    actual_count: 289,
    actual_cvr: 67.5,
  },
  {
    id: "s4",
    funnel_id: "f1",
    step_order: 4,
    step_type: "seminar_attend",
    name: "セミナー着席",
    target_count: 210,
    target_cvr: 20,
    default_cvr: 20,
    actual_count: 195,
    actual_cvr: 14.4,
  },
  {
    id: "s5",
    funnel_id: "f1",
    step_order: 5,
    step_type: "consultation",
    name: "個別相談",
    target_count: 42,
    target_cvr: 47.6,
    default_cvr: 47.6,
    actual_count: 28,
    actual_cvr: 39.3,
  },
  {
    id: "s6",
    funnel_id: "f1",
    step_order: 6,
    step_type: "close",
    name: "成約",
    target_count: 20,
    target_cvr: 0,
    default_cvr: 0,
    actual_count: 11,
  },
];

const mockRevenueData = [
  { day: "Day 1", revenue: 500000, cumulative: 500000, target: 2000000 },
  { day: "Day 2", revenue: 1200000, cumulative: 1700000, target: 4000000 },
  { day: "Day 3", revenue: 800000, cumulative: 2500000, target: 6000000 },
  { day: "Day 4", revenue: 1500000, cumulative: 4000000, target: 8000000 },
  { day: "Day 5", revenue: 1500000, cumulative: 5500000, target: 10000000 },
];

const mockDiagnosis: AIDiagnosis = {
  bottlenecks: [
    {
      step_name: "着席 → 個別相談",
      actual_cvr: 14.4,
      target_cvr: 20,
      severity: "critical",
      hypotheses: [
        "セミナー内での個別相談への導線設計が弱い可能性がある",
        "セミナー終了時のCTA（個別相談申込）の訴求力が不足している",
        "個別相談の価値提案（何が得られるか）が明確に伝わっていない",
      ],
      actions: [
        {
          title: "セミナー内CTA強化スクリプト生成",
          description: "セミナー終盤の個別相談誘導トークスクリプトを生成",
          content_type: "distribution",
          priority: "high",
        },
        {
          title: "個別相談特典LPセクション生成",
          description: "個別相談申込ページに特典・限定性を追加",
          content_type: "lp_section",
          priority: "high",
        },
        {
          title: "フォローアップ配信生成",
          description: "セミナー後の個別相談誘導メール/LINEを生成",
          content_type: "distribution",
          priority: "medium",
        },
      ],
    },
  ],
  wins: [
    {
      step_name: "オプトイン → セミナー申込",
      actual_cvr: 70.1,
      target_cvr: 50,
      analysis: "ステップ配信の訴求が効果的に機能している",
    },
    {
      step_name: "セミナー申込 → 着席",
      actual_cvr: 67.5,
      target_cvr: 70,
      analysis: "リマインド配信が着席率を高く維持",
    },
  ],
  overall_assessment:
    "全体の達成率は55%で、ファネル前半（オプトイン〜セミナー着席）は良好に推移しています。最大のボトルネックは「着席→個別相談」のCVR（実績14.4% vs 目標20%）です。セミナー内の導線改善とフォローアップ強化が売上目標達成の鍵となります。",
};

// --- Custom Tooltip ---

function RevenueTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 shadow-md text-xs"
      style={{ backgroundColor: "#fff", borderColor: "#e5e5e5" }}
    >
      <p className="font-semibold mb-1" style={{ color: "#2d2d2d" }}>
        {label}
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span style={{ color: "#8a8a8a" }}>
            {entry.dataKey === "revenue"
              ? "日次売上"
              : entry.dataKey === "cumulative"
                ? "累計売上"
                : "目標ライン"}
            :
          </span>
          <span className="font-semibold" style={{ color: "#2d2d2d" }}>
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- Progress Ring ---

function ProgressRing({ percent }: { percent: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 100 ? "#2d6a4f" : percent >= 80 ? "#d4a843" : "#a3333d";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="72" height="72" className="-rotate-90">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span
        className="absolute text-sm font-bold"
        style={{ color }}
      >
        {percent}%
      </span>
    </div>
  );
}

// --- Main Component ---

export function LaunchDashboard() {
  const totalRevenue = 5500000;
  const revenueTarget = 10000000;
  const totalConversions = 11;
  const conversionTarget = 20;
  const achievementRate = Math.round((totalRevenue / revenueTarget) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#1a2332" }}>
          ローンチダッシュボード
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8a8a8a" }}>
          リアルタイムのファネル進捗とAI診断
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KPICard
          label="売上"
          value={formatCurrency(totalRevenue)}
          target={formatCurrency(revenueTarget)}
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
          color="#c9a96e"
        />
        <KPICard
          label="成約数"
          value={`${totalConversions}件`}
          target={`${conversionTarget}件`}
          icon={<Target className="h-5 w-5" />}
          trend="up"
          color="#4a6fa5"
        />
        <Card className="relative overflow-hidden">
          <CardContent className="flex items-center justify-between p-5">
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: "#8a8a8a" }}>
                達成率
              </p>
              <p className="text-2xl font-bold tracking-tight" style={{ color: "#2d2d2d" }}>
                {achievementRate}%
              </p>
              <div className="flex items-center gap-1 text-xs" style={{ color: "#8a8a8a" }}>
                <TrendingUp className="h-3 w-3" style={{ color: "#2d6a4f" }} />
                Day 5 / 7
              </div>
            </div>
            <ProgressRing percent={achievementRate} />
          </CardContent>
        </Card>
      </div>

      {/* Main content: Funnel + Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Funnel Progress */}
        <FunnelProgress steps={mockFunnelSteps} />

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold" style={{ color: "#1a2332" }}>
              売上推移
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={mockRevenueData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#8a8a8a" }}
                    axisLine={{ stroke: "#e5e5e5" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#8a8a8a" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) =>
                      v >= 1000000 ? `${v / 1000000}M` : `${v / 1000}K`
                    }
                  />
                  <RechartsTooltip content={<RevenueTooltipContent />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12 }}
                    formatter={(value: string) => {
                      const labels: Record<string, string> = {
                        revenue: "日次売上",
                        cumulative: "累計売上",
                        target: "目標ライン",
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#c9a96e"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#1a2332"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#1a2332" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#a3333d"
                    strokeWidth={2}
                    strokeDasharray="8 4"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Diagnosis */}
      <DiagnosisPanel
        diagnosis={mockDiagnosis}
        onAction={(action) => {
          console.log("Generate content:", action);
        }}
      />
    </div>
  );
}
