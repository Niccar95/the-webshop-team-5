import { setUpCartDisplayer } from "./cartDisplayer";
import { cart } from "./main";
import { Product } from "./models/Product";

const container = document.getElementById("productContainer");
export const cartContainer = document.querySelector(".cartItems");
const cartNumber = document.querySelector(".popup") as HTMLElement;

const cartItems = document.getElementById("cartItems") as HTMLElement;

export function loadCart(storageArray: Array<Product>) {
  for (let i = 0; i < storageArray.length; i++) {
    cart.push(storageArray[i]);
  }
}

export function updateCartNumber() {
  let cartTotal: number = 0;

  for (let i = 0; i < cart.length; i++) {
    cartTotal = cartTotal + cart[i].productAmount;
  }
  if (cartNumber) {
    cartNumber.innerHTML = "" + cartTotal;
  }

}

export function createCartHTML(product: Product) {
  const cartItemContainer = document.createElement("section");
  cartItemContainer.className = "cartItemContainer";

  const title = document.createElement("h2");
  title.id = "title";
  const price = document.createElement("p");
  const image = document.createElement("img");

  const updateQuantity = () => {
    title.innerHTML = product.productTitle + " X " + product.productAmount;
  };

  updateQuantity();

  price.innerHTML = product.productPrice.toString() + "€";
  image.src = product.productImageURL;
  image.className = "cartProductImage";

  cartItemContainer.className = "cartItemContainer";

  cartItemContainer?.appendChild(title);
  cartItemContainer?.appendChild(image);
  cartItemContainer?.appendChild(price);

  const addButton = document.createElement("button");
  const removeButton = document.createElement("button");
  addButton.className = "cartButton";
  removeButton.className = "cartButton";

  const cartButtonContainer = document.createElement("section");

  cartButtonContainer.className = "cartButtonContainer";

  addButton.innerHTML = "+";
  removeButton.innerHTML = "-";


  cartItemContainer?.appendChild(cartButtonContainer);
  cartButtonContainer?.appendChild(addButton);
  cartButtonContainer?.appendChild(removeButton);

  cartContainer?.appendChild(cartItemContainer);


  addButton.addEventListener("click", () => {
    const index = cart.indexOf(product);
    cart[index].productAmount++;
    localStorage.setItem("userCart", JSON.stringify(cart));
    updateQuantity();
    updateCartNumber();
  });

  removeButton.addEventListener("click", () => {
    const handleRemoveButtonClick = (currentProduct: Product) => {
      const indexToRemove = cart.indexOf(product);

      if (currentProduct.productAmount > 0) {
        currentProduct.productAmount -= 1;
        updateQuantity();

        if (currentProduct.productAmount === 0) {
          cart.splice(indexToRemove, 1);

          if (cartItems != null) {
            cartItems.remove();
          }
        }
        localStorage.setItem("userCart", JSON.stringify(cart));
        updateCartNumber();
        setUpCartDisplayer();
      }
    };
    handleRemoveButtonClick(product);
  });
}

export function createProductHTML(product: Product) {
  const itemContainer = document.createElement("section");

  const title = document.createElement("h3");
  const category = document.createElement("p");
  const price = document.createElement("p");
  const image = document.createElement("img");

  image.addEventListener("click", () => {
    const productInfoContainer = document.createElement("section");
    productInfoContainer.className = "infoContainer";
    image.appendChild(productInfoContainer);
  });

  title.innerHTML = product.productTitle;
  category.innerHTML = product.productCategory;
  price.innerHTML = product.productPrice.toString() + "€";
  image.src = product.productImageURL;
  image.className = "productImage";

  itemContainer.className = "itemContainer";

  itemContainer?.appendChild(image);
  itemContainer?.appendChild(title);
  itemContainer?.appendChild(category);
  itemContainer?.appendChild(price);


  const modalContainer = document.getElementById("modalContainer") as HTMLElement;
  const modalCloseButton = document.getElementById("modalCloseButton") as HTMLElement;
  const modalContentItems = document.getElementById("modalContentItems") as HTMLElement;
  const modalImage = document.createElement("img");
  const modalTitle = document.createElement("h2");
  const modalCategory = document.createElement("h3");
  const modalDescription = document.createElement("p");

  modalImage.className = "modalImage";
  modalTitle.className = "modalTitle";
  modalCategory.className = "modalCategory";
  modalDescription.className = "modalDescription";

  image.addEventListener("click", () => {

    modalContentItems.innerHTML = "";
    modalContainer.style.display = "block";

    modalImage.src = product.productImageURL;
    modalCategory.innerHTML = product.productCategory;
    modalDescription.innerHTML = product.productDescription;
    modalTitle.innerHTML = product.productTitle;


    modalContentItems.appendChild(modalImage);
    modalContentItems.appendChild(modalTitle);
    modalContentItems.appendChild(modalCategory);
    modalContentItems.appendChild(modalDescription);

  });

  modalCloseButton?.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modalContainer) {
      modalContainer.style.display = "none";
    }
  });

  const addToCartButton = document.createElement("button");
  addToCartButton.innerHTML = "Add to cart";
  addToCartButton.id = "addToCartButton";
  itemContainer.appendChild(addToCartButton);
  container?.appendChild(itemContainer);

  addToCartButton.addEventListener("click", () => {
    const index = cart.findIndex(
      (cartProduct: Product) =>
        cartProduct.productTitle === product.productTitle
    );
    if (index !== -1) {
      cart[index].productAmount += 1;
    } else {
      product.productAmount = 1;
      cart.push(product);
    }
    localStorage.setItem("userCart", JSON.stringify(cart));

    updateCartNumber();
    setUpCartDisplayer();
  });
}
