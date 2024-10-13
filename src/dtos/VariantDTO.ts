import Product from "../models/Product";
import Color from "../models/Color";
import Size from "../models/Size";

export default class VariantDTO {

    // properties
    id: number;
    quantity: number;
    color: Color;
    size: Size;
    created_at: number;
    updated_at: number;


    constructor(id: number, quantity: number, color: Color, size: Size, created_at: number, updated_at: number) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
        this.size = size;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}