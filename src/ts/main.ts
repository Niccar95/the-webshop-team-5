import "./../scss/style.scss";
import { displayCart, setUpCartDisplayer } from "./cartDisplayer";
import { createProductHTML, loadCart, updateCartNumber } from "./htmlCreator";
import { Product } from "./models/Product";
import { searchProducts } from "./services/service";


const navigation = document.querySelector(".navigation") as HTMLHtmlElement;

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty (
  "--scroll-padding", 
  navigationHeight + "px"
);



let storageToCart = JSON.parse(localStorage.getItem("userCart")!);
const foundProducts = await searchProducts();

const productList: Array<Product> = [];
export const cart: Array<Product> = [];

for (let i = 0; i < foundProducts.length; i++) {
  productList.push(
    new Product(
      foundProducts[i].title,
      foundProducts[i].category,
      foundProducts[i].description,
      foundProducts[i].price,
      foundProducts[i].image,
    )
  );

  createProductHTML(productList[i]);
}

if (storageToCart != null) {
  loadCart(storageToCart);
}
updateCartNumber();


setUpCartDisplayer();
displayCart();