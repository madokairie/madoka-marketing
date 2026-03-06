"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Edit3,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { LandingPage, LPSection, SectionStatus, CopyScore } from "@/lib/types";
import { CopyScoreRing } from "./copy-score-ring";
import { CopyButton } from "@/components/common/copy-button";

interface LPEditorProps {
  landingPage: LandingPage;
  onBack: () => void;
}

function getSectionStatusIcon(status: SectionStatus) {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="h-3.5 w-3.5 text-[#2d6a4f]" />;
    case "edited":
      return <Edit3 className="h-3.5 w-3.5 text-[#4a6fa5]" />;
    case "generated":
      return <Sparkles className="h-3.5 w-3.5 text-[#c9a96e]" />;
    case "draft":
      return <Clock className="h-3.5 w-3.5 text-[#8a8a8a]" />;
  }
}

function getSectionStatusLabel(status: SectionStatus) {
  switch (status) {
    case "approved":
      return "承認済み";
    case "edited":
      return "編集済み";
    case "generated":
      return "AI生成";
    case "draft":
      return "下書き";
  }
}

const mockSections: LPSection[] = [
  {
    id: "sec-1",
    landing_page_id: "lp-2",
    section_order: 1,
    section_type: "first_view",
    title: "ファーストビュー",
    status: "approved",
    content: `# たった3ヶ月で売上が3倍に。

## 年商1000万を目指す女性起業家のための
## 「ビジネス構築マスター講座」無料セミナー

あなたは今、こんな悩みを抱えていませんか？

- 毎月の売上が安定しない
- 高額商品を作りたいけど、売れるか不安
- SNSを頑張っているのに、集客に繋がらない

**受講生の80%が3ヶ月で売上2倍以上を達成した**
再現性の高い独自メソッドを、このセミナーで初公開します。

【無料セミナーに参加する】`,
  },
  {
    id: "sec-2",
    landing_page_id: "lp-2",
    section_order: 2,
    section_type: "problem",
    title: "問題提起",
    status: "generated",
    content: `## あなたのビジネス、こんな状態になっていませんか？

起業して数年。最初の頃のワクワク感は薄れ、いつの間にか「このままで大丈夫だろうか」という不安が日常になっていませんか。

SNSの投稿を毎日頑張っている。セミナーにも参加している。でも、売上は横ばい。むしろ、頑張れば頑張るほど疲弊していく——。

**月商30万の壁を超えられない。**
**高額商品を作りたいけど、売れる自信がない。**
**お客様の声はいただけるのに、次の購入に繋がらない。**

もしあなたが一つでも当てはまるなら、このセミナーはあなたのためのものです。`,
  },
  {
    id: "sec-3",
    landing_page_id: "lp-2",
    section_order: 3,
    section_type: "problem_expansion",
    title: "問題の拡大",
    status: "generated",
    content: `## このまま放置すると、どうなるか知っていますか？

「いつか売上が上がるだろう」——その"いつか"は、残念ながら自然にはやってきません。

実は、年商300万円の壁を超えられない起業家の**87%**が、3年以内にビジネスを辞めているというデータがあります。

問題は「頑張りが足りない」のではありません。

**正しい仕組みを持っていないこと**が、すべての原因です。

仕組みがないまま時間だけが過ぎると：
- 安い単価の仕事で時間が埋まり、高額商品を作る余裕がなくなる
- 「値上げしたら客が離れる」という恐怖が強まる
- 同業他社との差別化ができず、価格競争に巻き込まれる
- 最終的に「自分には向いていないのでは」と自信を失う

あなたには、そうなってほしくないのです。`,
  },
  {
    id: "sec-4",
    landing_page_id: "lp-2",
    section_order: 4,
    section_type: "cause",
    title: "原因の特定",
    status: "generated",
    content: `## なぜ、頑張っても売上が上がらないのか？

その原因は、あなたの能力不足ではありません。

**ビジネスの「設計図」がないまま走っている**からです。

多くの女性起業家がハマる3つの落とし穴：

### 1. 集客導線が「点」になっている
SNS投稿、ブログ、セミナー...すべてがバラバラで、一本の流れになっていません。

### 2. 商品設計が「自分目線」になっている
「こんなことができます」ではなく、「あなたの悩みをこう解決します」という設計が必要です。

### 3. 価格設定が「怖さ」で決まっている
「この金額で売れるだろうか」という恐怖ベースではなく、提供価値ベースで決める必要があります。

これら3つは、正しい方法を知れば**誰でも**解決できます。`,
  },
  {
    id: "sec-5",
    landing_page_id: "lp-2",
    section_order: 5,
    section_type: "solution",
    title: "解決法の提示",
    status: "generated",
    content: `## 解決策は「ビジネス構築の3ステップメソッド」

100名以上の受講生が成果を出した、再現性の高い独自メソッドをご紹介します。

### Step 1: ポジショニング設計
あなただけの「選ばれる理由」を明確にします。競合と比較されない独自のポジションを作ることで、価格競争から抜け出せます。

### Step 2: 高額商品設計
顧客の「Before → After」を明確にした、価値で選ばれる商品を設計します。¥500,000の商品が「安い」と感じていただける設計手法です。

### Step 3: 自動集客導線構築
SNS → 無料オファー → セミナー → 個別相談 → 成約という一本の導線を構築。あなたが寝ている間も、見込み客が自動で集まる仕組みを作ります。

この3ステップを、セミナーで**具体的な事例と共に**お伝えします。`,
  },
  {
    id: "sec-6",
    landing_page_id: "lp-2",
    section_order: 6,
    section_type: "benefits",
    title: "学べること",
    status: "generated",
    content: `## このセミナーで手に入る7つのこと

**1. 年商1000万を実現する「ビジネス設計図」の全体像**
成功する起業家が必ず持っている設計図のフレームワークを公開します。

**2. 高額商品が「安い」と言われる価格設定の秘密**
¥500,000の商品を自信を持って提案できるようになる、価値の見せ方を学びます。

**3. 「あなただから」と選ばれるポジショニング手法**
レッドオーシャンでも競合と戦わずに済む、独自ポジションの作り方。

**4. 集客を自動化する導線設計テンプレート**
明日から使える、実証済みの集客導線テンプレートをプレゼント。

**5. 成約率80%を実現するセミナー構成術**
セールスが苦手でも自然に成約できる、セミナーの型をお教えします。

**6. 月商100万を安定させるリピート戦略**
一度きりのお客様を、ファンに変えるリピート設計の考え方。

**7. 受講生100名の成功パターン分析レポート**
何をどの順番でやれば成果が出るのか、データに基づく最短ルートを公開。`,
  },
  {
    id: "sec-7",
    landing_page_id: "lp-2",
    section_order: 7,
    section_type: "social_proof",
    title: "実績・証明",
    status: "edited",
    content: `## 受講生の声

### 田中美咲さん（38歳・コーチング業）
> 受講前は月商20万で頭打ち。講座開始3ヶ月で月商80万、半年後には月商150万を達成しました。何より「自分の商品に自信が持てるようになった」ことが一番の変化です。

### 山本恵子さん（42歳・セラピスト）
> 5年間、単価5,000円のセッションを続けていました。講座で高額パッケージの作り方を学び、今は30万円のコースが毎月安定して売れています。

### 佐藤理沙さん（35歳・デザイナー）
> 「高いと思われるのでは」という恐怖で値上げできずにいました。ポジショニングを見直した結果、単価を3倍にしても成約率が上がりました。

### 実績データ
- **受講生数**: 100名以上
- **3ヶ月以内の売上アップ率**: 80%
- **平均売上増加倍率**: 2.7倍
- **リピート率**: 92%`,
  },
  {
    id: "sec-8",
    landing_page_id: "lp-2",
    section_order: 8,
    section_type: "instructor",
    title: "講師紹介",
    status: "generated",
    content: `## 講師プロフィール

### ビジネス構築コンサルタント

10年間で100名以上の女性起業家の売上アップを支援。自身も起業初期に年商200万から年商3000万へ成長させた経験を持つ。

「頑張らない仕組み」をテーマに、再現性の高いビジネス構築メソッドを体系化。受講生の80%が3ヶ月以内に売上2倍以上を達成している。

#### 経歴
- 大手広告代理店にて10年間マーケティングを担当
- 独立後、3年で年商3000万を達成
- 女性起業家向けコンサルティングを開始
- 累計100名以上の売上アップを支援
- 著書「売れる仕組みの作り方」（出版社名）

#### メディア掲載
- 日経ウーマン、VERY、anan等の女性誌に掲載多数`,
  },
  {
    id: "sec-9",
    landing_page_id: "lp-2",
    section_order: 9,
    section_type: "bonus",
    title: "参加特典",
    status: "generated",
    content: `## セミナー参加者限定 3大特典

### 特典1: 「売上3倍ロードマップ」テンプレート（¥50,000相当）
あなたの現在地から年商1000万までの具体的なステップを可視化できるテンプレート。セミナー当日にお渡しします。

### 特典2: 「高額商品設計」ワークシート（¥30,000相当）
セミナーで学んだ内容をすぐに実践できる、高額商品設計のためのワークシート。穴埋め式なので、その日のうちに商品設計が完成します。

### 特典3: 1週間限定 個別相談チケット（¥100,000相当）
セミナー参加者限定で、通常¥100,000の個別コンサルティングを無料でご提供。あなたのビジネスに合わせた具体的なアドバイスをお伝えします。

**3つの特典を合わせると¥180,000相当。**
これが今回、無料で手に入ります。`,
  },
  {
    id: "sec-10",
    landing_page_id: "lp-2",
    section_order: 10,
    section_type: "cta",
    title: "概要・CTA",
    status: "generated",
    content: `## セミナー概要

| 項目 | 内容 |
|------|------|
| 日時 | 2026年4月15日（水）14:00〜16:00 |
| 場所 | オンライン（Zoom） |
| 参加費 | **無料**（通常¥10,000） |
| 定員 | **先着30名** |
| 対象 | 年商1000万を目指す女性起業家 |

---

### いますぐ、無料セミナーに申し込む

あなたのビジネスを次のステージへ。
3ヶ月後、「あの時セミナーに参加してよかった」と思える未来を、一緒に作りましょう。

**【無料セミナーに参加する】**

※ お申込み後、すぐにZoomリンクをお送りします
※ 録画配信はございません。当日のライブ参加をお願いします`,
  },
  {
    id: "sec-11",
    landing_page_id: "lp-2",
    section_order: 11,
    section_type: "urgency",
    title: "緊急性・限定性",
    status: "generated",
    content: `## なぜ、今すぐ申し込むべきなのか

### 理由1: 先着30名限定
一人ひとりに丁寧にお伝えするため、少人数制にしています。定員に達し次第、募集を締め切ります。

### 理由2: 特典は今回限り
¥180,000相当の3大特典は、この募集期間中にお申し込みいただいた方だけのものです。次回開催での特典内容は未定です。

### 理由3: 個別相談チケットの枠に限りがあります
特典3の個別相談は、物理的にお受けできる人数に限りがあります。先着順でのご案内となります。

**前回のセミナーは告知開始から3日で満席になりました。**

「気になる」と思った今が、申し込みのベストタイミングです。`,
  },
  {
    id: "sec-12",
    landing_page_id: "lp-2",
    section_order: 12,
    section_type: "postscript",
    title: "追伸",
    status: "generated",
    content: `## 追伸

最後まで読んでいただき、ありがとうございます。

実は私自身も、起業初期は「このまま続けていて大丈夫だろうか」と不安な日々を過ごしていました。

年商200万の時代、毎月の支払いに怯え、「もう会社員に戻ろうか」と何度も考えました。

でも、ある時「正しい仕組みさえ作れば、ビジネスは必ず成長する」ということに気づいたのです。

そこから3年で年商3000万。そして今は、同じ想いを持つ女性起業家の方々のお手伝いをしています。

あの時の私と同じように悩んでいるあなたへ。

このセミナーが、あなたのビジネスの転機になることを願っています。

一歩踏み出す勇気があれば、未来は必ず変わります。

セミナーでお会いできることを楽しみにしています。

**【無料セミナーに参加する】**`,
  },
];

const mockAISuggestions = [
  {
    type: "improvement" as const,
    text: "ファーストビューの見出しに具体的な数字（例：「3ヶ月で売上3倍」）を入れることで、説得力が増します。",
  },
  {
    type: "warning" as const,
    text: "問題提起セクションの文章が少し長めです。箇条書きを活用して読みやすさを改善しましょう。",
  },
  {
    type: "suggestion" as const,
    text: "社会的証明セクションに動画テスティモニアルへの誘導を追加すると、信頼性が向上します。",
  },
];

export function LPEditor({ landingPage, onBack }: LPEditorProps) {
  const [selectedSectionId, setSelectedSectionId] = useState(mockSections[0].id);
  const [sections, setSections] = useState(mockSections);
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [editingContent, setEditingContent] = useState<string | null>(null);

  const selectedSection = sections.find((s) => s.id === selectedSectionId)!;
  const displayContent = editingContent !== null ? editingContent : selectedSection.content;

  const scoreDetail: CopyScore = landingPage.score_detail || {
    headline: 85,
    problemStatement: 80,
    logicFlow: 75,
    socialProof: 82,
    offer: 70,
    cta: 78,
    objectionHandling: 72,
    readability: 85,
    targetFit: 80,
    uniqueness: 73,
    total: 78,
  };

  const handleContentChange = (value: string) => {
    setEditingContent(value);
  };

  const handleSave = () => {
    if (editingContent !== null) {
      setSections((prev) =>
        prev.map((s) =>
          s.id === selectedSectionId
            ? { ...s, content: editingContent, status: "edited" as SectionStatus }
            : s
        )
      );
      setEditingContent(null);
    }
  };

  const handleSectionSelect = (sectionId: string) => {
    // Save current edits before switching
    if (editingContent !== null) {
      handleSave();
    }
    setSelectedSectionId(sectionId);
    setEditingContent(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-[#8a8a8a] hover:text-[#2d2d2d]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          LP一覧
        </Button>
        <div className="h-4 w-px bg-[#e5e5e5]" />
        <h3 className="font-semibold text-[#1a2332]">
          セミナーLP編集
        </h3>
        <Badge className="bg-[#2d6a4f]/10 text-[#2d6a4f] border-[#2d6a4f]/20 hover:bg-[#2d6a4f]/10">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          生成済み
        </Badge>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-12 gap-4" style={{ minHeight: "calc(100vh - 280px)" }}>
        {/* Left Sidebar: Section List + Score */}
        <div className="col-span-3 space-y-4">
          {/* Copy Score */}
          <div className="bg-white border border-[#e5e5e5] rounded-lg p-4">
            <CopyScoreRing
              score={landingPage.copy_score || 78}
              scoreDetail={scoreDetail}
              size={100}
            />
          </div>

          {/* Section List */}
          <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
            <div className="p-3 border-b border-[#e5e5e5]">
              <h4 className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                セクション一覧
              </h4>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section.id)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 flex items-center gap-2 border-b border-[#e5e5e5] last:border-b-0 transition-colors",
                    section.id === selectedSectionId
                      ? "bg-[#1a2332]/5 border-l-2 border-l-[#1a2332]"
                      : "hover:bg-[#faf9f7]"
                  )}
                >
                  <span className="text-xs text-[#8a8a8a] font-[var(--font-inter)] w-5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {getSectionStatusIcon(section.status)}
                  <span
                    className={cn(
                      "text-sm truncate",
                      section.id === selectedSectionId
                        ? "font-medium text-[#1a2332]"
                        : "text-[#2d2d2d]"
                    )}
                  >
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Editor + AI Panel */}
        <div className="col-span-9 flex flex-col gap-4">
          {/* Editor */}
          <div className="flex-1 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e5]">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-[#1a2332]">
                  {selectedSection.title}
                </h4>
                <Badge
                  variant="outline"
                  className="text-xs border-[#e5e5e5]"
                >
                  {getSectionStatusIcon(selectedSection.status)}
                  <span className="ml-1">{getSectionStatusLabel(selectedSection.status)}</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={displayContent} />
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e]/5"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  セクション再生成
                </Button>
                {editingContent !== null && (
                  <Button
                    size="sm"
                    className="bg-[#1a2332] hover:bg-[#2a3342] text-white"
                    onClick={handleSave}
                  >
                    保存
                  </Button>
                )}
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <Textarea
                value={displayContent}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[400px] w-full border-none shadow-none resize-none focus-visible:ring-0 text-sm leading-relaxed font-sans text-[#2d2d2d] p-0"
                placeholder="セクションの内容を入力..."
              />
            </div>
          </div>

          {/* AI Suggestion Panel */}
          <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
            <button
              onClick={() => setAiPanelOpen(!aiPanelOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#faf9f7] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[#c9a96e]" />
                <span className="text-sm font-medium text-[#1a2332]">
                  AI改善提案
                </span>
                <Badge className="bg-[#c9a96e]/10 text-[#c9a96e] border-[#c9a96e]/20 hover:bg-[#c9a96e]/10 text-xs">
                  {mockAISuggestions.length}件
                </Badge>
              </div>
              {aiPanelOpen ? (
                <ChevronUp className="h-4 w-4 text-[#8a8a8a]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#8a8a8a]" />
              )}
            </button>

            {aiPanelOpen && (
              <div className="px-4 pb-4 space-y-3">
                {mockAISuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg border text-sm",
                      suggestion.type === "improvement"
                        ? "bg-[#2d6a4f]/5 border-[#2d6a4f]/20 text-[#2d6a4f]"
                        : suggestion.type === "warning"
                        ? "bg-[#d4a843]/5 border-[#d4a843]/20 text-[#d4a843]"
                        : "bg-[#4a6fa5]/5 border-[#4a6fa5]/20 text-[#4a6fa5]"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>{suggestion.text}</p>
                    </div>
                    <div className="flex gap-2 mt-2 ml-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                      >
                        適用する
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-[#8a8a8a]"
                      >
                        無視
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
