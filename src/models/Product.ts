import Variant from "./Variant";
import File from "./File";
import Brand from "./Brand";
import Category from "./Category";
export default class Product {

    // properties
    id: number;
    name: string;
    price: number;
    description: string;
    discount: number;
    brand: Brand | undefined;
    categories: Category[] | undefined;
    variants: Variant[] | undefined;
    files: File[]
    createdAt: number;
    updatedAt: number


    constructor(id: number, name: string, price: number, description: string, discount:number = 0, brand: Brand | undefined = undefined, categories: Category[] | undefined, variants: Variant[] | undefined = [], files: File[], createdAt: number, updatedAt: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.discount = discount
        this.brand = brand;
        this.categories = this.categories
        this.variants = variants;
        this.files = files;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}