/**
 * commitlint 根配置
 * 规则参考：https://www.conventionalcommits.org/zh-hans/
 *
 * type:
 *   feat     新功能
 *   fix      修复 bug
 *   docs     文档变更
 *   style    代码格式（不影响功能）
 *   refactor 重构（既不是新增功能也不是修复 bug）
 *   perf     性能优化
 *   test     测试相关
 *   build    构建系统/依赖变更
 *   ci       CI 配置
 *   chore    其他杂项
 *   revert   回滚
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [0],
    'subject-max-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 120],
  },
};
