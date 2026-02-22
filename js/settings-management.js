// Settings Management (Save, Load, Apply)
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
