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
pages.addEventListener("click", () => {
  document.querySelector(".mega-menu");
});

//Basket
let productContainer = document.querySelector(".product-container");
let basketContainer = document.querySelector(".basket-container");
let productCount = document.querySelector(".productCount");
let fullScreenMode = document.querySelectorAll(".fa-expand");

data.forEach((product) => {
  const { id, name, price, image1, image2 } = product;
  console.log(product);
  let productCard = ProductCardSchema(id, name, price, image1, image2);
  productContainer.innerHTML += productCard;
});

fullScreenMode.forEach((mode) => {
  mode.onclick = (e) => {};
});

document.querySelectorAll(".add-to-basket").forEach((btn) => {
  btn.onclick = (e) => {
    let id = e.target.getAttribute("product-id");
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket == null) {
      localStorage.setItem("basket", JSON.stringify([{ id, count: 1 }]));
    } else {
      if (basket.some((x) => x.id == id)) {
        return;
      }
      basket.push({ id, count: 1 });
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    addProductToCart();
  };
});
addProductToCart();

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
                    <i class="fa-solid fa-expand" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
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
function addProductToCart() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  if (basket == null) {
    productCount.innerHTML = 0;
    document.querySelector(".right-price-contend").innerHTML = "0.00";
    return;
  }

  basketContainer.innerHTML = "";
  let total_price = 0;
  let total_count = 0;
  let item_total_price = 0;

  basket.forEach((product) => {
    let foundProduct = data.find((x) => x.id == product.id);
    if (foundProduct == null) return;

    total_price += product.count * foundProduct.price;
    item_total_price = product.count * foundProduct.price;
    total_count += product.count;
    let basketItem = `
        <div class="basket-item">
        <img src="${foundProduct.image1}" alt="${
      foundProduct.name
    }" style="width:80px; height: 90px;">
        <div class="col">
          <span style="font-weight: bold;">${foundProduct.name}</span> 
          <span style="color:grey;">Quantity: </span>
          <div class="count-btns">
          <button class="btn btn-secondary increase-btn" data-id=${
            product.id
          }>+</button>
          <span class="count">${product.count}</span>
          <button class="btn btn-secondary decrease-btn" data-id=${
            product.id
          }>-</button>
          </div>
          <span style="font-weight: bold; font-size: 20px">$${
            foundProduct.price
          }</span>
          </div>
          <button class="btn btn-danger delete-btn" style="width:40px;" data-id=${
            product.id
          }>X</button>
          <div>$<span>${item_total_price.toFixed(2)}</span></div>
      </div>`;

    basketContainer.innerHTML += basketItem;
  });
  document.querySelector(".right-price-contend").innerHTML =
    "$" + total_price.toFixed(2);
  productCount.innerHTML = total_count;

  document.querySelectorAll(".increase-btn").forEach((btn) => {
    btn.onclick = (e) => {
      let id = e.target.getAttribute("data-id");
      let basket = JSON.parse(localStorage.getItem("basket"));
      let foundBasketItem = basket.find((x) => x.id == id);
      foundBasketItem.count++;
      localStorage.setItem("basket", JSON.stringify(basket));
      addProductToCart();
    };
  });

  document.querySelectorAll(".decrease-btn").forEach((btn) => {
    btn.onclick = (e) => {
      let id = e.target.getAttribute("data-id");
      let basket = JSON.parse(localStorage.getItem("basket"));
      let foundBasketItem = basket.find((x) => x.id == id);
      if (foundBasketItem.count == 0) return;
      foundBasketItem.count--;
      basket = basket.filter((x) => x.count != 0);
      localStorage.setItem("basket", JSON.stringify(basket));
      addProductToCart();
    };
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = (e) => {
      let id = e.target.getAttribute("data-id");
      let basket = JSON.parse(localStorage.getItem("basket"));
      basket = basket.filter((x) => x.id != id);
      localStorage.setItem("basket", JSON.stringify(basket));
      addProductToCart();
    };
  });
}
