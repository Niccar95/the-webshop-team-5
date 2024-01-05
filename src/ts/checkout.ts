import "./../scss/checkout.scss";
import { cart } from "./main";

let checkoutContainer = document.querySelector(".checkoutContainer") as HTMLElement;
const totalPriceP = document.querySelector(".totalPrice") as HTMLElement;
const checkoutItems = document.querySelector(".checkoutItems") as HTMLElement;

function calculateTotalPrice(): number {
  let total = 0;

  for (const product of cart) {
    total += product.productPrice * product.productAmount;
  }

  return total;
}

function updateTotalPrice() {
  const price = calculateTotalPrice();
  totalPriceP.innerHTML = "Total Price: " + price.toFixed(2) + "€";
}

const payButton = document.querySelector(".cartPayment");

payButton?.addEventListener("click", () => {
  const totalPrice = calculateTotalPrice();
  updateTotalPrice();
  alert("Thank you for your purchase! Your total was " + totalPrice.toFixed(2) + "€");
})

function clearCart() {
  while (checkoutItems.lastChild) {
    checkoutItems.replaceChildren();

  }
}

function renderHTML() {
  clearCart();
  for (let i = 0; i < cart.length; i++) {
    function createCheckout() {
      if (cart[i].productAmount > 0) {
        const title = document.createElement("h4");
        const image = document.createElement("img");
        image.className = "productImage";
        const price = document.createElement("p");

        title.innerHTML = cart[i].productTitle + " X " + cart[i].productAmount;
        image.src = cart[i].productImageURL;
        price.innerHTML = cart[i].productPrice.toString() + "€";

        checkoutItems.appendChild(title);
        checkoutItems.appendChild(image);
        checkoutItems.appendChild(price);


        const addButton = document.createElement("button");
        const removeButton = document.createElement("button");
        const checkoutButtonContainer = document.createElement("section");

        addButton.className = "checkoutButton";
        removeButton.className = "checkoutButton";
        checkoutButtonContainer.className = "checkoutButtonContainer";


        addButton.innerHTML = "+";
        removeButton.innerHTML = "-";

        checkoutItems?.appendChild(checkoutButtonContainer);
        checkoutButtonContainer?.appendChild(addButton);
        checkoutButtonContainer?.appendChild(removeButton);

        checkoutContainer?.appendChild(checkoutItems);

        updateTotalPrice();


        const updateQuantity = () => {
          title.innerHTML = cart[i].productTitle + " X " + cart[i].productAmount;
        };

        updateQuantity();

        addButton.addEventListener("click", () => {
          const index = cart.indexOf(cart[i]);
          cart[index].productAmount++;
          localStorage.setItem("userCart", JSON.stringify(cart));
          updateQuantity();
          updateTotalPrice();
        });

        removeButton.addEventListener("click", () => {
          const index = cart.indexOf(cart[i]);
          cart[index].productAmount--;
          localStorage.setItem("userCart", JSON.stringify(cart));
          if (cart[i].productAmount <= 0) {
            cart.splice(i, 1);
            localStorage.setItem("userCart", JSON.stringify(cart));
          }

          renderHTML();
          updateTotalPrice();
        });
      }
      updateTotalPrice();
    }
    createCheckout();
  }

}
renderHTML();