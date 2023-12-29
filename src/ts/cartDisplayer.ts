import { cartContainer, createCartHTML } from "./htmlCreator";
import { cart } from "./main";

const cartIcon = document.querySelector(".cartIcon");

export function setUpCartDisplayer() {
  let cartText = document.querySelector(".cartText");
  if (cart.length > 0) {
    console.log("Cart har produkter i sig");
          
    if (cartContainer?.hasChildNodes) {
      console.log("HALLÅ!");
      if(cartContainer!=undefined){
        //cartContainer.innerHTML="";
        while (cartContainer.lastChild) {
          console.log("borta :)");
          cartContainer.removeChild(cartContainer.lastChild);
        }
      }
    }
    
    for (let i = 0; i < cart.length; i++) {
      createCartHTML(cart[i]);
    }
  } else {
    console.log("Cart är tom");
    if (cartText != null) {
      cartText.innerHTML = "Your shopping cart is empty";
    }
  }
}

export function displayCart() {
  const shoppingCart = document.getElementById("shoppingCart");
  let display:boolean = false;
  cartIcon?.addEventListener("click", () => {
    display = !display;

    if (display) {
      shoppingCart?.classList.add("display");
      shoppingCart?.classList.remove("hidden");
      setUpCartDisplayer();
    }else{
      shoppingCart?.classList.add("hidden");
      shoppingCart?.classList.remove("add");
    }


  });
}
