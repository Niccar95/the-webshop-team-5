import { get } from "./serviceBase";

export const searchProducts = async () => {
  const productUrl = "https://fakestoreapi.com/products";

  const data = await get(productUrl);

  return data;
}
