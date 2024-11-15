import Size from "./Size";
import Color from "./Color";
import Product from "./Product";
import ImageVariant from "./ImageVariant";

export default class Variant {

    // properties
    id: number;
    quantity: number;
    price: number;
    color: Color;
    size: Size;
    created_at: number;
    updated_at: number;
    product?: Product;
    images?: ImageVariant[];


    constructor(id: number, product: Product | undefined = undefined, quantity: number, price: number = 0 ,color: Color, size: Size, created_at: number, updated_at: number, images: ImageVariant[] | undefined = []) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.color = color;
        this.size = size;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.images = images;
    }
}