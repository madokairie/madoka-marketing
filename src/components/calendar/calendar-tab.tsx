"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckSquare } from "lucide-react";

const mockEvents = [
  { date: "3/15", type: "pre_pre_launch", title: "プリプリローンチ #1", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { date: "3/17", type: "pre_pre_launch", title: "プリプリローンチ #2", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { date: "3/20", type: "pre_pre_launch", title: "プリプリローンチ #3", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { date: "3/25", type: "pre_launch", title: "プリローンチ #1", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { date: "3/28", type: "pre_launch", title: "プリローンチ #2", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { date: "4/1", type: "pre_launch", title: "プリローンチ #3（告知）", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { date: "4/5", type: "step", title: "オプトイン開始", color: "bg-green-100 text-green-700 border-green-200" },
  { date: "4/8", type: "reminder", title: "セミナーリマインド #1", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { date: "4/10", type: "reminder", title: "セミナーリマインド #2", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { date: "4/11", type: "reminder", title: "セミナー当日リマインド", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { date: "4/12", type: "sales", title: "セールス開始", color: "bg-red-100 text-red-700 border-red-200" },
  { date: "4/14", type: "countdown", title: "カウントダウン 3日前", color: "bg-red-100 text-red-700 border-red-200" },
  { date: "4/15", type: "countdown", title: "カウントダウン 最終日", color: "bg-red-100 text-red-700 border-red-200" },
];

const checklistItems = [
  { label: "オプトイン後ステップ配信 (5通)", done: true },
  { label: "セミナーリマインド (4通)", done: true },
  { label: "セミナー後フォロー (3通)", done: false },
  { label: "セールス期間配信 (5通)", done: false },
  { label: "購入後オンボーディング (3通)", done: false },
];

export function CalendarTab() {
  return (
    <div className="space-y-6">
      {/* Timeline */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#4a6fa5]" />
            <CardTitle className="text-base">配信カレンダー</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm text-[#8a8a8a] w-12 shrink-0 font-[family-name:var(--font-inter)]">
                  {event.date}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#1a2332] shrink-0" />
                <div className="h-px bg-[#e5e5e5] w-4 shrink-0" />
                <Badge variant="outline" className={`text-xs ${event.color}`}>
                  {event.title}
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#e5e5e5]">
            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-200">PPL</Badge>
            <span className="text-xs text-[#8a8a8a]">プリプリローンチ</span>
            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-200">PL</Badge>
            <span className="text-xs text-[#8a8a8a]">プリローンチ</span>
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">STEP</Badge>
            <span className="text-xs text-[#8a8a8a]">ステップ配信</span>
            <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-200">REM</Badge>
            <span className="text-xs text-[#8a8a8a]">リマインド</span>
            <Badge variant="outline" className="text-xs bg-red-100 text-red-700 border-red-200">SALE</Badge>
            <span className="text-xs text-[#8a8a8a]">セールス</span>
          </div>
        </CardContent>
      </Card>

      {/* UTAGE Checklist */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-[#2d6a4f]" />
            <CardTitle className="text-base">UTAGE設定チェックリスト</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Checkbox defaultChecked={item.done} />
                <span className={`text-sm ${item.done ? "text-[#8a8a8a] line-through" : "text-[#2d2d2d]"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
