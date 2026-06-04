const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

let products = [];
let cart = [];

async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();

    displayProducts(products);
}

function displayProducts(items) {
    productsContainer.innerHTML = "";

    items.forEach((product) => {
        productsContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">

        <h3>${product.title}</h3>

        <p class="price">RS. ${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
    });
}

function addToCart(id) {
    const product = products.find((item) => item.id === id);

    cart.push(product);

    cartCount.innerText = cart.length;
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);
});

fetchProducts();
