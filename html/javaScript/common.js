import { data } from "./data.js";

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
  <div class="col card-container" data-aos="zoom-in" data-aos-once="true">
            <div class="card" style="width: 18rem;">
              <div class="product-image">
                <img src="${image1}" onmouseover="this.src='${image2}';" onmouseout="this.src='${image1}';" alt="${name}" class="card-img-top"
                style="transition: all 3s linear;">
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
          <button class="btn btn-danger delete-btn" style="background-color: white; border:none;" data-id=${
            product.id
          }>X</button>
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

//dropdown
let homeMenu = document.querySelector(".home");
homeMenu.onclick = () => {
   let menu = document.querySelector(".home-menu");
   if(menu.style.display === "block"){
    menu.style.display = "none";
    homeMenu.innerHTML = `Home<i class="fa-solid fa-angle-down fa-xs"></i>`
   }
   else{
    menu.style.display = "block";
    homeMenu.innerHTML = `Home<i class="fa-solid fa-angle-up fa-xs"></i>`
   }
};

let shopMenu = document.querySelector(".shop");
shopMenu.onclick = () => {
   let menu = document.querySelector(".shop-menu");
   if(menu.style.display === "block"){
    menu.style.display = "none";
    shopMenu.innerHTML = `Shop <i class="fa-solid fa-angle-down fa-xs"></i>`
   }
   else{
    menu.style.display = "block";
    shopMenu.innerHTML = `Shop <i class="fa-solid fa-angle-up fa-xs"></i>`
   }
};

let pageMenu = document.querySelector(".pages");
pageMenu.onclick = () => {
   let menu = document.querySelector(".pages-menu");
   if(menu.style.display === "block"){
    menu.style.display = "none";
    pageMenu.innerHTML = `Pages <i class="fa-solid fa-angle-down fa-xs"></i>`
   }
   else{
    menu.style.display = "block";
    pageMenu.innerHTML = `Pages <i class="fa-solid fa-angle-up fa-xs"></i>`
   }
};

let docsMenu = document.querySelector(".docs");
docsMenu.onclick = () => {
   let menu = document.querySelector(".docs-menu");
   if(menu.style.display === "block"){
    menu.style.display = "none";
    docsMenu.innerHTML = `Docs <i class="fa-solid fa-angle-down fa-xs"></i>`
   }
   else{
    menu.style.display = "block";
    docsMenu.innerHTML = `Docs <i class="fa-solid fa-angle-up fa-xs"></i>`
   }
};
let iconsMenu = document.querySelector(".icons");
iconsMenu.onclick = () => {
   let menu = document.querySelector(".icons-menu");
   if(menu.style.display === "block"){
    menu.style.display = "none";
    iconsMenu.innerHTML = `Icons<i class="fa-solid fa-angle-down fa-xs"></i>`
   }
   else{
    menu.style.display = "block";
    iconsMenu.innerHTML = `Icons<i class="fa-solid fa-angle-up fa-xs"></i>`
   }
};

