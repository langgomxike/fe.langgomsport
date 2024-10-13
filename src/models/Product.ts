import Variant from "./Variant";
import File from "./File";

export default class Product {

    // properties
    id: number;
    name: string;
    price: number;
    description: string;
    brand_id: number;
    variant: Variant;
    files: File[]
    created_at: number;
    updated_at: number


    constructor(id: number, name: string, price: number, description: string, brand_id: number, variant: Variant, files: File[], created_at: number, updated_at: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.brand_id = brand_id;
        this.variant = variant;
        this.files = files;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}