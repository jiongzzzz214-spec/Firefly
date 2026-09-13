#!/usr/bin/env bash
# 720620.xyz 博客 —— 日常操作脚本（Mac / Windows Git Bash 通用）
# 仓库: jiongzzzz214-spec/Firefly   分支: master   包管理器: pnpm 9.14.4
# 本机位置: E:\blog（脚本用 dirname 相对定位，换目录不用改）
# 部署: Cloudflare Worker「firefly」**已连 Git，push 即自动构建上线**（1~2 分钟）
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
  echo ">> 已推送到 GitHub —— Cloudflare 会自动构建，约 1~2 分钟后线上生效"
  echo ">> 构建状态（Cloudflare 会在这里打勾，不是 GitHub Actions）:"
  echo "   https://github.com/jiongzzzz214-spec/Firefly/commit/$(git rev-parse HEAD)/checks"
}

# ⚠️ 通常用不到：push 之后 Cloudflare 已经自动构建上线了。
# 保留它只是为了「不走 Git、纯手动发布」或 GitHub 侧构建故障时的应急手段。
# 注意本地 `pnpm build` 在收尾阶段可能卡住不退出（环境问题，产物其实已经写好），
# 详见 skill 里的「本地构建会在图片优化后卡死」。
do_deploy() {
  echo ">> 本地构建中（若卡住不退出属已知问题，dist/ 通常已生成，可直接 Ctrl-C）..."
  pnpm build
  echo ">> 手动发布到 Cloudflare..."
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
    # 已连 Git 自动部署，publish 现在等同 save（push 后云端自动构建上线）。
    # 保留这个名字只为兼容旧习惯；真要「不走 Git 的手动发布」用 ./blog.sh deploy
    do_save "${2:-}"
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
  blog save "说明"          提交 + 推送 → Cloudflare 自动上线（最常用）
  blog deploy              【应急】本地构建 + 手动 wrangler 发布，平时用不到
  blog publish "说明"       等同 save（保留旧名，兼容习惯）
  blog pull                只拉取最新
  blog build               本地构建 dist/
  blog ssh                 远端改用 SSH 协议
  blog status              查看改动与最近提交

说明：本仓库已连 Cloudflare Git 自动部署 —— push 后 1~2 分钟线上自动生效，
不需要再手动 deploy。`deploy` 仅在 Cloudflare 侧构建出问题、或想绕过 Git 时使用。
EOF
    ;;
esac
