var clock;
var seconds;
var date;

function DisplayTime(time, s) {
  clock.innerHTML = time;
  seconds.innerHTML = s
}

function getTime() {
  clock = document.getElementById("clock");
  seconds = document.getElementById("seconds")
  date = document.getElementById("date");
  const now = new Date();

  const formattedDate = now.toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  date.innerHTML = formattedDate;

  setInterval(() => DisplayTime(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).slice(0, -3),
    new Date().toLocaleTimeString().slice(now.toLocaleTimeString().length - 5, now.toLocaleTimeString().length)
  ), 1000);
}


