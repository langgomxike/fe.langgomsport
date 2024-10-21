import Size from "./Size";
import Color from "./Color";
import Product from "./Product";

export default class Variant {

    // properties
    id: number;
    product: Product;
    quantity: number;
    color: Color;
    size: Size;
    created_at: number;
    updated_at: number;


    constructor(id: number, product: Product, quantity: number, color: Color, size: Size, created_at: number, updated_at: number) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.color = color;
        this.size = size;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}