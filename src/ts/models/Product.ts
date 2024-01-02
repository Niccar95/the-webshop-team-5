export class Product {

  productTitle: string;
  productCategory: string;
  productDescription: string;
  productPrice: number;
  productImageURL: string;
  productAmount: number;

  constructor(productTitle:string, productCategory:string, productDescription:string, productPrice:number, productImageURL:string) {
    this.productTitle=productTitle;
    this.productCategory= productCategory;
    this.productDescription= productDescription;
    this.productPrice= productPrice;
    this.productImageURL= productImageURL;
    this.productAmount = 0;
  } 
  updateProductAmount(number:number){
    this.productAmount = number+1;
  }
}