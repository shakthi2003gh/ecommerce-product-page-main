// >menu
const menu = document.querySelector(".menu-button");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  nav.classList.toggle("open");

  if (nav.classList.contains("open")) menu.src = "/images/icon-close.svg";
  else menu.src = "/images/icon-menu.svg";
});

// >cart
const cart = document.querySelector(".cart");
const cartPage = document.querySelector(".cart-list");
const quantityButton = document.querySelectorAll(".quantity img");
const quantityDisplay = document.querySelector(".product-count");
const CartButton = document.querySelector(".cart-button");
const cartSection = document.querySelector(".cart-list main");
const cartQuantity = document.querySelector(".header-right div");
let quantity = 0;

cart.addEventListener("click", () => {
  if (cartPage.style.display == "block") cartPage.style.display = "none";
  else cartPage.style.display = "block";
});

quantityButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.matches(".increase")) quantity++;
    if (e.target.matches(".decrease")) quantity--;
    if (quantity <= 0) quantity = 0;

    quantityDisplay.innerText = quantity;
  });
});

CartButton.addEventListener("click", () => {
  if (quantity === 0) {
    cartQuantity.classList.remove("show");
    return;
  }

  cartSection.innerHTML = `<div class="cart-item">
            <img src="/images/image-product-1-thumbnail.jpg" alt="" />

            <div class="cart-detail">
              <p>Fall Limited Edition sneakers</p>
              <div>$125.00 x ${quantity} 
                <span class="price">$${125 * quantity}.00</span>
              </div>
            </div>

            <img src="/images/icon-delete.svg" class="delete" alt="" />
          </div>

          <button>Checkout</button>`;

  cartQuantity.classList.add("show");
  cartQuantity.dataset.quantity = quantity;

  const deleteButton = cartSection.querySelector(".delete");

  deleteButton.addEventListener("click", () => {
    cartSection.innerHTML = `<p>Your cart is empty</p>`;
  });
});

// >light box
const image = document.querySelectorAll(".product__image img")[1];
const closeButton = document.querySelector(".lightbox svg");
const lightBox = document.querySelector(".lightbox");

image.addEventListener("click", modal);
closeButton.addEventListener("click", modal);

function modal() {
  lightBox.classList.toggle("show");
}

// >image preview
const productPreview = document.querySelectorAll(".product__preview img");
const previewButton = document.querySelectorAll(".floating-button");

const mainPreview = [...productPreview].slice(0, 4);
const lightBoxPreview = [...productPreview].slice(4);

const mainPreviewbutton = [...previewButton].slice(0, 2);
const lightBoxPreviewbutton = [...previewButton].slice(2);

mainPreview.forEach(preview);
lightBoxPreview.forEach(preview);

mainPreviewbutton.forEach(slide);
lightBoxPreviewbutton.forEach(slide);
let count = 1;

function preview(product, index, productList) {
  product.addEventListener("click", (e) => {
    const view =
      e.target.parentElement.previousElementSibling.querySelectorAll("img")[1];

    productList.forEach((product) => product.classList.remove("preview"));

    product.classList.add("preview");
    view.src = `/images/image-product-${index + 1}.jpg`;
  });
}

function slide(button) {
  button.addEventListener("click", (e) => {
    const productPreview = e.target
      .closest(".floating-button")
      .parentElement.nextElementSibling.querySelectorAll("img");
    const view = e.target
      .closest(".floating-button")
      .parentElement.querySelectorAll("img")[1];

    if (button.matches(".previous")) {
      count--;
      if (count < 1) count = 4;
    }

    if (button.matches(".next")) {
      count++;
      if (count > 4) count = 1;
    }

    view.src = `/images/image-product-${count}.jpg`;

    productPreview.forEach((product) => {
      product.classList.remove("preview");
    });

    productPreview[count - 1].classList.add("preview");
  });
}
