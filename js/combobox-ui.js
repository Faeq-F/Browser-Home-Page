// Combobox UI Functions
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
