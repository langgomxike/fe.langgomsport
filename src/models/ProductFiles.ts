import Variant from "./Variant";
import File from "./File";
import Product from "./Product";

export default class ProductFiles {
    // properties
    product: Product
    files: File[]


    constructor(product: Product, files: File[]) {
        this.product = product;
        this.files = files;
    }
}