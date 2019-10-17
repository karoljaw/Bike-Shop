let nav = document.querySelector("nav");
let cart = document.querySelector(".cart");
let overlay = document.querySelector(".cart-overlay");
nav.addEventListener('click', function (e) {
  if (e.target.className === "cart-items" || e.target.className === "fas fa-cart-plus") {
    cart.classList.add("showCart");
    overlay.classList.add("transparentBcg");
  } 
  e.preventDefault()
})
cart.addEventListener('click', function(e) {
  if (e.target.className === "fas fa-window-close") {
    cart.classList.remove("showCart");
    overlay.classList.remove("transparentBcg");
  }
  e.preventDefault()
})
