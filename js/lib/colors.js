/* DOM colors */
function cssVar(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

BG1 = cssVar('--bg1');
BG2 = cssVar('--bg2');
BG3 = cssVar('--bg3');
BG4 = cssVar('--bg4');

ACCENT_PRIMARY = cssVar('--accent-primary');
ACCENT_SECONDARY = cssVar('--accent-secondary');
ACCENT_START = cssVar('--accent-start');
ACCENT_END = cssVar('--accent-end');

TEXT_PRIMARY = cssVar('--text-primary');
TEXT_SECONDARY = cssVar('--text-secondary');