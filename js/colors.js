// DOM colors
function cssVar(name) {
  return getComputedStyle(document.documentElement)
           .getPropertyValue(name)
           .trim();
}

// Background colors
const BG1 = cssVar('--bg1');  
const BG2 = cssVar('--bg2');  
const BG3 = cssVar('--bg3');  
const BG4 = cssVar('--bg4');  

// Accent colors
const ACCENT_PRIMARY = cssVar('--accent-primary');
const ACCENT_SECONDARY = cssVar('--accent-secondary');
const ACCENT_START = cssVar('--accent-start');
const ACCENT_END = cssVar('--accent-end');

// Text colors
const TEXT_PRIMARY = cssVar('--text-primary');
const TEXT_SECONDARY = cssVar('--text-secondary');
const TEXT_INVERSE = cssVar('--text-inverse');
const TEXT_MUTED = cssVar('--text-muted');