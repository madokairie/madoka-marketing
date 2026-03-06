import Link from "next/link";
import { Plus, Rocket, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2332]">ダッシュボード</h1>
          <p className="text-sm text-[#8a8a8a] mt-1">プロジェクトの概要と進捗</p>
        </div>
        <Link href="/projects/new">
          <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">
            <Plus className="h-4 w-4 mr-2" />
            新規プロジェクト
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-[#e5e5e5]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1a2332]/5">
                <Rocket className="h-5 w-5 text-[#1a2332]" />
              </div>
              <div>
                <p className="text-sm text-[#8a8a8a]">アクティブプロジェクト</p>
                <p className="text-2xl font-semibold font-[family-name:var(--font-inter)] text-[#1a2332]">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#e5e5e5]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#2d6a4f]/10">
                <TrendingUp className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-sm text-[#8a8a8a]">ローンチ中</p>
                <p className="text-2xl font-semibold font-[family-name:var(--font-inter)] text-[#1a2332]">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#e5e5e5]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#c9a96e]/10">
                <Users className="h-5 w-5 text-[#c9a96e]" />
              </div>
              <div>
                <p className="text-sm text-[#8a8a8a]">ナレッジ登録数</p>
                <p className="text-2xl font-semibold font-[family-name:var(--font-inter)] text-[#1a2332]">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card className="border-[#e5e5e5] border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-4 rounded-full bg-[#1a2332]/5 mb-4">
            <Rocket className="h-8 w-8 text-[#8a8a8a]" />
          </div>
          <h3 className="text-lg font-semibold text-[#1a2332] mb-2">
            最初のプロジェクトを作成しましょう
          </h3>
          <p className="text-sm text-[#8a8a8a] text-center max-w-md mb-6">
            商品情報・ペルソナ・オファーを設定すると、LP・配信文・セミナースライドなどを
            AIが一括で生成します。
          </p>
          <Link href="/projects/new">
            <Button className="bg-[#c9a96e] hover:bg-[#b8984d] text-white">
              <Plus className="h-4 w-4 mr-2" />
              新規プロジェクトを作成
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
