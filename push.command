#!/bin/bash
cd "$(dirname "$0")"
echo "=========================================="
echo "🍃 FOCUS App - GitHub Automatic Pusher"
echo "=========================================="

echo "# focus" > README.md
git init
git add .
git commit -m "update: FOCUS single file index.html with real venues and dual language"
git branch -M main
git remote remove origin 2>/dev/null
git remote add origin https://github.com/wediaan554-boop/focus.git
git push -u origin main

echo "=========================================="
echo "✅ Successfully pushed to GitHub!"
echo "=========================================="
