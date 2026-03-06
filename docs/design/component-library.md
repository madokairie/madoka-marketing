# Madoka Launch Engine - Component Library

## shadcn/ui Components

使用するshadcn/uiコンポーネントとカスタマイズ方針。

### Core Components

| Component | 用途 | カスタマイズ |
|-----------|------|-------------|
| Button | 全ボタン | 5バリアント（primary/secondary/accent/ghost/destructive） |
| Input | テキスト入力 | 高さ40px、フォーカスリング |
| Textarea | 長文入力 | auto-resize、行数制限 |
| Select | ドロップダウン | 角丸8px |
| Checkbox | チェックボックス | チェックリスト用 |
| RadioGroup | ラジオボタン | プロジェクトタイプ選択等 |
| Switch | トグル | LINE/メール切替 |
| Label | ラベル | 必須マーク（*）対応 |
| Form | フォーム | react-hook-form + zod統合 |

### Layout Components

| Component | 用途 | カスタマイズ |
|-----------|------|-------------|
| Card | コンテンツカード | 角丸12px、ホバーシャドウ |
| Sheet | サイドパネル | AI提案パネル |
| Dialog | モーダル | バックドロップブラー |
| Tabs | タブ切替 | アンダーラインスタイル |
| Separator | 区切り線 | 余白込みの統一高さ |
| ScrollArea | スクロール領域 | セクションリスト等 |
| Resizable | リサイズ可能パネル | エディタ分割 |

### Navigation Components

| Component | 用途 | カスタマイズ |
|-----------|------|-------------|
| NavigationMenu | サイドバーナビ | アクティブ状態のスタイル |
| Breadcrumb | パンくずリスト | プロジェクト > モジュール > 詳細 |
| Pagination | ページネーション | ナレッジ/実績一覧 |
| Command | コマンドパレット | クイックアクション |

### Data Display

| Component | 用途 | カスタマイズ |
|-----------|------|-------------|
| Table | データ一覧 | 配信一覧、数値データ |
| Badge | ステータス表示 | 生成状態、プロジェクトタイプ |
| Avatar | ユーザー/AI | チャットUI |
| Progress | 進捗バー | 生成進捗、達成率 |
| Skeleton | ローディング | シマー付き |

### Feedback

| Component | 用途 | カスタマイズ |
|-----------|------|-------------|
| Toast | 通知 | 右下固定、ステータスカラーバー |
| Alert | アラート | AI診断結果 |
| AlertDialog | 確認ダイアログ | 削除確認 |
| Tooltip | ツールチップ | 用語説明 |
| Popover | ポップオーバー | カレンダーの配信詳細 |
| HoverCard | ホバーカード | ナレッジ参照元表示 |

### Data Input

| Component | 用途 | カスタマイズ |
|-----------|------|-------------|
| Calendar | 日付選択 | ローンチ日設定 |
| DatePicker | 日付ピッカー | Calendar + Popover |
| Slider | スライダー | CVR設定 |
| DropdownMenu | ドロップダウンメニュー | アクションメニュー |
| ContextMenu | 右クリックメニュー | セクション操作 |

## Custom Components

shadcn/uiにないプロジェクト固有のコンポーネント。

### FunnelVisualizer

```typescript
interface FunnelVisualizerProps {
  steps: FunnelStep[];
  metrics?: LaunchMetric;      // 実績データ（ダッシュボード時）
  editable?: boolean;           // 編集可能か
  onStepClick?: (step) => void;
  onStepReorder?: (steps) => void;
}
```

逆三角形のファネル図。各ステップに名称/目標人数/CVRを表示。ダッシュボード連携時は実績をオーバーレイ。

### CopyScoreRing

```typescript
interface CopyScoreRingProps {
  score: number;              // 0-100
  detail: CopyScoreDetail;   // 各項目スコア
  onImprove?: (item) => void; // 改善ボタンクリック
}
```

100点満点のリングチャート + 各項目の横棒グラフ。

### AIChat

```typescript
interface AIChatProps {
  context: 'persona' | 'edit' | 'diagnosis' | 'general';
  projectId: string;
  onSuggestionSelect?: (suggestion) => void;
}
```

AI対話UI。コンテキストに応じてプロンプトを切替。

### SectionEditor

```typescript
interface SectionEditorProps {
  sections: LPSection[];
  activeSection: string;
  onSectionChange: (id) => void;
  onContentUpdate: (id, content) => void;
  onRegenerate: (id) => void;
  onCopy: (id) => void;
}
```

2カラムのセクション編集画面。左にナビ、右にエディタ。

### DistributionPreview

```typescript
interface DistributionPreviewProps {
  distribution: Distribution;
  channel: 'line' | 'email';
  onChannelSwitch: (channel) => void;
  onCopy: () => void;
  onEdit: (content) => void;
}
```

LINE/メールの切替プレビュー。

### LaunchCalendar

```typescript
interface LaunchCalendarProps {
  events: CalendarEvent[];
  view: 'month' | 'week';
  onEventClick: (event) => void;
  onEventDrag: (event, newDate) => void;
  checklist: ChecklistItem[];
}
```

配信カレンダー。色分け + ドラッグ&ドロップ + チェックリスト。

### MetricInput

```typescript
interface MetricInputProps {
  steps: FunnelStep[];
  previousMetric: LaunchMetric;
  onSubmit: (metric) => void;
}
```

日次数値入力。差分入力方式。

### KPICard

```typescript
interface KPICardProps {
  label: string;
  value: number | string;
  target?: number | string;
  trend?: 'up' | 'down' | 'flat';
  format?: 'currency' | 'number' | 'percent';
}
```

ダッシュボードのKPIカード。

### DiagnosisPanel

```typescript
interface DiagnosisPanelProps {
  diagnosis: AIDiagnosis;
  onGenerateContent: (action) => void;
}
```

AI診断結果表示 + ワンクリックコンテンツ生成ボタン。

## Third-party Libraries

| ライブラリ | バージョン | 用途 |
|-----------|-----------|------|
| recharts | ^2.x | グラフ/チャート |
| @dnd-kit/core | ^6.x | ドラッグ&ドロップ |
| react-markdown | ^9.x | マークダウンレンダリング |
| react-hook-form | ^7.x | フォーム管理 |
| zod | ^3.x | バリデーション |
| date-fns | ^3.x | 日付操作 |
| zustand | ^4.x | 状態管理 |
| ai (Vercel AI SDK) | ^3.x | ストリーミングUI |
| @supabase/supabase-js | ^2.x | Supabase SDK |
| dompurify | ^3.x | XSSサニタイズ |
