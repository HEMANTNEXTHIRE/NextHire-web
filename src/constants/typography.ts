/**
 * NextHire typography scale — 6 sizes only.
 * Use these everywhere for consistent, heuristic UI.
 */
export const FONT = {
  /** 11px — overlines, badges, meta, table headers, small labels */
  xs: 11,
  /** 13px — secondary text, list items, table cells, descriptions */
  sm: 13,
  /** 15px — body copy, paragraphs */
  base: 15,
  /** 18px — lead paragraphs, emphasis */
  md: 18,
  /** 24px — card titles, section subheads */
  lg: 24,
  /** 40px — page/section heroes (use FONT.xlClamp for responsive) */
  xl: 40,
  /** Responsive hero title: 38px → 52px */
  xlClamp: 'clamp(38px, 5vw, 52px)',
  /** Section heading responsive: 30px → 42px */
  lgClamp: 'clamp(30px, 3.5vw, 42px)',
} as const

/** Font weights — use only these */
export const WEIGHT = {
  normal: 400,
  medium: 500,
  semi: 600,
  bold: 700,
  extra: 800,
} as const

export const FONT_FAMILY = "'Noto Sans', system-ui, -apple-system, sans-serif"

/** Playfair Display serif stack — use for all hero/display headings */
export const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"
