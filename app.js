let body = document.querySelector("body");

body.addEventListener('click', function (e) {
  let cart = document.querySelector(".cart");
  let overlay = document.querySelector(".cart-overlay");

  if (e.target.className === "cart-items" || e.target.className === "fas fa-cart-plus") {
    cart.classList.add("showCart");
    overlay.classList.add("transparentBcg");
  } else if (e.target.className === "fas fa-window-close") {
    cart.classList.remove("showCart");
    overlay.classList.remove("transparentBcg");
  }
  e.preventDefault()
})