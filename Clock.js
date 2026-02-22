var clock;
var seconds;
var date;

function DisplayTime(time, s) {
  clock.innerHTML = time;
  if (seconds) seconds.innerHTML = s;
}

function updateClock() {
  const clockEl = document.getElementById("clock");
  const secondsEl = document.getElementById("seconds");
  const dateEl = document.getElementById("date");
  if (!clockEl) return;

  const now = new Date();
  const format = window.currentTimeFormat || 'HH:mm';

  // Date is always shown
  const formattedDate = now.toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  if (dateEl) dateEl.innerHTML = formattedDate;

  let timeStr = '';
  let secondsStr = '';

  switch (format) {
    case 'hh:mm a':
      timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).slice(0, -3);
      secondsStr = (now.getHours() >= 12 ? "pm" : "am");
      break;
    case 'HH:mm:ss':
      timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      break;
    case 'hh:mm:ss a':
      const t = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      timeStr = t.slice(0, -3);
      secondsStr = t.slice(-2).toLowerCase();
      break;
    case 'unix':
      timeStr = Math.floor(now.getTime() / 1000).toString();
      break;
    case 'iso':
      timeStr = now.toISOString().split('.')[0] + 'Z';
      break;
    case 'internet':
      const beats = Math.floor(((now.getUTCHours() * 3600) + (now.getUTCMinutes() * 60) + now.getUTCSeconds() + 3600) / 86.4) % 1000;
      timeStr = '@' + beats.toString().padStart(3, '0');
      break;
    case 'binary':
      const h = now.getHours().toString(2).padStart(5, '0');
      const m = now.getMinutes().toString(2).padStart(6, '0');
      timeStr = `${h}:${m}`;
      break;
    case 'hex':
      const totalSeconds = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getUTCSeconds();
      timeStr = totalSeconds.toString(16).toUpperCase().padStart(4, '0');
      break;
    case 'HH:mm':
    default:
      timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      break;
  }

  clockEl.innerHTML = timeStr;
  if (secondsEl) {
    secondsEl.innerHTML = secondsStr;
    secondsEl.style.display = secondsStr ? 'inline' : 'none';
  }
}

function getTime() {
  clock = document.getElementById("clock");
  seconds = document.getElementById("seconds");
  date = document.getElementById("date");

  updateClock();
  setInterval(updateClock, 1000);
}

window.updateClock = updateClock;
