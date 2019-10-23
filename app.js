let nav = document.querySelector("nav");
let cart = document.querySelector(".cart");
let overlay = document.querySelector(".cart-overlay");
const productsContainer = document.querySelector(".products-center");

let inCart = [];

class UI {

  displayProducts(products) {
    let html = '';
    products.forEach(product => {

      html += `
      <article class="product">
        <div class="img-container">
          <img src="${product.image}" alt="product" class="product-img">
          <button class="bag-btn" data-id="${product.id}"><i class="fas fa-shopping-cart"> add to bag</i></button>
        </div>
        <h3>${product.title}</h3>
        <h4>${product.price}</h4>
      </article>`

      productsContainer.innerHTML = html;
    })
  }
  
  addToCart(products) {
    const productsItems = document.querySelectorAll(".product");
    let cart = document.querySelector(".cart-content");
    let footer = document.querySelector(".cart-footer");

    productsItems.forEach((product) => {
      product.addEventListener("click", (e) => {
        let imageFullPath = product.children[0].children[0].src;
        let imagePos = imageFullPath.indexOf('images');
        let finallPath = imageFullPath.slice(imagePos);
        let productToAdd = {
          image: finallPath,
          title: product.children[1].textContent,
          price: product.children[2].textContent
        }
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <img src="${productToAdd.image}" alt="product">
          <div>
            <h4>${productToAdd.title}</h4>
            <h5>$${productToAdd.price}</h5>
            <span class="remove-item">remove</span>
          </div>
          <div>
            <i class="fas fa-chevron-up"></i>
            <p class="item-amount">2</p>
            <i class="fas fa-chevron-down"></i>
          </div>
          `;
      
        cart.insertBefore(cartItem, footer);
        // Storage.saveCart(cartItem);
        this.showPrice();

        e.preventDefault();
      })
    })
  }
  showPrice() {

    const totalPrice = inCart.reduce((acc, item) => {
      let itemPrice = parseFloat(item.children[1].children[1].textContent.slice(1));
      let itemAmount = parseFloat(item.children[2].children[1].textContent);
      acc = itemPrice * itemAmount;
      return acc;
    }, 0)
  }
}

class Products {
  async getItems() {
    try {
      const response = await fetch('./products.json');
      const data = await response.json();
      let products = data.items;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image }
      })
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

nav.addEventListener('click', function (e) {
  if (e.target.className === "cart-items" || e.target.className === "fas fa-cart-plus") {
    cart.classList.add("showCart");
    overlay.classList.add("transparentBcg");
  }
  e.preventDefault()
})
cart.addEventListener('click', function (e) {
  if (e.target.className === "fas fa-window-close") {
    cart.classList.remove("showCart");
    overlay.classList.remove("transparentBcg");
  }
  e.preventDefault()
})

document.addEventListener("DOMContentLoaded", function () {
  const products = new Products;
  const ui = new UI;

  products.getItems().then(products => {
    Storage.saveProducts(products);
    ui.displayProducts(products);
    ui.addToCart(products);
  });
})
