// Font Management Functions
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
