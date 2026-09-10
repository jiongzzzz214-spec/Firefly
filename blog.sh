#!/usr/bin/env bash
# 720620.xyz 博客 —— 日常操作脚本（Mac / Windows Git Bash 通用）
# 仓库: jiongzzzz214-spec/Firefly   分支: master   包管理器: pnpm 9.14.4
# 部署: Cloudflare Worker「firefly」，未连 Git，需手动发布
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CMD="${1:-help}"

do_save() {
  local MSG="${1:-"chore: 更新博客 ($(date '+%Y-%m-%d %H:%M'))"}"
  git add -A
  if git diff --cached --quiet; then
    echo ">> 没有需要提交的改动"
  else
    git commit -m "$MSG"
  fi
  git pull --rebase --autostash
  git push origin master
  echo ">> 源码已同步到 GitHub（网站尚未更新）"
}

do_deploy() {
  echo ">> 构建中..."
  pnpm build
  echo ">> 发布到 Cloudflare..."
  npx wrangler deploy
  echo ">> 已上线，稍等一分钟刷新 https://720620.xyz"
}

case "$CMD" in

  pull)
    echo ">> 拉取远端最新（rebase + 自动暂存本地改动）"
    git pull --rebase --autostash
    ;;

  save)
    do_save "${2:-}"
    ;;

  deploy)
    do_deploy
    ;;

  publish)
    do_save "${2:-}"
    do_deploy
    ;;

  dev)
    exec pnpm dev
    ;;

  up)
    git pull --rebase --autostash
    exec pnpm dev
    ;;

  build)
    pnpm build
    ;;

  new)
    SLUG="${2:-}"
    [ -n "$SLUG" ] || { echo '用法: ./blog.sh new my-post-slug'; exit 1; }
    pnpm new-post "$SLUG"
    ;;

  ssh)
    echo ">> 远端改用 SSH（之后 push 不用输令牌）"
    git remote set-url origin git@github.com:jiongzzzz214-spec/Firefly.git
    git remote -v
    echo ">> 验证: ssh -T git@github.com"
    ;;

  status)
    git status -sb
    echo
    git log --oneline -5
    ;;

  *)
    cat <<'EOF'
720620.xyz 博客助手

  blog up                  拉取最新 + 启动预览 (localhost:4321)
  blog dev                 直接启动预览
  blog new <slug>          新建文章（Firefly 自带 new-post）
  blog save "说明"          提交 + 推送到 GitHub（只同步源码）
  blog deploy              构建 + 发布到 Cloudflare（只上线）
  blog publish "说明"       两步合一（最常用）
  blog pull                只拉取最新
  blog build               本地构建 dist/
  blog ssh                 远端改用 SSH 协议
  blog status              查看改动与最近提交

注意：本仓库未连 Git 自动部署，save 之后必须 deploy 或 publish 才会上线。
EOF
    ;;
esac
