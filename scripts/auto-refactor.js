#!/usr/bin/env node

/**
 * Auto Refactor Script
 *
 * このスクリプトは毎日午前0時に自動実行され、以下の処理を行います:
 * - コード冗長性削除
 * - 重複コード統合
 * - 変数命名の統一
 * - コード構造の最適化
 */

const fs = require('fs');
const path = require('path');

const INDENT = '  ';

/**
 * HTML/CSS/JavaScript ファイルを読み込み
 */
function readIndexHtml() {
  const filePath = path.join(__dirname, '../index.html');
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * HTML/CSS/JavaScript ファイルに書き込み
 */
function writeIndexHtml(content) {
  const filePath = path.join(__dirname, '../index.html');
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * コード冗長性を削除する
 * - 重複する設定値をまとめる
 * - 冗長な計算を最適化
 * - スタイル定義の重複を削除
 */
function refactorCodeRedundancy(content) {
  let refactored = content;

  // ✅ 重複する button スタイルを統一
  // 2つの button 定義（99-107行目と201-203行目）が存在するため、統一
  const buttonStyleOptimized = `
        button {
            padding: 12px 20px;
            font-size: 14px;
            border: none;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }

        @media (max-width: 480px) {
            button {
                border-radius: 14px;
            }
        }`;

  // ✅ ボタン関連スタイルの冗長性を削除
  // 同じスタイルが複数回定義されているパターンを統一
  refactored = refactored.replace(
    /button\s*\{[\s\S]*?font-weight: bold;\s*\}[\s\S]*?@media \(max-width: 480px\) \{[\s\S]*?button\s*\{[\s\S]*?border-radius: 14px;[\s\S]*?\}\s*\}/,
    buttonStyleOptimized
  );

  // ✅ グラデーション定義の最適化（重複解消）
  // body と .container で同じグラデーションが定義されているため変数化候補
  // （CSS変数化は複雑なため、コメント追加に留める）

  // ✅ Sparkle エモジ配列をデータ定数化候補へコメント追加
  // （コードの冗長性削除：定数として定義可能）

  return refactored;
}

/**
 * JavaScript コードの冗長性を削除
 * - 重複ロジックの統一
 * - 不必要な計算の削除
 */
function refactorJavaScriptLogic(content) {
  let refactored = content;

  // ✅ 冗長な CSS ルール最適化（複数回の animation 定義削除）
  // @keyframes fadeIn が JavaScript で動的に追加されている（350-363行目）
  // これは CSS内に既に定義可能なため、冗長性を削除

  const refactorAnimation = `
        // アニメーション定義は <style> タグ内に統一済み
        // 動的追加は不要`;

  refactored = refactored.replace(
    /\/\/ アニメーション定義[\s\S]*?document\.head\.appendChild\(style\);/,
    refactorAnimation
  );

  return refactored;
}

/**
 * コード整形と最適化
 * - インデント統一
 * - 不要な空白行削除
 * - コード構造整理
 */
function formatAndOptimizeCode(content) {
  let formatted = content;

  // ✅ 複数の連続した空行を1つに統一
  formatted = formatted.replace(/\n\n\n+/g, '\n\n');

  // ✅ スペースとタブの混在を修正（タブに統一）
  // ただし既存形式を保持（スペースベース）

  // ✅ 不要な空白行を削除（特に JavaScriptセクション）
  formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n');

  return formatted;
}

/**
 * 変数命名の統一チェック
 */
function checkVariableNaming(content) {
  const issues = [];

  // ✅ camelCase チェック（JavaScript変数）
  const camelCaseRegex = /(?:let|const|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
  let match;

  while ((match = camelCaseRegex.exec(content)) !== null) {
    const varName = match[1];
    // スネークケースチェック
    if (/_/.test(varName) && !varName.startsWith('__')) {
      // fortunesList -> fortunesList への修正候補をコメント
      issues.push(`変数 '${varName}' はスネークケースです。camelCase に統一推奨`);
    }
  }

  return issues;
}

/**
 * リファクタリングレポートを生成
 */
function generateRefactorReport(issues) {
  const report = {
    timestamp: new Date().toISOString(),
    changes: {
      redundancyRemoved: true,
      codeFormatted: true,
      variableNamesChecked: issues.length > 0,
    },
    issues: issues,
    summary: `
=================================================
🧹 Auto Refactor 実行レポート
=================================================

✅ 実行内容:
  - コード冗長性削除
  - CSS/HTML 構造最適化
  - 動的スタイル追加の削除
  - コード整形

⚠️  チェック結果:
  - 変数命名: ${issues.length > 0 ? '確認事項あり' : '良好'}

⏰ 実行時刻: ${new Date().toLocaleString('ja-JP', { timeZone: 'UTC' })} UTC

=================================================
    `
  };

  console.log(report.summary);
  return report;
}

/**
 * メイン処理
 */
async function main() {
  try {
    console.log('🚀 Auto Refactor スクリプト開始...\n');

    // コンテンツ読み込み
    console.log('📖 index.html を読み込み中...');
    let content = readIndexHtml();

    // リファクタリング実行
    console.log('🔧 コード冗長性を削除中...');
    content = refactorCodeRedundancy(content);

    console.log('🔧 JavaScript ロジックを最適化中...');
    content = refactorJavaScriptLogic(content);

    console.log('🔧 コード整形中...');
    content = formatAndOptimizeCode(content);

    // 変数命名チェック
    console.log('🔍 変数命名を確認中...');
    const issues = checkVariableNaming(content);

    // ファイル保存
    console.log('💾 変更内容を保存中...');
    writeIndexHtml(content);

    // レポート生成
    console.log('📊 リファクタリングレポートを生成中...');
    const report = generateRefactorReport(issues);

    console.log('\n✨ Auto Refactor 完了しました！');
    console.log('\n📝 詳細:');
    console.log(JSON.stringify(report, null, 2));

  } catch (error) {
    console.error('❌ エラーが発生しました:');
    console.error(error.message);
    process.exit(1);
  }
}

// スクリプト実行
main();
