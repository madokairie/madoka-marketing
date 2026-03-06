"use client";

import { useState } from "react";
import { Plus, Star, Search, Tag, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockTestimonials = [
  {
    id: "t1",
    name: "田中 美咲 様",
    content: "講座受講後3ヶ月で月収が20万円から100万円に達成しました。特にセールスファネルの構築方法が実践的で、すぐに結果に繋がりました。",
    before_state: "月収20万円、集客に悩んでいた",
    after_state: "月収100万円を安定的に達成",
    tags: ["収入UP", "起業", "ビジネス構築講座"],
    permission: "public" as const,
    created_at: "2025-09-15T00:00:00Z",
  },
  {
    id: "t2",
    name: "佐藤 亜美 様",
    content: "自分のビジネスに自信が持てなかったのですが、講座で学んだポジショニングとメッセージ設計のおかげで、高単価商品が自然と売れるようになりました。",
    before_state: "低単価サービスしか売れなかった",
    after_state: "50万円の講座が毎月3件成約",
    tags: ["高単価", "ポジショニング", "ビジネス構築講座"],
    permission: "public" as const,
    created_at: "2025-10-20T00:00:00Z",
  },
  {
    id: "t3",
    name: "K.Y 様",
    content: "ローンチの仕組みが全くわからなかったのですが、ステップバイステップで教えていただき、初めてのローンチで売上500万円を達成できました。",
    before_state: "ローンチ未経験",
    after_state: "初ローンチで売上500万円達成",
    tags: ["ローンチ", "初心者", "ビジネス構築講座"],
    permission: "anonymous" as const,
    created_at: "2025-12-05T00:00:00Z",
  },
  {
    id: "t4",
    name: "山本 理恵 様",
    content: "SNS集客に頼りきりで疲弊していましたが、ファネルを構築してからは自動で見込み客が集まるようになりました。時間的な余裕も生まれています。",
    before_state: "SNS投稿に疲弊、月商50万円",
    after_state: "自動集客で月商200万円、週3稼働",
    tags: ["自動化", "ファネル構築", "ビジネス構築講座"],
    permission: "public" as const,
    created_at: "2026-01-10T00:00:00Z",
  },
];

export default function TestimonialsPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = mockTestimonials.filter((item) => {
    if (search && !item.name.includes(search) && !item.content.includes(search) && !item.tags.some(t => t.includes(search))) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2332]">お客様の声</h1>
          <p className="text-sm text-[#8a8a8a] mt-1">実績・社会的証明を一元管理</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">
              <Plus className="h-4 w-4 mr-2" />
              実績を登録
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>お客様の声を登録</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>お名前</Label>
                <Input placeholder="田中 美咲 様" />
              </div>
              <div>
                <Label>実績・感想</Label>
                <Textarea placeholder="お客様の声を入力" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Before（変化前）</Label>
                  <Input placeholder="月収20万円" />
                </div>
                <div>
                  <Label>After（変化後）</Label>
                  <Input placeholder="月収100万円" />
                </div>
              </div>
              <div>
                <Label>タグ（カンマ区切り）</Label>
                <Input placeholder="収入UP, 起業" />
              </div>
              <div>
                <Label>公開設定</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="選択" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">公開可（実名）</SelectItem>
                    <SelectItem value="anonymous">匿名のみ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-[#1a2332] hover:bg-[#2a3342] text-white" onClick={() => setDialogOpen(false)}>
                登録する
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-xs mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
        <Input
          placeholder="名前・内容・タグで検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="border-[#e5e5e5] hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-full bg-[#c9a96e]/10 shrink-0">
                  <Star className="h-4 w-4 text-[#c9a96e]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#1a2332] text-sm">{item.name}</h3>
                  {item.permission === "anonymous" && (
                    <Badge variant="outline" className="text-xs mt-0.5">匿名</Badge>
                  )}
                </div>
              </div>

              <div className="relative pl-4 border-l-2 border-[#c9a96e]/30 mb-4">
                <Quote className="absolute -left-2.5 -top-1 h-4 w-4 text-[#c9a96e] bg-white" />
                <p className="text-sm text-[#2d2d2d] leading-relaxed">{item.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#faf9f7] rounded-lg mb-3">
                <div>
                  <p className="text-xs text-[#8a8a8a] mb-0.5">Before</p>
                  <p className="text-xs font-medium text-[#a3333d]">{item.before_state}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a8a8a] mb-0.5">After</p>
                  <p className="text-xs font-medium text-[#2d6a4f]">{item.after_state}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-[#e5e5e5] text-[#8a8a8a]">
                    <Tag className="h-3 w-3 mr-1" />{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="border-[#e5e5e5] border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Star className="h-8 w-8 text-[#e5e5e5] mb-4" />
            <p className="text-[#8a8a8a] text-sm">該当する実績がありません</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
