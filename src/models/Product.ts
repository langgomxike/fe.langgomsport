import Variant from "./Variant";
import File from "./File";
import ProductDTO from "../dtos/ProductDTO";

export default class Product {

    // properties
    id: number;
    name: string;
    price: number;
    description: string;
    discount: number;
    brandId: number;
    variant: Variant;
    files: File[]
    createdAt: number;
    updatedAt: number


    constructor(id: number, name: string, price: number, description: string, discount:number = 0 ,brandId: number, variant: Variant, files: File[], createdAt: number, updatedAt: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.discount = discount
        this.brandId = brandId;
        this.variant = variant;
        this.files = files;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}