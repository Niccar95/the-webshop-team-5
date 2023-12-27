import "./../scss/style.scss";
import { createProductHTML } from "./htmlCreator";
import { Product } from "./models/Product";
import { searchProducts } from "./services/service";

const foundProducts = await searchProducts();
//console.log(foundProducts);

const productList: Array<Product> = [];

for (let i = 0; i < foundProducts.length; i++) {
  //console.log(foundProducts[i]);
  productList.push(new Product(foundProducts[i].title,foundProducts[i].category,foundProducts[i].description,foundProducts[i].price,foundProducts[i].image));

  createProductHTML(productList[i]);
}

console.log(productList);
