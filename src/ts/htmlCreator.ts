import { Product } from "./models/Product";

const container = document.getElementById("productContainer");

export function buttonCreator(itemContainer: HTMLElement):HTMLElement {
  const addToCartButton = document.createElement("button");
  addToCartButton.innerHTML = "Add to cart";
  addToCartButton.id = "addToCartButton";
  itemContainer.appendChild(addToCartButton);
  container?.appendChild(itemContainer); 

  return addToCartButton;
};

export function createProductHTML(product: Product) {
  const itemContainer = document.createElement("section");

  const title = document.createElement("h2");
  const category = document.createElement("h3");
  const description = document.createElement("p");
  const price = document.createElement("p");
  const image = document.createElement("img");

  title.innerHTML = product.productTitle;
  category.innerHTML = product.productCategory;
  description.innerHTML = product.productDescription;
  price.innerHTML = product.productPrice.toString() + "€";
  image.src = product.productImageURL;
  image.className = "productImage";

  itemContainer.className = "itemContainer";

  itemContainer?.appendChild(title);
  itemContainer?.appendChild(category);
  itemContainer?.appendChild(description);
  itemContainer?.appendChild(price);
  itemContainer?.appendChild(image);

  buttonCreator(itemContainer);
}
