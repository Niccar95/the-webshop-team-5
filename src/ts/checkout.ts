import "./../scss/checkout.scss";
import { cart } from "./main";
console.log("checkout time :");



let totalPrice:number = 0;

const checkoutContainer = document.querySelector(".checkoutContainer");
const totalPriceP = document.querySelector(".totalPrice") as HTMLElement;

for (let i = 0; i < cart.length; i++) {
    const itemContainer = document.createElement("section");
    
    const title = document.createElement("p");
    const image = document.createElement("img");
    const price = document.createElement("p");

    //vi ska också kunna se antal varor i korgen också!!!

    title.innerHTML = cart[i].productTitle;
    image.src = cart[i].productImageURL;
    price.innerHTML = cart[i].productPrice.toString() + "€";

    itemContainer.appendChild(title);
    itemContainer.appendChild(image);
    itemContainer.appendChild(price);
    totalPrice += cart[i].productPrice;

    checkoutContainer?.appendChild(itemContainer);

    
    totalPriceP.innerHTML=totalPrice.toString() + "€";
}