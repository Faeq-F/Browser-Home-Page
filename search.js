let searchEngine = "https://www.startpage.com/do/search?query=";
let searchEngineQueryEnd = "";

const searchField = document.getElementById("searchField");

// Function to update search engine
window.updateSearchEngine = function (searchEngineConfig) {
  if (searchEngineConfig.type === 'custom' && searchEngineConfig.customUrl) {
    // Replace {query} placeholder with actual query parameter
    searchEngine = searchEngineConfig.customUrl.replace('{query}', '');
    searchEngineQueryEnd = '';
  } else {
    searchEngine = searchEngineConfig.type;
    searchEngineQueryEnd = "&categories=general&language=en-US";
  }
};

function search() {
  const query = searchField.value;
  let searchUrl;

  if (searchEngine.includes('{query}')) {
    // Custom URL with placeholder
    searchUrl = searchEngine.replace('{query}', encodeURIComponent(query));
  } else {
    // Standard URL
    searchUrl = searchEngine + encodeURIComponent(query) + searchEngineQueryEnd;
  }

  // Use the search target setting or default to _self
  const target = window.searchTarget || '_self';
  var win = window.open(searchUrl, target);
  searchField.value = "";
  win.focus();
}

// Search button click handler
document.getElementById("searchButton").addEventListener("click", function (e) {
  e.preventDefault();
  search();
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    search();
  }
});
