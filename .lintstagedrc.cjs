// lint-staged 配置：在 git pre-commit 阶段对暂存文件执行格式化与检查
module.exports = {
  '*.{ts,tsx,js,jsx,mjs,cjs}': ['prettier --write', 'eslint --fix --no-warn-ignored'],
  '*.{json,md,yml,yaml,css,scss,html}': ['prettier --write'],
};
