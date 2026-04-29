/** 重导出 token 便于业务侧访问 */
export const radiusToken = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
} as const;

export const spacingToken = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const zIndexToken = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;
