import Variant from "../models/Variant";
import File from "../models/File";
import Product from "../models/Product";

export default class ProductDTO {
    // properties
    product: Product
    files: File[]


    constructor(product: Product, files: File[]) {
        this.product = product;
        this.files = files;
    }
}