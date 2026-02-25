# Auto Refactor スキル 🤖

## 概要

**Auto Refactor** は、毎日午前0時（深夜）に自動的に実行され、コードの「散らかり」を掃除し、翌朝プルリクエストとして報告するスキルです。

このスキルは、以下のリファクタリング作業を自動化します：
- ✅ コード冗長性削除
- ✅ 重複コード統合
- ✅ 変数命名の統一
- ✅ コード構造の最適化
- ✅ スタイル整形

## 機能

### 1. スケジュール実行
- **実行時間**: 毎日 UTC 15:00（JST 午前0時）
- **実行環境**: GitHub Actions
- **トリガー**: cron スケジュール（`0 15 * * *`）

### 2. リファクタリング処理
スクリプト `scripts/auto-refactor.js` により以下を実行：
- JavaScript コード冗長性削除
- CSS/HTML 構造最適化
- 動的スタイル追加の削除
- 変数命名チェック
- コード整形

### 3. 自動プルリクエスト生成
- 変更がある場合、自動的にプルリクエストを生成
- 変更内容の詳細説明を記載
- ラベル付け（`automated`, `refactor`, `cleanup`）
- マージ後の自動削除

## 使用方法

### 自動実行（デフォルト）
毎日午前0時に自動実行されます。特に設定は不要です。

### 手動実行
手動で実行したい場合は、GitHub Actions から実行できます：

```bash
# GitHub Actions UI から "workflow_dispatch" で手動トリガー
# または Git コマンドで実行
gh workflow run auto-refactor.yml
```

### ローカルでテスト実行
ローカル環境でスクリプトをテストするには：

```bash
node scripts/auto-refactor.js
```

## ワークフロー詳細

### ファイル構成
```
.github/workflows/
└── auto-refactor.yml          # GitHub Actions ワークフロー定義

scripts/
└── auto-refactor.js           # リファクタリング処理スクリプト

.claude/skills/auto-refactor/
└── SKILL.md                   # このファイル（スキル説明書）
```

### 実行フロー
1. **Checkout** - リポジトリコード取得
2. **Node.js セットアップ** - 実行環境準備
3. **Git 設定** - ボット認証情報設定
4. **リファクタリング実行** - `scripts/auto-refactor.js` 実行
5. **変更検出** - 変更があるかチェック
6. **コミット** - 変更をコミット
7. **PR 生成** - プルリクエスト自動作成

## リファクタリング詳細

### コード冗長性削除
- 重複する CSS/JS ルール統合
- 冗長な計算最適化
- 不要な動的スタイル追加削除

### 変数命名統一
- camelCase チェック
- スネークケースの検出
- 命名規則の統一確認

### コード整形
- インデント統一
- 複数空行の削除
- スペース/タブ混在解消

## 設定変更

### 実行時間を変更する場合
`.github/workflows/auto-refactor.yml` の `schedule.cron` を編集：

```yaml
schedule:
  - cron: '0 15 * * *'  # UTC 15:00
```

Cron 形式: `分 時 日 月 曜日`
- `0 3 * * *` = UTC 3:00（JST 正午）
- `0 9 * * *` = UTC 9:00（JST 18:00）
- `0 15 * * *` = UTC 15:00（JST 0:00）

### リファクタリング項目を追加する場合
`scripts/auto-refactor.js` に新しい関数を追加：

```javascript
/**
 * 新しいリファクタリング処理
 */
function refactorNewFeature(content) {
  // リファクタリング処理
  return refactored;
}

// main() 内で呼び出し
content = refactorNewFeature(content);
```

## トラブルシューティング

### PR が生成されない
- ✅ GitHub Actions が有効になっているか確認
- ✅ `permissions` が正しく設定されているか確認
- ✅ スクリプトが実行されたかワークフロー実行ログを確認

### 意図しない変更が加わる
- ✅ PR をレビューしてから merge してください
- ✅ `scripts/auto-refactor.js` のロジックを見直してください
- ✅ テスト環境での実行を推奨

### スケジュールが実行されない
- ✅ GitHub Actions が有効になっているか確認
- ✅ Cron 設定が正しいか確認
- ✅ リポジトリの GitHub Actions 設定を確認

## ベストプラクティス

1. **定期確認**
   - 生成された PR を定期的に確認
   - 予期しない変更がないか確認

2. **カスタマイズ**
   - リファクタリング項目は CLAUDE.md に従う
   - テスト項目を追加して品質保証

3. **保守**
   - リファクタリングスクリプトは定期更新
   - 新機能や変更に対応

## 関連ファイル

- `.github/workflows/auto-refactor.yml` - ワークフロー定義
- `scripts/auto-refactor.js` - リファクタリング処理
- `CLAUDE.md` - プロジェクト開発ガイド
- `README.md` - プロジェクト説明

## 技術仕様

- **言語**: JavaScript (Node.js 18)
- **スケジューラー**: GitHub Actions Cron
- **実行環境**: ubuntu-latest
- **対象ファイル**: `index.html`, その他（設定可能）

## ライセンスと貢献

このスキルは Claude Code プロジェクトの一部です。
改善提案やバグ報告は CLAUDE.md のガイドラインに従ってください。

---

**最終更新**: 2026-02-25
**バージョン**: 1.0.0
**ステータス**: ✅ 本番運用中
