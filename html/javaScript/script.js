import { data } from "./data.js";

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

//megamenu
let pages = document.querySelector(".pages");
pages.addEventListener('click', () => {
  document.querySelector(".mega-menu").toggle();
})

//sidebar
let openBtn = document.querySelector('.side-navbar');
let closebtn = document.querySelector('.closebtn');
openBtn.addEventListener('click', () => {
  console.log('hi');
  document.getElementById('mySidenav').style.width = "500px";
});
closebtn.addEventListener('click', () => {
  document.getElementById('mySidenav').style.width = "0";
});

//Basket
let productContainer = document.querySelector(".product-container");

data.forEach((product) => {
  const { id, name, price, image1, image2 } = product;
  console.log(product);
  let productCard = ProductCardSchema(id, name, price, image1, image2);
  productContainer.innerHTML += productCard;
});

function ProductCardSchema(id, name, price, image1, image2) {
  let card = `
  <div class="col card-container">
            <div class="card" style="width: 18rem;">
              <div class="product-image">
                <img src="${image1}" onmouseover="this.src='${image2}';" onmouseout="this.src='${image1}';" alt="${name}" class="card-img-top"
                style="transition: all 1s linear;">
                <div class="hover-section">
                  <div class="hover-left">
                    <button product-id=${id} class="add-to-basket btn btn-primary">Add to card</button>
                  </div>
                  <div class="hover-right">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-expand"></i>
                  </div>
                </div>
              </div>
              <div class="card-body">
              <div class="product-description">
                <h4 class="card-title">${name}</h4>
                <p class="card-text">Price: $<span class="price">${price.toFixed(
                  2
                )}</span></p>
                </div>
                <div class="product-stars">
                <i class="fa fa-star fa-2xs text-primary"></i>
                <i class="fa fa-star fa-2xs text-primary"></i>
                <i class="fa fa-star fa-2xs text-primary"></i>
                <i class="fa fa-star fa-2xs text-muted"></i>
                <i class="fa fa-star fa-2xs text-muted"></i>
              </div>
            </div>
          </div>
  `;
  return card;
}
