import { cartContainer, createCartHTML } from "./htmlCreator";
import { cart } from "./main";

const cartIcon = document.querySelector(".cartIcon");
const shoppingCart = document.getElementById("shoppingCart") as HTMLElement;


export function setUpCartDisplayer() {
  let cartText = document.querySelector(".cartText");
  if (cart.length > 0) {
    if (cartText != null) {
      cartText.innerHTML = "";
    }
    if (cartContainer?.hasChildNodes) {
      if (cartContainer != undefined) {
        while (cartContainer.lastChild) {
          cartContainer.removeChild(cartContainer.lastChild);
        }
      }
    }

    for (let i = 0; i < cart.length; i++) {
      createCartHTML(cart[i]);
    }
  }
  if (cart.length <= 0) {

    if (cartContainer?.hasChildNodes) {
      while (cartContainer.lastChild) {
        cartContainer.removeChild(cartContainer.lastChild);
      }
      if (cartText != null) {
        cartText.innerHTML = "Your shopping cart is empty";
        shoppingCart.appendChild(cartText);
      }
    }
  }
}

export function displayCart() {
  const shoppingCart = document.getElementById("shoppingCart");
  let display: boolean = false;
  cartIcon?.addEventListener("click", () => {
    display = !display;

    if (display) {
      shoppingCart?.classList.add("display");
      shoppingCart?.classList.remove("hidden");
      setUpCartDisplayer();
    } else {
      shoppingCart?.classList.add("hidden");
      shoppingCart?.classList.remove("add");
    }

  });
}
