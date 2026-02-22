// Settings Configuration and Defaults
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
