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
  let cartTotal:number = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal = (cartTotal+cart[i].productAmount);
  }
  cartNumber.innerHTML = "" + cartTotal;
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

export function createCartHTML(product: Product){

  const cartItemContainer = document.createElement("section");
  cartItemContainer.className="cartItemContainer";
  
    
  const title = document.createElement("h2");
  title.id = "title";
  const price = document.createElement("p");
  const image = document.createElement("img");

  
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

  
  addButton.innerHTML="+";
  removeButton.innerHTML="-";

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
addButton.addEventListener("click", ()=>{
  const handleAddButtonClick = (currentProduct:Product)=>{
    const index = cart.indexOf(product);
    cart.splice(index,1);

    currentProduct.productAmount +=1;

    updateQuantity();

    cart.push(currentProduct);
    localStorage.clear();
    localStorage.setItem("userCart", JSON.stringify(cart));
    //displayAmount(product.productAmount);
  }
  handleAddButtonClick(product);
  updateCartNumber();
})

removeButton.addEventListener("click", ()=>{
  const handleRemoveButtonClick = (currentProduct:Product)=>{
    const indexToRemove = cart.indexOf(product);
    //cart.splice(indexToRemove, 1);

    if (currentProduct.productAmount > 0) {
      currentProduct.productAmount -= 1;
      updateQuantity(); 

      if (currentProduct.productAmount === 0) {
        cart.splice(indexToRemove, 1); 

        if (cartItems && cartItems.parentNode) {
          cartItems.parentNode.removeChild(cartItems);
        } 
      }
      localStorage.setItem("userCart", JSON.stringify(cart));
      updateCartNumber();
      setUpCartDisplayer();
    }
   
    //displayAmount(product.productAmount);
  };
  handleRemoveButtonClick(product);
})
}

export function createProductHTML(product: Product) {
  const itemContainer = document.createElement("section");

  const title = document.createElement("h2");
  const category = document.createElement("h3");
  // const description = document.createElement("p");
  const price = document.createElement("p");
  const image = document.createElement("img");

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
  

  const addToCartButton = document.createElement("button");
  addToCartButton.innerHTML = "Add to cart";
  addToCartButton.id = "addToCartButton";
  itemContainer.appendChild(addToCartButton);
  container?.appendChild(itemContainer);

  //console.log(storageToCart);

  addToCartButton.addEventListener("click", () => {

    //Vi måste allra först rensa eftersom vi får dubletter annars, det snöbollar ur 2,4,8,16,32...
    /*
    Anledningen till varför vi måste rensa allra först är för att annars kommer det snöbolla ur.
    cart och userCart är baserade på varandra. Då användaren klickar att lägga till saker i kundvagnen så
    kollar koden också på vad som är i localStorage också, samma sak åt motsatta håll. 
    Om vi inte rensar så kommer koden säga, användaren klickar på att lägga till saker i kundvagnen, lägg till
    produkten och det som finns i localstorage, innan vi rensat localstorage så finns det kvar andra saker,
    som också läggs in igen. "Jag har 'x' som jag vill lägga till i kundvagnen, jag har 'y' och 'z' från tidigare",
    om vi inte rensar och lägger till 'x' så kommer den också lägga till 'y' och 'z' igen. Alltså så får vi, x,y,z,y,z.
    Nästa varv då vi lägger till 'n' så blir det n,x,y,z,y,z,x,y,z,y,z. Gången därpå då vi lägger till 'm' så får vi m,n,x,y,z,y,z,x,y,z,y,z,n,x,y,z,y,z,x,y,z,y,z
    Vi har gjort så att cart och localstorage har en relation, då de är baserade på varandra och det är endast cart 
    som användaren manuellt kan lägga till i.
    */

    /*
Här blir det konstigt om vi inte rensar våra listor!!!

    //Den här koden säger, hej fyll min cart array med saker från local storage. Det vi hämtade från local storage till cart är cart arrays egna array.. Paradox
  if (storageToCart != null) {
      for (let i = 0; i < storageToCart.length; i++) {
        //lägg till storageCart[i], alltså objektet på platsen i i storageToCart arrayen, som är det vi får från localstorage.
        cart.push(storageToCart[i]);
      }
    }
   
    //Koden säger, hej sätt nyckeln "userCart" till cart's array (i string som vi sen omvandlar tillbaka till en array)
    localStorage.setItem("userCart", JSON.stringify(cart));
*/

    //Förbered cart genom att göra dens längd 0. För en människa så är det typ samma sak som att rensa den.
    const existingCart = JSON.parse(localStorage.getItem("userCart") || '[]');
    //cart.length = 0;
    const index = existingCart.findIndex((cartProduct:Product)=> cartProduct.productTitle === product.productTitle);

    if (index !== -1) {
      existingCart[index].productAmount +=1;
    }else{
      product.productAmount = 1;
      existingCart.push(product);
    }

    //Hämta nyckeln "userCart", usercart är arrayen med produkter, vi behöver själva produkterna inte arrayen
    const storageToCart = JSON.parse(localStorage.getItem("userCart")!);
    //Om usercart ens finns, så loopa genom och lägg in våra produkter från arrayen i vår cart.
    if (storageToCart != null) {
      for (let i = 0; i < storageToCart.length; i++) {
        //lägg till storageCart[i], alltså objektet på platsen i i storageToCart arrayen, som är det vi får från localstorage.
        let product:Product =storageToCart[i];
        console.log(product.productAmount+1);

        if (typeof storageToCart.setProducAmount === 'function') {
          product.updateProductAmount(product.productAmount);
        }
          if (!product) {
            cart.push(product);
            console.log("fijahsölfkhasö");
            localStorage.setItem("userCart", JSON.stringify(existingCart));
          }

        
       
      }
    }
    //Koden som lägger in en produkt vi klickar på.
    /*
    product.updateProductAmount(product.productAmount);
      existingCart.push(product);
    */

    
   
    //Rensa localstorage, samma anledning som med cart
    localStorage.clear();
    //Lägger in cart arrayen i localstorage. Är en string eftersom localstorage endast kan lagra strings.
    localStorage.setItem("userCart", JSON.stringify(existingCart));

   
    updateCartNumber();
    setUpCartDisplayer(); 
    //update cart funkar typ, men endast då man lägger till en produkt eftersom cart då har en siffra.
  });
}
