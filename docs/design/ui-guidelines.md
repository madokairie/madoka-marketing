# Madoka Launch Engine - UI Guidelines

## Aesthetic Direction

**Tone**: Professional Luxury
**Mood**: Intellectual / Trustworthy / Warm

マーケティングツールにありがちなポップさや派手さを排し、信頼できるビジネスパートナーとしての佇まいを持つ。Notion的なクリーンさと高級ブランドサイトの余白感を融合。

## Design Principles

### 1. Clarity First
- 情報階層を明確に。H1 > H2 > Body > Captionの視覚的差を確保
- 1画面1目的。画面の目的が3秒以内に伝わること
- データの可視化は直感的に。数字は大きく、ラベルは小さく

### 2. Breathing Space
- コンテンツ間の余白は最低24px
- セクション間は48px以上
- カード内のパディングは24px
- テキストブロックの行間は1.8（日本語）

### 3. Professional Warmth
- Deep Navy (#1a2332) をベースに、Warm Gold (#c9a96e) でアクセント
- Off White (#faf9f7) の温かみのある背景
- 冷たいグレーではなく、温かみのあるグレーを使用
- 角丸は8-12px（丸すぎず、角ばりすぎず）

### 4. Action-Oriented
- プライマリCTAは画面内で1つだけ目立たせる
- 次のアクションが常に視界に入る配置
- 空の状態（Empty State）には必ず行動喚起を含める

## Typography Guidelines

### Japanese Text
- フォント: Noto Sans JP
- 本文 line-height: 1.8（日本語の可読性を確保）
- letter-spacing: 0.02em
- font-feature-settings: "palt" 1（プロポーショナルメトリクス）
- 1行の最大文字数: 40文字程度（max-width: 680px）

### Numeric Display
- KPI、価格、CVR等の数値: Inter 600
- font-variant-numeric: tabular-nums（数字の等幅表示）
- 金額: 3桁ごとにカンマ区切り
- パーセンテージ: 小数点以下1桁

### 見出しルール
- H1: ページタイトルのみ。1ページに1つ
- H2: セクション見出し
- H3: サブセクション
- H4: カード内見出し

## Color Guidelines

### ベースカラーの使い方
- 背景: Off White (#faf9f7) / Dark Mode: #1c1c1e
- カード: White (#ffffff) / Dark Mode: #2c2c2e
- テキスト: #2d2d2d / Dark Mode: #faf9f7
- ボーダー: #e5e5e5 / Dark Mode: #3a3a3c

### アクセントカラーの使い方
- Deep Navy (#1a2332): プライマリボタン、重要なUI要素
- Warm Gold (#c9a96e): 成功指標、達成、プレミアム要素
- Steel Blue (#4a6fa5): リンク、インタラクティブ要素、フォーカス

### ステータスカラー
- Success (#2d6a4f): 達成、完了、目標超え
- Warning (#d4a843): 注意、目標やや下回り
- Error (#a3333d): 危険、大幅下回り、エラー
- Info (#4a6fa5): 情報、ヒント

### ダッシュボードでの色使い
- 目標達成率100%以上: Success Green
- 80-99%: Warning Amber
- 80%未満: Error Red
- ファネル図の各ステップは段階的に濃くなるネイビーグラデーション

## Component Guidelines

### カード
- 背景: White / Dark: #2c2c2e
- ボーダー: 1px solid #e5e5e5
- 角丸: 12px
- シャドウ: 0 1px 2px rgba(0,0,0,0.04)
- ホバー: シャドウを md に変更（200ms transition）
- パディング: 24px

### ボタン
- プライマリ: Deep Navy背景、白テキスト。1画面に1つだけ
- セカンダリ: ボーダーのみ、ネイビーテキスト
- ゴースト: ボーダーなし、ホバーで薄い背景
- アクセント(Gold): 特に目立たせたいCTA
- 角丸: 8px
- 高さ: 40px (default) / 36px (sm) / 48px (lg)
- ホバー: 150ms transition

### 入力フィールド
- ボーダー: 1px solid #e5e5e5
- フォーカス: Steel Blue (#4a6fa5) ボーダー + リング
- 角丸: 8px
- 高さ: 40px
- プレースホルダー: #8a8a8a

### モーダル
- 角丸: 16px
- バックドロップ: rgba(0,0,0,0.5) + blur(4px)
- 中央配置
- 最大幅: 560px (sm) / 720px (md) / 960px (lg)

### トースト通知
- 右下固定
- 3秒で自動消去（エラーは手動消去のみ）
- 角丸: 8px
- 左端にステータスカラーのバー

### ローディング
- スケルトンスクリーン（シマー付き）
- スピナーは使用しない
- AI生成中: テキストストリーミング表示 + パルスインジケーター

## Special UI Patterns

### AI対話UI
- ユーザーメッセージ: 右寄せ、薄いネイビー背景
- AIメッセージ: 左寄せ、白背景、ボーダー付き
- AIアイコン: シンプルなロゴマーク
- ストリーミング: テキストが1文字ずつ表示されるのではなく、チャンク単位で追加
- 提案カード: AI提案をカード形式で表示、クリックで選択/実行

### ファネルビジュアライザー
- 逆三角形のファネル形状
- 各ステップ: ネイビー系のグラデーション（上が薄く、下が濃く）
- ステップ間のCVR: 小さめのテキストで表示
- アクティブステップ: Gold (#c9a96e) のボーダー
- ボトルネック: Error Red のパルスアニメーション

### コピースコアリング
- リングチャート（100点満点）: 大きく中央に配置
- 色: 80-100 = Success, 60-79 = Warning, 0-59 = Error
- 各評価項目: 横棒グラフで10点満点を表示
- 弱い項目（6点以下）にはワンクリック改善ボタン

### セクション編集UI（LP/配信文）
- 2カラムレイアウト
- 左: セクションナビ（リスト形式、クリックで切替）
- 右: エディタ（マークダウン対応）
- 下部: AI提案パネル（折りたたみ可能）
- フローティングコピーボタン: 常に右下に表示

### ダッシュボードUI
- 上部: KPIカード3枚横並び（売上/成約数/達成率）
- 中央: ファネル進捗図（数値オーバーレイ）
- 下部左: 売上推移グラフ
- 下部右: AI診断パネル
- 色使いは達成率ベースで自動変化

## Motion Guidelines

### 基本ルール
- 全アニメーション200ms以下
- compositor propsのみ使用（transform, opacity）
- レイアウトプロパティ（width, height, margin, padding）のアニメーション禁止
- prefers-reduced-motion対応必須

### 使用箇所
- ページ遷移: opacity 200ms fade
- サイドバー開閉: transform 200ms translateX
- モーダル: opacity 200ms + transform 200ms scale(0.98→1)
- カードホバー: shadow 200ms
- ボタンホバー: background-color 150ms
- ドロップダウン: opacity 150ms + transform 150ms translateY(-4px→0)

### 禁止パターン
- バウンスアニメーション
- 回転アニメーション（ローディング含む）
- 色のグラデーションアニメーション
- 連続的なパルスアニメーション（注意喚起の一時的なパルスは例外）

## Layout Guidelines

### サイドバー
- 幅: 256px（折りたたみ時: 64px）
- 背景: White / Dark: #2c2c2e
- ナビゲーション項目: 各48px高
- アクティブ項目: 薄いネイビー背景 + 左端2pxのネイビーバー
- アイコン + テキスト。折りたたみ時はアイコンのみ

### メインコンテンツ
- 最大幅: 1200px、中央配置
- 上部余白: 24px
- 左右余白: 24px

### グリッド
- ダッシュボードKPI: 3カラム（md以下で1カラム）
- プロジェクト一覧: 3カラム（md以下で1-2カラム）
- LP種別カード: 3カラム
- 配信一覧: 1カラム（リスト形式）

## Empty State

すべてのリスト/コンテンツ領域に空の状態のデザインを用意:

- イラスト: シンプルなラインアート（Lucideアイコンベース）
- メッセージ: 何がないか + 何をすべきかを明確に
- CTAボタン: 次のアクション（「最初のプロジェクトを作成」等）

## Error State

- インライン: 入力フィールドの下に赤テキスト
- トースト: 右下にエラートースト（手動消去）
- 全画面: 500エラー等はシンプルなエラーページ
- AI生成失敗: リトライボタン + 「別のアプローチを試す」提案
