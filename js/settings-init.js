// Settings Initialization and Event Handlers
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
