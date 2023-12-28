import "./../scss/style.scss";
import { buttonCreator, createProductHTML } from "./htmlCreator";
import { Product } from "./models/Product";
import { searchProducts } from "./services/service";

const foundProducts = await searchProducts();
//console.log(foundProducts);

const productList: Array<Product> = [];

for (let i = 0; i < foundProducts.length; i++) {
  //console.log(foundProducts[i]);
  productList.push(new Product(foundProducts[i].title,foundProducts[i].category,foundProducts[i].description,foundProducts[i].price,foundProducts[i].image));

  createProductHTML(productList[i]);
};


localStorage.setItem("test",JSON.stringify(productList));
const test2 = JSON.parse(localStorage.getItem("test")!);
console.log(test2);
localStorage.clear();
console.log(productList);