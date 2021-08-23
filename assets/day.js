function showDateTime() {
  var da = document.getElementById("day");

  var date = new Date();
  var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var dayName = dayList[date.getDay()];
  var monthName = monthNames[date.getMonth()];
  var today = ` ${monthName} ${date.getDate()}  ${date.getFullYear()}`;

  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  var time = hour + ":" + min;
  da.innerText = `${time}   ${today}  `;
}
setInterval(showDateTime, 1000);

change();
function change()
{
  var text = [
    "0 0 ",
    "1 0 1",
    "0 0 0 1",
    "1 0 1 1 0 1",
    "0 1 1",
    "1 1",
    "0 1 0 0 1",
    "1 0 0 1",
    "0 1 0 0 1"
  ];
  var counter = 0;
  var elem = document.getElementById("changeText");
  setInterval(change, 300);
  function change() {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
      counter = 0;
    }
  }
  
}

