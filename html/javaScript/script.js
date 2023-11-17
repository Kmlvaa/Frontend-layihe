//Countdown
var countDownDate = new Date("Dec 5, 2023 15:37:25").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector(".day").innerHTML = days + `<br><span>days</span>`;
  document.querySelector(".hour").innerHTML = hours + `<br><span>hours</span>`;
  document.querySelector(".minute").innerHTML =
    minutes + `<br><span>minutes</span>`;
  document.querySelector(".second").innerHTML =
    seconds + `<br><span>seconds</span>`;

  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".counter-div").innerHTML = "EXPIRED";
  }
}, 1000);

