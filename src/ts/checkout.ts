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

const payButton = document.querySelector(".cartPayment");

payButton?.addEventListener("click", ()=>{
    updateTotalPrice();
    alert("Thank you for your purchase! Your total was " + totalPrice + "€");
})


function calculatePrice(product:Product){
  return totalPrice += product.productPrice*product.productAmount;
}

for (let i = 0; i < cart.length; i++) {
    
    function createCheckout(){    
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
    calculatePrice(cart[i]);


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

      updateQuantity();

      addButton.addEventListener("click", () => {
        const index = cart.indexOf(cart[i]);
        cart[index].productAmount++;
        localStorage.setItem("userCart", JSON.stringify(cart));
        updateQuantity();
        calculatePrice(cart[i]);
        updateTotalPrice();
        console.log(totalPrice);
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
    createCheckout();
}
