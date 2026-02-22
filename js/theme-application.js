// Theme Application Functions
function applyTheme(theme) {
  const html = document.documentElement;
  const colorSettingsSection = document.getElementById('colorSettingsSection');
  const root = document.documentElement;
  if (!colorSettingsSection) return;

  // Clear existing inline styles on root to allow theme defaults to take over
  root.style.removeProperty('--bg-color');
  root.style.removeProperty('--text-color');
  root.style.removeProperty('--glass-bg');
  root.style.removeProperty('--glass-border');
  root.style.removeProperty('--accent-color');

  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('light-theme', !prefersDark);
    colorSettingsSection.style.display = 'none';
    
    if (prefersDark) {
      root.style.setProperty('--bg-color', '#0a0a0a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
      root.style.setProperty('--accent-color', '#000000');
      root.style.setProperty('--search-icon-color', '#ffffff');
    } else {
      root.style.setProperty('--bg-color', '#f8f9fa');
      root.style.setProperty('--text-color', '#212529');
      root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.05)');
      root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--accent-color', '#000000');
      root.style.setProperty('--search-icon-color', '#ffffff');
    }
  } else if (theme === 'light') {
    html.classList.add('light-theme');
    colorSettingsSection.style.display = 'none';
    root.style.setProperty('--bg-color', '#f8f9fa');
    root.style.setProperty('--text-color', '#212529');
    root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--accent-color', '#000000');
    root.style.setProperty('--search-icon-color', '#ffffff');
  } else if (theme === 'dark') {
    html.classList.remove('light-theme');
    colorSettingsSection.style.display = 'none';
    root.style.setProperty('--bg-color', '#0a0a0a');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
    root.style.setProperty('--accent-color', '#000000');
    root.style.setProperty('--search-icon-color', '#ffffff');
  } else {
    html.classList.remove('light-theme');
    colorSettingsSection.style.display = 'block';
    // Re-apply custom colors from inputs
    root.style.setProperty('--bg-color', document.getElementById('bgColor').value);
    root.style.setProperty('--text-color', document.getElementById('textColor').value);
    root.style.setProperty('--glass-border', document.getElementById('borderColor').value);
    root.style.setProperty('--accent-color', document.getElementById('accentColor').value);
    root.style.setProperty('--search-icon-color', document.getElementById('searchIconColor').value);
    root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)'); // Default for custom
  }
}

function applyUIPlacement(placement) {
  const body = document.body;
  body.classList.remove('placement-center', 'placement-top-left', 'placement-top-right', 'placement-bottom-left', 'placement-bottom-right', 'placement-top', 'placement-bottom', 'placement-left', 'placement-right');
  body.classList.add(`placement-${placement}`);
}

function applyTextAlignment(alignment) {
  const body = document.body;
  body.classList.remove('align-left', 'align-center', 'align-right');
  body.classList.add(`align-${alignment}`);
}

function applyTimeFormat(format) {
  window.currentTimeFormat = format;
  // Trigger an immediate update if the update function exists
  if (typeof window.updateClock === 'function') {
    window.updateClock();
  }
}
