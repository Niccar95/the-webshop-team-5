import "./../scss/checkout.scss";
import { cart } from "./main";
import { Product } from "./models/Product";
console.log("checkout time :");




let totalPrice:number = 0;

const checkoutContainer = document.querySelector(".checkoutContainer") as HTMLElement;
const totalPriceP = document.querySelector(".totalPrice") as HTMLElement;
const checkoutItems = document.querySelector(".checkoutItems") as HTMLElement;

function updateTotalPrice(){
    totalPriceP.innerHTML= "Total Price: " + totalPrice.toString() + "€";
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
      if(cart[i].productAmount > 0){
        const title = document.createElement("h4");
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
            calculatePrice(cart[i]);
            updateTotalPrice();
            console.log(totalPrice);
          });
        
          removeButton.addEventListener("click", () => {
            const handleRemoveButtonClick = () => {
              const index = cart.indexOf(cart[i]);
              if (cart[index].productAmount > 0) {
                cart[index].productAmount--;
                updateQuantity();
                localStorage.setItem("userCart", JSON.stringify(cart));
                if (cart[index].productAmount === 0) {
                    cart.splice(index, i);

                    //checkoutItems.remove();
                    checkoutContainer.replaceChildren();
                    createCheckout();
                    localStorage.setItem("userCart", JSON.stringify(cart));
                }
               
              }
         
              //displayAmount(product.productAmount);
            };
            handleRemoveButtonClick();
          });
      }
   
    }
    createCheckout();
}
