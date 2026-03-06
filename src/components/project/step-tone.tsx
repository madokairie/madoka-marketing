"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ToneSettings } from "@/lib/types";

interface StepToneProps {
  onSubmit: (data: { toneSettings: ToneSettings }) => void;
  onBack: () => void;
  initialData?: { toneSettings: ToneSettings };
}

const toneOptions = [
  { value: "authoritative", label: "権威的" },
  { value: "friendly", label: "親しみやすい" },
  { value: "passionate", label: "情熱的" },
  { value: "intellectual", label: "知的" },
  { value: "casual", label: "カジュアル" },
  { value: "provocative", label: "挑発的" },
];

const fontOptions = [
  { value: "Noto Sans JP", label: "Noto Sans JP" },
  { value: "Noto Serif JP", label: "Noto Serif JP" },
  { value: "M PLUS 1p", label: "M PLUS 1p" },
  { value: "M PLUS Rounded 1c", label: "M PLUS Rounded 1c" },
  { value: "Sawarabi Gothic", label: "Sawarabi Gothic" },
  { value: "Kosugi Maru", label: "Kosugi Maru" },
  { value: "Zen Kaku Gothic New", label: "Zen Kaku Gothic New" },
  { value: "Shippori Mincho", label: "Shippori Mincho" },
];

export function StepTone({ onSubmit, onBack, initialData }: StepToneProps) {
  const [selectedTones, setSelectedTones] = useState<string[]>(
    initialData?.toneSettings?.tones ?? []
  );
  const [keywords, setKeywords] = useState<[string, string, string]>(
    (initialData?.toneSettings?.keywords?.length === 3
      ? initialData.toneSettings.keywords
      : ["", "", ""]) as [string, string, string]
  );
  const [brandColors, setBrandColors] = useState({
    main: initialData?.toneSettings?.brand_colors?.main ?? "#1a2332",
    sub: initialData?.toneSettings?.brand_colors?.sub ?? "#c9a96e",
    accent: initialData?.toneSettings?.brand_colors?.accent ?? "#e74c3c",
  });
  const [fonts, setFonts] = useState({
    heading: initialData?.toneSettings?.fonts?.heading ?? "Noto Sans JP",
    body: initialData?.toneSettings?.fonts?.body ?? "Noto Sans JP",
  });

  const toggleTone = (value: string) => {
    setSelectedTones((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const isValid = selectedTones.length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      toneSettings: {
        tones: selectedTones,
        keywords: keywords.filter((k) => k.trim() !== ""),
        brand_colors: brandColors,
        fonts,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-[#2d2d2d] mb-1">トーン & ブランディング</h2>
        <p className="text-sm text-[#8a8a8a]">
          コピーやデザインの方向性を設定します
        </p>
      </div>

      {/* Tone Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
          トーン選択（複数可）
        </h3>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((tone) => {
            const isSelected = selectedTones.includes(tone.value);
            return (
              <button
                key={tone.value}
                type="button"
                onClick={() => toggleTone(tone.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all border",
                  isSelected
                    ? "bg-[#1a2332] text-white border-[#1a2332]"
                    : "bg-white text-[#2d2d2d] border-[#e5e5e5] hover:border-[#c9a96e]"
                )}
              >
                {tone.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* World View Keywords */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
          世界観キーワード
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {keywords.map((kw, i) => (
            <div key={i} className="space-y-1">
              <Label className="text-xs text-[#8a8a8a]">キーワード {i + 1}</Label>
              <Input
                placeholder={
                  i === 0 ? "例: 高級感" : i === 1 ? "例: 信頼" : "例: 革新"
                }
                value={kw}
                onChange={(e) => {
                  const next = [...keywords] as [string, string, string];
                  next[i] = e.target.value;
                  setKeywords(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Brand Colors */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
          ブランドカラー
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {(
            [
              { key: "main", label: "メインカラー" },
              { key: "sub", label: "サブカラー" },
              { key: "accent", label: "アクセントカラー" },
            ] as const
          ).map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label className="text-xs text-[#8a8a8a]">{label}</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandColors[key]}
                  onChange={(e) =>
                    setBrandColors((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="h-9 w-12 cursor-pointer rounded border border-[#e5e5e5] p-0.5"
                />
                <Input
                  value={brandColors[key]}
                  onChange={(e) =>
                    setBrandColors((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="flex-1 font-mono text-xs"
                />
              </div>
              <div
                className="h-8 rounded-md border border-[#e5e5e5]"
                style={{ backgroundColor: brandColors[key] }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
          フォント
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-[#8a8a8a]">見出しフォント</Label>
            <Select
              value={fonts.heading}
              onValueChange={(v) => setFonts((prev) => ({ ...prev, heading: v }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[#8a8a8a]">本文フォント</Label>
            <Select
              value={fonts.body}
              onValueChange={(v) => setFonts((prev) => ({ ...prev, body: v }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t border-[#e5e5e5]">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-[#c9a96e] hover:bg-[#c9a96e]/90 text-white px-8"
        >
          プロジェクトを作成
        </Button>
      </div>
    </div>
  );
}
