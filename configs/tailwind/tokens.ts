/**
 * Tailwind 设计 Token
 * 统一颜色 / 间距 / 圆角 / 字体 / 阴影 等设计变量
 * 通过 CSS 变量驱动，便于暗黑模式切换
 */

export const colors = {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },

  /**
   * Blue 扩展色阶
   * 与 CSS 变量联动，业务代码可用 bg-blue-500 / text-blue-400 等
   */
  blue: {
    50: 'hsl(var(--blue-50))',
    100: 'hsl(var(--blue-100))',
    200: 'hsl(var(--blue-200))',
    300: 'hsl(var(--blue-300))',
    400: 'hsl(var(--blue-400))',
    500: 'hsl(var(--blue-500))',
    600: 'hsl(var(--blue-600))',
    700: 'hsl(var(--blue-700))',
    800: 'hsl(var(--blue-800))',
    900: 'hsl(var(--blue-900))',
    950: 'hsl(var(--blue-950))',
  },

  /**
   * AI Chatbot 专属语义色
   */
  chat: {
    user: 'hsl(var(--chat-user))',
    ai: 'hsl(var(--chat-ai))',
    'user-border': 'hsl(var(--chat-user-border))',
    'ai-border': 'hsl(var(--chat-ai-border))',
  },
  thinking: {
    DEFAULT: 'hsl(var(--thinking))',
    dim: 'hsl(var(--thinking-dim))',
  },
  code: {
    bg: 'hsl(var(--code-bg))',
    border: 'hsl(var(--code-border))',
    foreground: 'hsl(var(--code-foreground))',
  },
  success: {
    DEFAULT: 'hsl(var(--success))',
    dim: 'hsl(var(--success-dim))',
  },
  warning: {
    DEFAULT: 'hsl(var(--warning))',
    dim: 'hsl(var(--warning-dim))',
  },
  info: {
    DEFAULT: 'hsl(var(--info))',
    dim: 'hsl(var(--info-dim))',
  },
} as const;

export const borderRadius = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
} as const;

export const fontFamily = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    'sans-serif',
  ],
  mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
};

/** 屏幕断点：用于响应式布局 */
export const screens = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const tokens = {
  colors,
  borderRadius,
  fontFamily,
  screens,
};

export type Tokens = typeof tokens;
