const searchEngine = "https://searx.thegpm.org/?q=";

const searchEngineQueryEnd = "&categories=general&language=en-US";

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
