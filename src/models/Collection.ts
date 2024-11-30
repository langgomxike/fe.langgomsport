import Product from "./Product";

export default class Collection {
  public id: number;
  public name: string;
  public enName: string;
  public image: string;
  public limitProduct: number;
  public products: Product[];

  constructor(
    id: number = 0,
    name: string = "",
    enName: string = "",
    image: string = "",
    limitProduct: number = 0,
    products: Product[] = []
  ) {
    this.id = id;
    this.name = name;
    this.enName = enName;
    this.image = image;
    this.limitProduct = limitProduct;
    this.products = products;
  }
}
