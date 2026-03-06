"use client";

import { Settings, Key, Palette, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2332]">設定</h1>
        <p className="text-sm text-[#8a8a8a] mt-1">アプリケーションの設定を管理</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* API Settings */}
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-[#4a6fa5]" />
              <div>
                <CardTitle className="text-base">API設定</CardTitle>
                <CardDescription>外部サービスとの連携設定</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Claude API Key</Label>
              <Input type="password" placeholder="sk-ant-..." className="mt-1" />
              <p className="text-xs text-[#8a8a8a] mt-1">AI生成に使用するAnthropicのAPIキー</p>
            </div>
            <Separator />
            <div>
              <Label>Canva Client ID</Label>
              <Input placeholder="Client ID" className="mt-1" />
            </div>
            <div>
              <Label>Canva Client Secret</Label>
              <Input type="password" placeholder="Client Secret" className="mt-1" />
              <p className="text-xs text-[#8a8a8a] mt-1">スライド生成に使用するCanva APIの認証情報</p>
            </div>
            <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">保存</Button>
          </CardContent>
        </Card>

        {/* Default CVR Settings */}
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-[#c9a96e]" />
              <div>
                <CardTitle className="text-base">デフォルトCVR設定</CardTitle>
                <CardDescription>KPI逆算に使用するデフォルトのCVR値</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>LP→オプトイン</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={20} className="w-24" />
                  <span className="text-sm text-[#8a8a8a]">%</span>
                </div>
              </div>
              <div>
                <Label>オプトイン→セミナー申込</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={50} className="w-24" />
                  <span className="text-sm text-[#8a8a8a]">%</span>
                </div>
              </div>
              <div>
                <Label>セミナー着席率</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={70} className="w-24" />
                  <span className="text-sm text-[#8a8a8a]">%</span>
                </div>
              </div>
              <div>
                <Label>着席→個別相談</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={20} className="w-24" />
                  <span className="text-sm text-[#8a8a8a]">%</span>
                </div>
              </div>
              <div>
                <Label>個別相談→成約</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={50} className="w-24" />
                  <span className="text-sm text-[#8a8a8a]">%</span>
                </div>
              </div>
              <div>
                <Label>セールスLP→成約</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={5} className="w-24" />
                  <span className="text-sm text-[#8a8a8a]">%</span>
                </div>
              </div>
            </div>
            <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">保存</Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#8a8a8a]" />
              <div>
                <CardTitle className="text-base">アカウント</CardTitle>
                <CardDescription>アカウント情報の管理</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>メールアドレス</Label>
              <Input type="email" placeholder="your@email.com" className="mt-1" />
            </div>
            <Button className="bg-[#1a2332] hover:bg-[#2a3342] text-white">保存</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
