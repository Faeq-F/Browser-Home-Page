const searchEngine = 'https://www.qwant.com?theme=0&hc=0&hti=0&ch=none&client=brz-vivaldi&vt=0&b=0&s=0&l=en&locale=en_GB&home=brand&si=1&c=purple&eco_suggest=1&q=';

const searchField = document.getElementById("searchField");
//const searchButton = document.getElementById("searchButton");

function search() {
  var win = window.open(searchEngine + searchField.value, '_self');
  searchField.value = '';
  win.focus();
}

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') { search(); }
});

