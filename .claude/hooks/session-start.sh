#!/bin/bash
set -euo pipefail

# SessionStart hook for Fortune App tests
# This hook runs the test suite automatically when the Claude Code session starts

echo '{"async": false}'

# Navigate to project directory
cd "$CLAUDE_PROJECT_DIR" || exit 1

echo "🚀 Running Fortune App Test Suite..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Run tests
if command -v node &> /dev/null; then
  node tests/run-tests.js
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All tests passed! The app is ready for development."
  else
    echo ""
    echo "⚠️  Some tests failed. Please review the test output above."
  fi
else
  echo "⚠️  Node.js is not installed. Skipping tests."
  echo "   Install Node.js to enable automated testing."
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
