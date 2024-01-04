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
  console.log(cart);
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
/*
function displayAmount (number:number){
  const productTitle = document.getElementById("title") as HTMLElement;
  if(productTitle !== null){
    const newHTML = productTitle.innerHTML;
    newHTML + " X " + number;
    productTitle.innerHTML = newHTML;}

}
*/

export function createCartHTML(product: Product) {
  const cartItemContainer = document.createElement("section");
  cartItemContainer.className = "cartItemContainer";

  const title = document.createElement("h2");
  title.id = "title";
  const price = document.createElement("p");
  const image = document.createElement("img");
  // const infoContainer = document.getElementById("infoContainer") as HTMLElement;
  

  // image.addEventListener("click", () => {


  //   infoContainer?.classList.add("infoContainerDisplay");
  //   infoContainer?.classList.remove("infoContainerHidden");
  
 
  // });
  //title.innerHTML = product.productTitle + displayAmount(product.productAmount);

  const updateQuantity = () => {
    title.innerHTML = product.productTitle + " X " + product.productAmount;
  };

  updateQuantity();

  price.innerHTML = product.productPrice.toString() + "€";
  image.src = product.productImageURL;
  image.className = "cartProductImage";

  cartItemContainer.className = "cartItemContainer";

  cartItemContainer?.appendChild(title);
  cartItemContainer?.appendChild(price);
  cartItemContainer?.appendChild(image);

  const addButton = document.createElement("button");
  const removeButton = document.createElement("button");

  addButton.innerHTML = "+";
  removeButton.innerHTML = "-";

  cartItemContainer?.appendChild(addButton);
  cartItemContainer?.appendChild(removeButton);

  cartContainer?.appendChild(cartItemContainer);

  /*
  addButton.addEventListener("click",()=>{
    //skapar en ny produkt som är identisk till den vi är i.
    const index = cart.indexOf(product);
    cart.splice(index,1);
    if (typeof product.updateProductAmount === 'function') {
      product.updateProductAmount(product.productAmount);
    }
    //createCartHTML(product);
    //lägg till produkten i vår cart array
    cart.push(product);
    //lägg till produkt cart i localstorage
    localStorage.clear();
    localStorage.setItem("userCart", JSON.stringify(cart));
  })
  removeButton.addEventListener("click",()=>{
    const index = cart.indexOf(product);
    cart.splice(index,1);
    localStorage.setItem("userCart", JSON.stringify(cart));
    setUpCartDisplayer();
    updateCartNumber();
  })
}
*/
  addButton.addEventListener("click", () => {
    const handleAddButtonClick = (currentProduct: Product) => {
      const index = cart.indexOf(product);
      cart.splice(index, 1);

      currentProduct.productAmount += 1;

      updateQuantity();

      cart.push(currentProduct);
      localStorage.clear();
      localStorage.setItem("userCart", JSON.stringify(cart));
      //displayAmount(product.productAmount);
    };
    handleAddButtonClick(product);
    updateCartNumber();
  });

  removeButton.addEventListener("click", () => {
    const handleRemoveButtonClick = (currentProduct: Product) => {
      const indexToRemove = cart.indexOf(product);
      //cart.splice(indexToRemove, 1);

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

      //displayAmount(product.productAmount);
    };
    handleRemoveButtonClick(product);
  });
}

export function createProductHTML(product: Product) {
  const itemContainer = document.createElement("section");

  const title = document.createElement("h2");
  const category = document.createElement("h3");
  // const description = document.createElement("p");
  const price = document.createElement("p");
  const image = document.createElement("img");  

  image.addEventListener("click", () => {
    const productInfoContainer = document.createElement("section");
    productInfoContainer.className = "infoContainer";
    image.appendChild(productInfoContainer);
    console.log("helloo");
  });

  title.innerHTML = product.productTitle;
  category.innerHTML = product.productCategory;
  // description.innerHTML = product.productDescription;
  price.innerHTML = product.productPrice.toString() + "€";
  image.src = product.productImageURL;
  image.className = "productImage";

  itemContainer.className = "itemContainer";

  itemContainer?.appendChild(image);
  itemContainer?.appendChild(title);
  itemContainer?.appendChild(category);
  // itemContainer?.appendChild(description);
  itemContainer?.appendChild(price);


   //SKAPA MODAL
   const modalContainer = document.getElementById("modalContainer") as HTMLElement;
   const modalCloseBtn = document.getElementById ("modalCloseBtn") as HTMLElement;
  
   image.addEventListener("click", () => {
    modalContainer.style.display = "block";  
  });
  
   modalCloseBtn.addEventListener("click", () => {
     modalContainer.style.display = "none"; 
   });

   window.addEventListener("click", (e) => {
    if(e.target == modalContainer){
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
