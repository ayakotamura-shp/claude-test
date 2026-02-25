# CLAUDE.md - 占いアプリ開発ガイド

## プロジェクト概要

**プロジェクト名**: 占いアプリ (Fortune Telling App)

このプロジェクトは、日々の運勢を占うシンプルで楽しいWebアプリケーションです。複数のカテゴリ（恋愛、仕事、健康、金運）から選択して、ランダムな占い結果を表示できます。

### 主な機能
- 複数のカテゴリから運勢を選択可能
- ランダムな占い結果の表示
- 運の度合いを星（⭐）で視覚的に表示
- レスポンシブデザイン対応（モバイル・タブレット・PC）
- スムーズなアニメーション効果

## プロジェクト構造

```
claude-test/
├── CLAUDE.md                              # このファイル（開発ガイド）
├── README.md                              # プロジェクト説明
├── .gitignore                             # Git除外設定
├── .git/                                  # Gitリポジトリ
├── .github/workflows/
│   └── auto-refactor.yml                  # Auto Refactor スキル（自動実行）
├── .claude/
│   ├── skills/
│   │   ├── pastel-ui/                     # Pastel UI スキル
│   │   └── auto-refactor/
│   │       └── SKILL.md                   # Auto Refactor スキル定義
│   ├── hooks/                             # 自動実行フック
│   └── settings.json                      # Claude Code 設定
├── scripts/
│   └── auto-refactor.js                   # リファクタリング処理スクリプト
├── tests/
│   └── run-tests.js                       # テストスイート
├── package.json                           # Node.js 設定
└── index.html                             # メインアプリケーションファイル
```

## 技術スタック

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **デザイン**: レスポンシブデザイン、グラデーション、カード型レイアウト
- **ホスティング**: 静的ファイルサーバー対応

## 開発ルール

### 1. コミット規約

コミットメッセージは以下の形式で統一してください：

```
<type>: <description>

<optional body>
```

**type の種類**:
- `feat`: 新機能の追加
- `fix`: バグ修正
- `refactor`: リファクタリング
- `style`: スタイル調整（デザイン、CSS など）
- `docs`: ドキュメント更新
- `chore`: その他の変更

**例**:
```
feat: 新しいカテゴリ「試験運」を追加
fix: 運勢表示時のアニメーションが重複する問題を修正
style: ボタンのホバー効果を改善
```

### 2. ブランチ戦略

- **開発ブランチ**: `claude/<feature>-<suffix>` 形式
- **メインブランチ**: `main`
- **リリースブランチ**: `master`

### 3. Git 操作ルール

```bash
# リモートブランチ取得
git fetch origin <branch-name>

# プッシュ（推奨フォーマット）
git push -u origin <branch-name>

# プル
git pull origin <branch-name>
```

**重要**: ブランチ名は `claude/` で始まり、セッションIDで終わる必要があります。例: `claude/create-claude-md-leTu3`

### 4. コード品質基準

#### HTML/CSS
- セマンティックなHTML5を使用
- CSSはファイル内に `<style>` タグで記述可能（スコープが小さいため）
- クラス名は kebab-case を使用（例: `fortune-display`、`btn-fortune`）
- モバイルファーストのレスポンシブデザイン

#### JavaScript
- Vanilla JavaScript のみ使用（外部ライブラリなし）
- 変数名は camelCase を使用（例: `currentCategory`、`fortuneDisplay`）
- ユーザー操作のイベントリスナーは明確に記述
- `querySelector` または `getElementById` でDOM要素を取得

### 5. 機能追加時の注意点

新しいカテゴリやコンテンツを追加する際は以下に注意してください：

1. **運勢データ構造の統一**
   ```javascript
   { text: '占い結果', emoji: '絵文字', luck: 1-5 }
   ```

2. **カテゴリボタンの実装**
   - HTML: `data-category` 属性でカテゴリを指定
   - CSS: `.category-btn` クラスでスタイリング
   - JS: `currentCategory` グローバル変数で状態を管理

3. **アニメーション**
   - フェードイン効果は `@keyframes fadeIn` で定義済み
   - 新しいアニメーションは `<style>` タグ内に追加

### 6. デバッグ方法

ブラウザの開発者ツール（F12）を使用：
- Console タブでJavaScriptエラーを確認
- Elements タブでHTML/CSSを検査
- Network タブでリソース読み込みを確認

## 開発フロー

1. **ブランチの作成/切り替え**
   ```bash
   git checkout claude/create-claude-md-leTu3
   ```

2. **変更の実施**
   - `index.html` を編集
   - ブラウザでテスト（`open index.html` または http-server を使用）

3. **コミット**
   ```bash
   git add index.html CLAUDE.md README.md
   git commit -m "feat: 新機能の説明"
   ```

4. **プッシュ**
   ```bash
   git push -u origin claude/create-claude-md-leTu3
   ```

## Claude Code スキル

このプロジェクトには、開発効率を向上させるカスタムスキルが含まれています。

### 1. Auto Refactor スキル 🤖

**概要**: 毎日午前0時（深夜）に自動実行され、コードの「散らかり」を掃除し、翌朝プルリクエストとして報告します。

**機能**:
- ✅ 毎日 UTC 15:00（JST 午前0時）に自動実行
- ✅ コード冗長性削除
- ✅ 重複コード統合
- ✅ 変数命名統一
- ✅ 自動プルリクエスト生成

**ファイル**:
- `.github/workflows/auto-refactor.yml` - ワークフロー定義
- `scripts/auto-refactor.js` - リファクタリング処理
- `.claude/skills/auto-refactor/SKILL.md` - スキル詳細ドキュメント

**手動実行**:
```bash
# ローカルでテスト実行
node scripts/auto-refactor.js

# GitHub Actions で手動トリガー
gh workflow run auto-refactor.yml
```

詳細は `.claude/skills/auto-refactor/SKILL.md` を参照してください。

### 2. Pastel UI スキル

別途実装されている UI デザインスキル。詳細は `.claude/skills/pastel-ui/` を参照してください。

## トラブルシューティング

### アニメーションが動作しない場合
- ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
- `fortuneDisplay.style.animation` が正しく設定されているか確認

### 占い結果が表示されない場合
- Console でエラーを確認
- `fortunes_list` が正しくデータを持っているか確認
- DOM 要素の ID が HTML と JavaScript で一致しているか確認

### レスポンシブデザインが崩れる場合
- `@media (max-width: 480px)` のスタイルを確認
- `viewport` メタタグが設定されているか確認

## 今後の拡張案

- [ ] ローカルストレージを使用した履歴保存
- [ ] 異なるテーマ（ダークモード など）の追加
- [ ] 複数言語対応
- [ ] バックエンド連携（占い結果のログ記録など）

## その他

- 質問や不明な点がある場合は、このファイルを更新してください
- プロジェクトに大きな変更がある場合は、README.md と CLAUDE.md を同時に更新してください
