import "./../scss/checkout.scss";
import { cart } from "./main";
import { Product } from "./models/Product";
console.log("checkout time :");




let totalPrice:number = 0;

const checkoutContainer = document.querySelector(".checkoutContainer");
const totalPriceP = document.querySelector(".totalPrice") as HTMLElement;
const checkoutItems = document.querySelector(".checkoutItems") as HTMLElement;

function updateTotalPrice(){
    totalPriceP.innerHTML=totalPrice.toString() + "€";
}

for (let i = 0; i < cart.length; i++) {
    const title = document.createElement("p");
    const image = document.createElement("img");
    image.className = "productImage";
    const price = document.createElement("p");

    //vi ska också kunna se antal varor i korgen också!!!

    title.innerHTML = cart[i].productTitle + " X " + cart[i].productAmount;
    image.src = cart[i].productImageURL;
    price.innerHTML = cart[i].productPrice.toString() + "€";

    checkoutItems.appendChild(title);
    checkoutItems.appendChild(image);
    checkoutItems.appendChild(price);
    totalPrice += cart[i].productPrice*cart[i].productAmount;


    const addButton = document.createElement("button");
    const removeButton = document.createElement("button");
  
    addButton.innerHTML = "+";
    removeButton.innerHTML = "-";
  
    checkoutItems?.appendChild(addButton);
    checkoutItems?.appendChild(removeButton);

    checkoutContainer?.appendChild(checkoutItems);


    updateTotalPrice();


    const updateQuantity = () => {
        title.innerHTML = cart[i].productTitle + " X " + cart[i].productAmount;
      };

    addButton.addEventListener("click", () => {
        const handleAddButtonClick = (currentProduct: Product) => {
          const index = cart.indexOf(cart[i]);
          cart.splice(index, 1);
    
          currentProduct.productAmount += 1;
    
          updateQuantity();
    
          cart.push(currentProduct);
          localStorage.clear();
          localStorage.setItem("userCart", JSON.stringify(cart));
          //displayAmount(product.productAmount);
        };
        handleAddButtonClick(cart[i]);
      });
    
      removeButton.addEventListener("click", () => {
        const handleRemoveButtonClick = (currentProduct: Product) => {
          const indexToRemove = cart.indexOf(cart[i]);
          //cart.splice(indexToRemove, 1);
    
          if (currentProduct.productAmount > 0) {
            currentProduct.productAmount -= 1;
            updateQuantity();
    
            if (currentProduct.productAmount === 0) {
              cart.splice(indexToRemove, 1);
    
              if (checkoutItems != null) {
                checkoutItems.remove();
              }
            }
            localStorage.setItem("userCart", JSON.stringify(cart));
          }
    
          //displayAmount(product.productAmount);
        };
        handleRemoveButtonClick(cart[i]);
      });
    }
