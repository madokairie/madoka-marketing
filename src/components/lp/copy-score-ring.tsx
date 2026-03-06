"use client";

import type { CopyScore } from "@/lib/types";

interface CopyScoreRingProps {
  score: number;
  scoreDetail?: CopyScore | null;
  size?: number;
}

const scoreItems: { key: keyof Omit<CopyScore, "total">; label: string }[] = [
  { key: "headline", label: "ヘッドライン" },
  { key: "problemStatement", label: "問題提起" },
  { key: "logicFlow", label: "論理構成" },
  { key: "socialProof", label: "社会的証明" },
  { key: "offer", label: "オファー" },
  { key: "cta", label: "CTA" },
  { key: "objectionHandling", label: "反論処理" },
  { key: "readability", label: "読みやすさ" },
  { key: "targetFit", label: "ターゲット適合" },
  { key: "uniqueness", label: "独自性" },
];

function getScoreColor(score: number): string {
  if (score >= 80) return "#2d6a4f";
  if (score >= 60) return "#d4a843";
  return "#a3333d";
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return "#2d6a4f20";
  if (score >= 60) return "#d4a84320";
  return "#a3333d20";
}

export function CopyScoreRing({ score, scoreDetail, size = 120 }: CopyScoreRingProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-[var(--font-inter)] text-3xl font-bold"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-[10px] text-[#8a8a8a]">/ 100</span>
        </div>
      </div>

      {/* Score detail items */}
      {scoreDetail && (
        <div className="w-full space-y-2">
          {scoreItems.map(({ key, label }) => {
            const itemScore = scoreDetail[key];
            const itemColor = getScoreColor(itemScore);
            const itemBg = getScoreBgColor(itemScore);
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-[#8a8a8a] w-24 shrink-0 truncate">
                  {label}
                </span>
                <div className="flex-1 h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${itemScore}%`,
                      backgroundColor: itemColor,
                    }}
                  />
                </div>
                <span
                  className="text-xs font-medium w-6 text-right font-[var(--font-inter)]"
                  style={{ color: itemColor }}
                >
                  {itemScore}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
