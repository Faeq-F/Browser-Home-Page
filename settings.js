var openPane = false;
let googleFontsList = [];
let loadedFonts = new Set();
const dataAPIStatic = "https://cdn.jsdelivr.net/gh/herrstrietzel/fonthelpers@main/json/gfontsAPI.json";

const comboboxOptions = {
  themeSelect: [
    { value: 'system', label: 'System Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'light', label: 'Light Theme' },
    { value: 'custom', label: 'Custom Colors' }
  ],
  uiPlacement: [
    { value: 'center', label: 'Center' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'top', label: 'Top Center' },
    { value: 'bottom', label: 'Bottom Center' },
    { value: 'left', label: 'Left Center' },
    { value: 'right', label: 'Right Center' }
  ],
  textAlignment: [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ],
  timeFormat: [
    { value: 'HH:mm', label: '24-Hour (14:30)' },
    { value: 'hh:mm a', label: '12-Hour (02:30 PM)' },
    { value: 'HH:mm:ss', label: '24-Hour w/ Seconds (14:30:05)' },
    { value: 'hh:mm:ss a', label: '12-Hour w/ Seconds (02:30:05 PM)' },
    { value: 'unix', label: 'Unix Timestamp (1708527005)' },
    { value: 'iso', label: 'ISO 8601 (2024-02-21T14:30Z)' },
    { value: 'internet', label: 'Swatch Internet Time (@645)' },
    { value: 'binary', label: 'Binary Time' },
    { value: 'hex', label: 'Hexadecimal Time' }
  ],
  searchTarget: [
    { value: '_self', label: 'Same Tab' },
    { value: '_blank', label: 'New Tab' }
  ],
  searchEngine: [
    { value: 'https://search.brave.com/search?q=', label: 'Brave Search' },
    { value: 'https://www.qwant.com/?q=', label: 'Qwant' },
    { value: 'https://www.startpage.com/do/search?query=', label: 'Startpage' },
    { value: 'https://duckduckgo.com/?q=', label: 'DuckDuckGo' },
    { value: 'custom', label: 'Custom URL...' }
  ]
};

function saveSettings() {
  const settings = {
    theme: document.getElementById('themeSelect').value,
    uiPlacement: document.getElementById('uiPlacement').value,
    textAlignment: document.getElementById('textAlignment').value,
    timeFormat: document.getElementById('timeFormat').value,
    colors: {
      bgColor: document.getElementById('bgColor').value,
      textColor: document.getElementById('textColor').value,
      borderColor: document.getElementById('borderColor').value,
      accentColor: document.getElementById('accentColor').value,
      searchIconColor: document.getElementById('searchIconColor').value
    },
    font: document.getElementById('fontFamily').value,
    fontSize: document.getElementById('fontSize').value,
    searchBarWidth: document.getElementById('searchBarWidth').value,
    searchBarHeight: document.getElementById('searchBarHeight').value,
    timeDateSpacing: document.getElementById('timeDateSpacing').value,
    verticalSpacing: document.getElementById('verticalSpacing').value,
    hideMenuOnHover: document.getElementById('hideMenuOnHover').checked,
    searchPlaceholder: document.getElementById('searchPlaceholder').value,
    searchTarget: document.getElementById('searchTarget').value,
    searchEngine: {
      type: document.getElementById('searchEngine').value,
      customUrl: document.getElementById('customSearchUrl').value
    }
  };
  localStorage.setItem('homepageSettings', JSON.stringify(settings));
  applySettings(settings);
}

function loadSettings() {
  const savedSettings = localStorage.getItem('homepageSettings');
  const settings = savedSettings ? JSON.parse(savedSettings) : getDefaultSettings();
  applySettings(settings);
  updateSettingsUI(settings);
}

function getDefaultSettings() {
  return {
    theme: 'system',
    uiPlacement: 'center',
    textAlignment: 'center',
    timeFormat: 'HH:mm:ss',
    colors: {
      bgColor: '#f8f9fa',
      textColor: '#212529',
      borderColor: '#dee2e6',
      accentColor: '#000000',
      searchIconColor: '#ffffff'
    },
    font: 'Varela Round',
    fontSize: '16',
    searchBarWidth: '25',
    searchBarHeight: '36',
    timeDateSpacing: '8',
    verticalSpacing: '5',
    hideMenuOnHover: false,
    searchPlaceholder: 'Search the web...',
    searchTarget: '_self',
    searchEngine: {
      type: 'https://www.startpage.com/do/search?query=',
      customUrl: ''
    }
  };
}

function applySettings(settings) {
  if (settings.theme) applyTheme(settings.theme);
  if (settings.uiPlacement) applyUIPlacement(settings.uiPlacement);
  if (settings.textAlignment) applyTextAlignment(settings.textAlignment);
  if (settings.timeFormat) applyTimeFormat(settings.timeFormat);

  if (settings.colors) {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', settings.colors.bgColor);
    root.style.setProperty('--text-color', settings.colors.textColor);
    root.style.setProperty('--glass-border', settings.colors.borderColor);
    root.style.setProperty('--accent-color', settings.colors.accentColor);
    root.style.setProperty('--search-icon-color', settings.colors.searchIconColor || '#ffffff');
  }

  if (settings.font) {
    document.body.style.fontFamily = settings.font;
    const font = googleFontsList.find(f => f.family === settings.font);
    if (font) loadFont(font);
  }

  if (settings.fontSize) {
    const root = document.documentElement;
    root.style.setProperty('--base-font-size', `${settings.fontSize}px`);
  }

  if (settings.searchBarWidth) {
    const wrap = document.querySelector('.wrap');
    if (wrap) {
      wrap.style.width = `${settings.searchBarWidth}%`;
      wrap.style.maxWidth = '100%';
    }
  }

  if (settings.searchBarHeight) {
    const search = document.querySelector('.search');
    if (search) {
      search.style.height = `${settings.searchBarHeight}px`;
    }
    const searchTerm = document.querySelector('.searchTerm');
    if (searchTerm) {
      searchTerm.style.height = `${settings.searchBarHeight}px`;
      searchTerm.style.lineHeight = `${settings.searchBarHeight}px`;
    }
    const searchButton = document.querySelector('.searchButton');
    if (searchButton) {
      searchButton.style.height = `${settings.searchBarHeight}px`;
    }
  }

  if (settings.verticalSpacing) {
    const root = document.documentElement;
    root.style.setProperty('--vertical-spacing', `${settings.verticalSpacing}px`);
  }

  if (settings.timeDateSpacing) {
    const root = document.documentElement;
    root.style.setProperty('--time-date-spacing', `${settings.timeDateSpacing}px`);
  }

  if (settings.hideMenuOnHover !== undefined) {
    const settingsButton = document.getElementById('settingsButton');
    if (settings.hideMenuOnHover) {
      settingsButton.classList.add('hide-on-hover');
    } else {
      settingsButton.classList.remove('hide-on-hover');
    }
  }

  if (settings.searchPlaceholder) {
    const searchField = document.getElementById('searchField');
    if (searchField) searchField.placeholder = settings.searchPlaceholder;
  }

  if (settings.searchTarget) window.searchTarget = settings.searchTarget;
  if (settings.searchEngine && typeof window.updateSearchEngine === 'function') {
    window.updateSearchEngine(settings.searchEngine);
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

function updateComboboxUI(id, value) {
  const container = document.querySelector(`.combobox-container[data-id="${id}"]`);
  if (!container) return;

  const hiddenInput = container.querySelector('input[type="hidden"]');
  const selectedDisplay = container.querySelector('.selected-value');
  const type = container.dataset.type;

  if (hiddenInput) hiddenInput.value = value;

  if (selectedDisplay) {
    if (type === 'font') {
      selectedDisplay.textContent = value;
    } else {
      const option = comboboxOptions[id]?.find(opt => opt.value === value);
      selectedDisplay.textContent = option ? option.label : value;
    }
  }
}

function updateSettingsUI(settings) {
  if (settings.theme) updateComboboxUI('themeSelect', settings.theme);
  if (settings.uiPlacement) updateComboboxUI('uiPlacement', settings.uiPlacement);
  if (settings.textAlignment) updateComboboxUI('textAlignment', settings.textAlignment);
  if (settings.timeFormat) updateComboboxUI('timeFormat', settings.timeFormat);
  if (settings.fontSize) document.getElementById('fontSize').value = settings.fontSize;
  if (settings.searchBarWidth) document.getElementById('searchBarWidth').value = settings.searchBarWidth;
  if (settings.searchBarHeight) document.getElementById('searchBarHeight').value = settings.searchBarHeight;
  if (settings.timeDateSpacing) document.getElementById('timeDateSpacing').value = settings.timeDateSpacing;
  if (settings.verticalSpacing) document.getElementById('verticalSpacing').value = settings.verticalSpacing;
  if (settings.hideMenuOnHover !== undefined) document.getElementById('hideMenuOnHover').checked = settings.hideMenuOnHover;
  if (settings.searchTarget) updateComboboxUI('searchTarget', settings.searchTarget);
  if (settings.searchEngine) {
    updateComboboxUI('searchEngine', settings.searchEngine.type);
    document.getElementById('customSearchUrl').value = settings.searchEngine.customUrl;
    document.getElementById('customSearchSetting').style.display = settings.searchEngine.type === 'custom' ? 'block' : 'none';
  }

  if (settings.colors) {
    document.getElementById('bgColor').value = settings.colors.bgColor;
    document.getElementById('textColor').value = settings.colors.textColor;
    document.getElementById('borderColor').value = settings.colors.borderColor;
    document.getElementById('accentColor').value = settings.colors.accentColor;
    document.getElementById('searchIconColor').value = settings.colors.searchIconColor || '#ffffff';
  }

  if (settings.font) {
    updateComboboxUI('fontFamily', settings.font);
    const font = googleFontsList.find(f => f.family === settings.font);
    if (font) loadFont(font);
  }

  if (settings.searchPlaceholder) {
    const input = document.getElementById('searchPlaceholder');
    if (input) input.value = settings.searchPlaceholder;
    const searchField = document.getElementById('searchField');
    if (searchField) searchField.placeholder = settings.searchPlaceholder;
  }

  if (settings.theme) applyTheme(settings.theme);
}

function resetAllSettings() {
  const settings = getDefaultSettings();
  localStorage.setItem('homepageSettings', JSON.stringify(settings));
  applySettings(settings);
  updateSettingsUI(settings);
}

async function loadGoogleFonts() {
  try {
    let response = await fetch(dataAPIStatic);
    let data = await response.json();
    googleFontsList = data.items || [];
  } catch (error) {
    console.error("Failed to load Google Fonts:", error);
  }
}

function searchFonts(query) {
  if (!query || query.trim() === '') return googleFontsList.slice(0, 50);
  const lowerQuery = query.toLowerCase();
  return googleFontsList.filter(font => font.family.toLowerCase().includes(lowerQuery)).slice(0, 50);
}

function selectFont(font) {
  document.getElementById('fontFamily').value = font.family;
  updateComboboxUI('fontFamily', font.family);
  loadFont(font);
  saveSettings();
}

function loadFont(font) {
  if (loadedFonts.has(font.family)) {
    document.body.style.fontFamily = font.family;
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  const variants = font.variants || ['regular'];
  const weights = variants.filter(v => v !== 'italic' && !v.includes('italic')).map(v => v === 'regular' ? '400' : v).join(',');
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@${weights}&display=swap`;
  link.onload = () => {
    loadedFonts.add(font.family);
    document.body.style.fontFamily = font.family;
  };
  document.head.appendChild(link);
}

function initComboboxes() {
  document.querySelectorAll('.combobox-container').forEach(container => {
    const id = container.dataset.id;
    const type = container.dataset.type;
    const searchInput = container.querySelector('.combobox-search');
    const dropdown = container.querySelector('.combobox-dropdown');

    if (!searchInput || !dropdown) return;

    const renderOptions = (query = '') => {
      dropdown.innerHTML = '';
      let options = [];

      if (type === 'font') {
        options = searchFonts(query).map(f => ({ value: f.family, label: f.family, font: f }));
      } else {
        const lowerQuery = query.toLowerCase();
        options = comboboxOptions[id]?.filter(opt => opt.label.toLowerCase().includes(lowerQuery)) || [];
      }

      options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'combobox-option';
        div.textContent = opt.label;
        if (type === 'font') div.style.fontFamily = opt.label;

        div.addEventListener('click', () => {
          if (type === 'font') {
            selectFont(opt.font);
          } else {
            const hiddenInput = container.querySelector('input[type="hidden"]');
            const selectedDisplay = container.querySelector('.selected-value');
            if (hiddenInput) {
              hiddenInput.value = opt.value;
              // Trigger change event to ensure listeners like theme switching react immediately
              hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (selectedDisplay) selectedDisplay.textContent = opt.label;

            if (id === 'themeSelect') {
              saveSettings();
              location.reload();
              return;
            }

            if (id === 'searchEngine') {
              document.getElementById('customSearchSetting').style.display = opt.value === 'custom' ? 'block' : 'none';
            }
            saveSettings();
          }
          dropdown.classList.remove('show');
          searchInput.value = '';
        });
        dropdown.appendChild(div);
      });
      dropdown.classList.add('show');
    };

    searchInput.addEventListener('input', (e) => renderOptions(e.target.value));
    searchInput.addEventListener('focus', () => renderOptions(searchInput.value));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.combobox-container')) {
      document.querySelectorAll('.combobox-dropdown').forEach(d => d.classList.remove('show'));
    }
  });
}

$(document).ready(function () {
  loadGoogleFonts().then(() => {
    initComboboxes();
    loadSettings();
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const savedSettings = JSON.parse(localStorage.getItem('homepageSettings') || '{}');
    if (savedSettings.theme === 'system') {
      applyTheme('system');
    }
  });

  $("#settingsButton").click(function (e) {
    e.stopPropagation();
    const menu = $("#settingsMenu");
    if (!openPane) {
      menu.css('display', 'block');
      setTimeout(() => menu.addClass('show'), 10);
      openPane = true;
    } else {
      menu.removeClass('show');
      setTimeout(() => menu.css('display', 'none'), 300);
      openPane = false;
    }
  });

  $(document).click(function (e) {
    if (openPane && !$(e.target).closest('#settingsMenu, #settingsButton').length) {
      const menu = $("#settingsMenu");
      menu.removeClass('show');
      setTimeout(() => menu.css('display', 'none'), 300);
      openPane = false;
    }
  });

  $('#searchPlaceholder').on('input', saveSettings);
  $('#customSearchUrl').on('input', saveSettings);
  $('#bgColor, #textColor, #borderColor, #accentColor, #searchIconColor').on('input', saveSettings);
  $('#fontSize, #searchBarWidth, #searchBarHeight, #timeDateSpacing, #verticalSpacing').on('input', saveSettings);
  $('#hideMenuOnHover').on('change', saveSettings);

  $('#resetColors').click(function () {
    const settings = getDefaultSettings();
    const currentSettings = JSON.parse(localStorage.getItem('homepageSettings') || '{}');
    currentSettings.colors = settings.colors;
    localStorage.setItem('homepageSettings', JSON.stringify(currentSettings));
    applySettings(currentSettings);
    updateSettingsUI(currentSettings);
  });

  $('#resetAll').click(resetAllSettings);
});
