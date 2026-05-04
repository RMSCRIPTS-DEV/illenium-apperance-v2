/**
 * Optional dev-only full-viewport backdrop (pnpm dev).
 *
 * Toggle (first match wins): localStorage `appearance_dev_preview_bg`
 *   - unset → defaults to ON ("1"); set "1"/"true"/"on" → ON; "0"/"false"/"off" → OFF
 *
 * Fallback when localStorage absent: `.env`
 *   - VITE_DEV_PREVIEW_BACKGROUND=false|off|transparent|0 → OFF
 *   - VITE_DEV_PREVIEW_BACKGROUND=true|on|1 → ON
 *
 * Custom image URL when ON:
 *   - VITE_DEV_PREVIEW_BACKGROUND_URL=https://...
 *   - or localStorage appearance_dev_preview_bg_url (overrides URL only, not toggle)
 */

const STORAGE_TOGGLE_KEY = 'appearance_dev_preview_bg';
const STORAGE_URL_KEY = 'appearance_dev_preview_bg_url';
const DEFAULT_DEV_PREVIEW_BG_URL = 'https://i.imgur.com/kiK65kg.jpeg';

function readLsToggle(): boolean | undefined {
  try {
    if (typeof window === 'undefined') return undefined;
    const raw = window.localStorage.getItem(STORAGE_TOGGLE_KEY);
    if (raw == null || raw.trim() === '') return undefined;
    const v = raw.trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(v)) return true;
    if (['0', 'false', 'no', 'off'].includes(v)) return false;
    return undefined;
  } catch {
    return undefined;
  }
}

function readEnvToggle(): boolean | undefined {
  const raw = String(import.meta.env.VITE_DEV_PREVIEW_BACKGROUND ?? '').trim().toLowerCase();
  if (!raw) return undefined;
  if (['0', 'false', 'off', 'no', 'none', 'transparent'].includes(raw)) return false;
  if (['1', 'true', 'yes', 'on', 'enabled'].includes(raw)) return true;
  return undefined;
}

function readLsUrl(): string | undefined {
  try {
    if (typeof window === 'undefined') return undefined;
    const raw = window.localStorage.getItem(STORAGE_URL_KEY);
    const t = raw?.trim();
    if (!t) return undefined;
    return t;
  } catch {
    return undefined;
  }
}

function readEnvUrl(): string | undefined {
  const raw =
    typeof import.meta.env.VITE_DEV_PREVIEW_BACKGROUND_URL === 'string'
      ? import.meta.env.VITE_DEV_PREVIEW_BACKGROUND_URL.trim()
      : '';
  return raw || undefined;
}

/** Safe single-quoted string for css url('...'). */
function quoteUrlForCss(u: string): string {
  return u.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/** CSS snippets for `<body>` in dev vs prod. */
export function getPreviewBodyBackgroundCss(): { dev: string; prod: string } {
  const prod = 'background: transparent;';

  if (import.meta.env.PROD) {
    return { dev: prod, prod };
  }

  const toggle = readLsToggle() ?? readEnvToggle() ?? true;
  if (!toggle) {
    return {
      dev: 'background: transparent; min-height: 100vh;',
      prod,
    };
  }

  const urlRaw = readLsUrl() ?? readEnvUrl() ?? DEFAULT_DEV_PREVIEW_BG_URL;
  const quoted = quoteUrlForCss(urlRaw);

  return {
    dev: `background: url('${quoted}') center center / cover no-repeat;\nmin-height: 100vh;`,
    prod,
  };
}
