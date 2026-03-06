"use client";

import { useState } from "react";
import { Plus, BookOpen, Search, ExternalLink, Tag, FileText, Send, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockKnowledge = [
  {
    id: "k1",
    type: "lp" as const,
    title: "セールスLP - ビジネス構築講座 2025年版",
    content: "起業初期の女性向け高額講座のセールスLP。問題提起→共感→解決策の流れで構成。",
    tags: ["高額商品", "女性起業家", "教育系"],
    source_url: null,
    created_at: "2025-10-15T00:00:00Z",
  },
  {
    id: "k2",
    type: "distribution" as const,
    title: "ステップ配信 - 7日間メール講座",
    content: "オプトイン後の7日間ステップ配信。価値提供→信頼構築→セミナー案内の流れ。",
    tags: ["ステップ配信", "メール", "教育系"],
    source_url: null,
    created_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "k3",
    type: "benchmark" as const,
    title: "ベンチマーク - A社のローンチLP",
    content: "競合A社のセールスLP。ヘッドラインが強く、ビフォーアフターの見せ方が参考になる。",
    tags: ["競合分析", "LP参考"],
    source_url: "https://example.com",
    created_at: "2025-12-01T00:00:00Z",
  },
  {
    id: "k4",
    type: "lp" as const,
    title: "オプトインLP - 無料PDF配布",
    content: "リードマグネット配布用のオプトインLP。シンプルな構成で高CVR。",
    tags: ["オプトイン", "リードマグネット"],
    source_url: null,
    created_at: "2026-01-10T00:00:00Z",
  },
];

const typeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  lp: { label: "LP", icon: FileText, color: "text-[#4a6fa5] bg-[#4a6fa5]/10" },
  distribution: { label: "配信文", icon: Send, color: "text-[#2d6a4f] bg-[#2d6a4f]/10" },
  benchmark: { label: "ベンチマーク", icon: BarChart3, color: "text-[#c9a96e] bg-[#c9a96e]/10" },
  seminar: { label: "セミナー", icon: BookOpen, color: "text-[#a3333d] bg-[#a3333d]/10" },
};

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = mockKnowledge.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (search && !item.title.includes(search) && !item.content.includes(search)) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2332]">ナレッジベース</h1>
          <p className="text-sm text-[#8a8a8a] mt-1">過去の素材・ベンチマークを管理</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">
              <Plus className="h-4 w-4 mr-2" />
              素材を登録
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>ナレッジを登録</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>タイプ</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="選択してください" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lp">LP</SelectItem>
                    <SelectItem value="distribution">配信文</SelectItem>
                    <SelectItem value="benchmark">ベンチマーク</SelectItem>
                    <SelectItem value="seminar">セミナー資料</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>タイトル</Label>
                <Input placeholder="素材のタイトル" />
              </div>
              <div>
                <Label>内容</Label>
                <Textarea placeholder="LP本文、配信文、URL等を貼り付け" rows={6} />
              </div>
              <div>
                <Label>URL（任意）</Label>
                <Input placeholder="https://..." />
              </div>
              <div>
                <Label>タグ（カンマ区切り）</Label>
                <Input placeholder="高額商品, 女性起業家" />
              </div>
              <Button className="w-full bg-[#1a2332] hover:bg-[#2a3342] text-white" onClick={() => setDialogOpen(false)}>
                登録する
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Search */}
      <div className="flex items-center gap-4 mb-6">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="bg-white border border-[#e5e5e5]">
            <TabsTrigger value="all" className="text-sm data-[state=active]:bg-[#1a2332] data-[state=active]:text-white">全て</TabsTrigger>
            <TabsTrigger value="lp" className="text-sm data-[state=active]:bg-[#1a2332] data-[state=active]:text-white">LP</TabsTrigger>
            <TabsTrigger value="distribution" className="text-sm data-[state=active]:bg-[#1a2332] data-[state=active]:text-white">配信文</TabsTrigger>
            <TabsTrigger value="benchmark" className="text-sm data-[state=active]:bg-[#1a2332] data-[state=active]:text-white">ベンチマーク</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
          <Input
            placeholder="検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Knowledge List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <Card key={item.id} className="border-[#e5e5e5] hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${config.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-[#1a2332] text-sm truncate">{item.title}</h3>
                      <Badge variant="outline" className="text-xs shrink-0">{config.label}</Badge>
                    </div>
                    <p className="text-sm text-[#8a8a8a] line-clamp-2">{item.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#e5e5e5] text-[#8a8a8a]">
                          <Tag className="h-3 w-3 mr-1" />{tag}
                        </Badge>
                      ))}
                      {item.source_url && (
                        <Badge variant="outline" className="text-xs border-[#4a6fa5]/30 text-[#4a6fa5]">
                          <ExternalLink className="h-3 w-3 mr-1" />URL
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-[#8a8a8a] shrink-0">
                    {new Date(item.created_at).toLocaleDateString("ja-JP")}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="border-[#e5e5e5] border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="h-8 w-8 text-[#e5e5e5] mb-4" />
            <p className="text-[#8a8a8a] text-sm">該当するナレッジがありません</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
