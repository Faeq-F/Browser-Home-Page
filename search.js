const searchEngine = "https://www.startpage.com/sp/search?query=";

const searchEngineQueryEnd = "&t=light&lui=english&sc=pGH6209JMD1H20&cat=web";

const searchField = document.getElementById("searchField");
//const searchButton = document.getElementById("searchButton");

function search() {
  var win = window.open(
    searchEngine + searchField.value + searchEngineQueryEnd,
    "_self"
  );
  searchField.value = "";
  win.focus();
}

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    search();
  }
});
