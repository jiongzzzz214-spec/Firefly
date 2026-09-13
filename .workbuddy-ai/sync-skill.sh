#!/usr/bin/env bash
# 把「本机用户级 skill」同步成仓库内的「可移植版」。
#
# 用法：
#   bash .workbuddy-ai/sync-skill.sh [源文件路径]
#
# 默认源：~/.workbuddy-ai/skills/firefly-astro-blog-maintenance/SKILL.md
# 目标：  <仓库根>/.workbuddy-ai/skills/firefly-astro-blog-maintenance/SKILL.md
#
# 做的事只有一件：把本机专属路径换成占位符，其余内容逐字节保留。
# 改完本机那份 skill 之后跑一次这个脚本，仓库里的副本就同步了 ——
# 这样 clone 到别的设备也能拿到同一份手册。

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="firefly-astro-blog-maintenance"
SRC="${1:-$HOME/.workbuddy-ai/skills/$SKILL_NAME/SKILL.md}"
DST="$REPO_ROOT/.workbuddy-ai/skills/$SKILL_NAME/SKILL.md"

if [ ! -f "$SRC" ]; then
	echo "找不到源文件：$SRC" >&2
	echo "（本机那份 skill 是不是被删了？可从仓库里的可移植版反推）" >&2
	exit 1
fi

mkdir -p "$(dirname "$DST")"

# ⚠️ 替换顺序很重要：长的具体路径必须排在短的通用规则前面，
#    否则 `C:\Users\Setsuna\Desktop\...` 会先被 `C:\Users\Setsuna` 吃掉，替换成错的占位符。
sed \
	-e 's#C:\\Users\\Setsuna\\Desktop\\blog\\Firefly#<旧仓库位置>#g' \
	-e 's#C:/Users/Setsuna/Desktop/blog/Firefly#<旧仓库位置>#g' \
	-e 's#C:\\Users\\Setsuna\\WorkBuddy AI\\2026-09-11-20-08-42#<旧工作区>#g' \
	-e 's#C:/Users/Setsuna/WorkBuddy AI/2026-09-11-20-08-42#<旧工作区>#g' \
	-e 's#C:\\Users\\Setsuna#<用户目录>#g' \
	-e 's#C:/Users/Setsuna#<用户目录>#g' \
	-e 's#E:\\blog#<仓库根>#g' \
	-e 's#E:/blog#<仓库根>#g' \
	-e 's#AppData\\Local\\pnpm\\store#%LOCALAPPDATA%\\pnpm\\store#g' \
	-e 's#D:\\Setsuna\\Pictures#<壁纸素材目录>#g' \
	-e 's#E:\\图片#<图片素材目录>#g' \
	-e 's#E:\\视频#<视频素材目录>#g' \
	"$SRC" >"$DST"

# 文末补一节占位符说明。**只能加在末尾** —— SKILL.md 的 YAML frontmatter
# 必须位于第 1 行，前面不能插任何东西，否则 skill 加载不了。
cat >>"$DST" <<'EOF'

---

## 附：本文件中的占位符（可移植版专有）

仓库里的这份是 **`sync-skill.sh` 自动生成的可移植版**，本机专属路径已替换为占位符：

| 占位符 | 含义 |
|---|---|
| `<仓库根>` | 博客仓库在本机的位置（例如 `E:\blog`） |
| `<用户目录>` | 当前用户的 home（`C:\Users\<你>` 或 `/home/<你>`） |
| `<旧仓库位置>` | 2026-09-13 迁移前的仓库位置（仅历史记录） |
| `<旧工作区>` | 迁移前的 AI 工作区目录（存档，已停用） |
| `<图片素材目录>` / `<视频素材目录>` / `<壁纸素材目录>` | 本机素材目录 |

**本机那份是原件，这份是产物 —— 别直接编辑这里**，改完原件后在仓库根跑：

```bash
bash .workbuddy-ai/sync-skill.sh
```
EOF

echo "已生成：$DST"
echo "源文件：$SRC"
echo "行数：$(wc -l <"$DST")"
